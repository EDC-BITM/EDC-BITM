/**
 * applicationLetter.js
 * EDC BIT Mesra – K26 Application Acknowledgement Letter (PDF)
 *
 * Generates the A4 acknowledgement letter in the browser from the submitted
 * form response and downloads it as a PDF.
 *
 * Install:  npm i jspdf
 *
 * Usage (React):
 *   import { downloadApplicationLetter } from "./applicationLetter";
 *   import edcLetterhead from "../assets/EDC_LOGO.png";
 *
 *   <button onClick={() => downloadApplicationLetter(applicant, edcLetterhead)}>
 *     Download Letter
 *   </button>
 *
 * `applicant` comes from the form response:
 *   {
 *     fullName: "arpit  agarwal",
 *     rollNumber: "btech/10267/25",
 *     branch: "AIML",
 *     year: "1st",
 *     roles: [{ title: "Tech", rank: 1 }, { title: "Content", rank: 2 }],
 *     applicationId: "EDC-K26-0142"
 *   }
 */

import { jsPDF } from "jspdf";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const COLORS = {
  purple: [107, 63, 160], // #6B3FA0
  yellow: [242, 182, 48], // #F2B630
  ink: [31, 30, 29], // #1F1E1D
  grey: [95, 94, 90], // #5F5E5A
  rule: [211, 209, 199], // #D3D1C7
};

const PROGRAMME_MAP = {
  BTECH: "B.Tech",
  MTECH: "M.Tech",
  BARCH: "B.Arch",
  BPHARM: "B.Pharm",
  MCA: "MCA",
  MBA: "MBA",
  BBA: "BBA",
  BCA: "BCA",
  IMSC: "Integrated M.Sc",
  MSC: "M.Sc",
};

const PAGE = { w: 595.28, h: 841.89, margin: 50 };
const BODY = { size: 11, leading: 16.5, gap: 10 };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatApplicationId(n) {
  if (typeof n === "string" && n.startsWith("EDC-")) return n;
  return "EDC-K26-" + String(n || 1).padStart(4, "0");
}

function titleCase(str = "") {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s'-])(\p{L})/gu, (m, p1, p2) => p1 + p2.toUpperCase());
}

function formatDate(d = new Date()) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function programmeFromRoll(roll = "") {
  const prefix = roll.split("/")[0].toUpperCase();
  return PROGRAMME_MAP[prefix] || prefix;
}

/** Normalise the raw form response into the fields the letter needs. */
export function buildLetterData(response = {}) {
  const fullName = titleCase(response.fullName || response.name || "Applicant");
  const rollNumber = (response.rollNumber || "").trim().toUpperCase();
  const rawRoles =
    response.roles ||
    (Array.isArray(response.subTeams)
      ? response.subTeams.map((t, idx) => ({ title: t, rank: idx + 1 }))
      : []);
  const roles = [...rawRoles].sort((a, b) => a.rank - b.rank);
  const derivedYear =
    response.year ||
    (rollNumber.endsWith("/25")
      ? "2nd"
      : rollNumber.endsWith("/24")
        ? "3rd"
        : rollNumber.endsWith("/23")
          ? "4th"
          : "1st");

  return {
    fullName,
    firstName: fullName.split(" ")[0] || "",
    rollNumber,
    programme: programmeFromRoll(rollNumber) || "B.Tech",
    branch: (response.branch || "").trim(),
    year: (derivedYear || "").trim(),
    roles,
    applicationId: formatApplicationId(response.applicationId),
    date: formatDate(response.date ? new Date(response.date) : new Date()),
  };
}

/** Load an image (imported asset URL or data URL) as a data URL. */
async function loadImage(src) {
  if (!src) return null;
  if (src.startsWith("data:")) return src;
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/* ------------------------------------------------------------------ */
/* Rich-text paragraph with justification                              */
/* segments: [{ text, bold?, color? }]                                 */
/* ------------------------------------------------------------------ */

function setStyle(doc, seg) {
  doc.setFont("helvetica", seg.bold ? "bold" : "normal");
  doc.setTextColor(...(seg.color || COLORS.ink));
}

function drawParagraph(doc, segments, x, y, width, { justify = true } = {}) {
  doc.setFontSize(BODY.size);

  // Break segments into styled words
  const words = [];
  segments.forEach((seg) => {
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        setStyle(doc, seg);
        words.push({ ...seg, text: w, width: doc.getTextWidth(w) });
      });
  });

  doc.setFont("helvetica", "normal");
  const space = doc.getTextWidth(" ");

  // Build lines
  const lines = [];
  let line = [];
  let lineWidth = 0;
  words.forEach((w) => {
    const add = line.length ? space + w.width : w.width;
    if (line.length && lineWidth + add > width) {
      lines.push({ words: line, width: lineWidth });
      line = [w];
      lineWidth = w.width;
    } else {
      line.push(w);
      lineWidth += add;
    }
  });
  if (line.length) lines.push({ words: line, width: lineWidth });

  // Draw lines
  lines.forEach((ln, i) => {
    const isLast = i === lines.length - 1;
    const gaps = ln.words.length - 1;
    const extra =
      justify && !isLast && gaps > 0 ? (width - ln.width) / gaps : 0;
    let cx = x;
    ln.words.forEach((w) => {
      setStyle(doc, w);
      doc.text(w.text, cx, y);
      cx += w.width + space + extra;
    });
    y += BODY.leading;
  });

  return y + BODY.gap; // baseline for the next paragraph
}

/* ------------------------------------------------------------------ */
/* Letter                                                              */
/* ------------------------------------------------------------------ */

export async function generateApplicationPdf(response, letterheadSrc) {
  const d = buildLetterData(response);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const { w, margin } = PAGE;
  const contentW = w - margin * 2;
  const right = w - margin;

  doc.setProperties({
    title: `EDC K26 Application Acknowledgement - ${d.fullName}`,
    author: "EDC BIT Mesra",
    subject: "Acknowledgement of Application",
  });

  /* Letterhead
     LEFT : banner image (BIT logo | EDC logo | name | website), 210pt wide.
            Source image is 1693 x 321 px, so keep that ratio.
     RIGHT: right-aligned address block. */
  const letterhead = await loadImage(letterheadSrc).catch(() => null);
  const bannerW = 210;
  const bannerH = bannerW * (321 / 1693);
  if (letterhead) {
    doc.addImage(letterhead, "PNG", margin, 40, bannerW, bannerH);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...COLORS.purple);
  doc.text("ENTREPRENEURSHIP DEVELOPMENT CELL", right, 47, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.grey);
  doc.text("Birla Institute of Technology, Mesra", right, 59, { align: "right" });
  doc.text("Ranchi, Jharkhand – 835215", right, 70, { align: "right" });
  doc.setTextColor(...COLORS.purple);
  doc.text("www.edcbitmesra.in", right, 81, { align: "right" });

  /* Double rule: purple + yellow */
  doc.setDrawColor(...COLORS.purple);
  doc.setLineWidth(1.5);
  doc.line(margin, 94, right, 94);
  doc.setDrawColor(...COLORS.yellow);
  doc.setLineWidth(1);
  doc.line(margin, 97.5, right, 97.5);

  /* Ref + Date */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11.5);
  doc.setTextColor(...COLORS.grey);
  doc.text(`Ref: ${d.applicationId}`, margin, 118);
  doc.text(`Date: ${d.date}`, right, 118, { align: "right" });

  /* To block */
  let y = 154;
  const toLines = [
    ["To,", false],
    [d.fullName, true],
    [`Roll No: ${d.rollNumber}`, false],
    [`${d.programme}, ${d.branch}, ${d.year} Year`, false],
    ["BIT Mesra, Ranchi", false],
  ];
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.ink);
  toLines.forEach(([text, bold]) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const wrapped = doc.splitTextToSize(text, contentW);
    doc.text(wrapped, margin, y);
    y += 16 * wrapped.length;
  });

  /* Subject */
  y += 27;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(...COLORS.purple);
  doc.text(
    "Subject: Acknowledgement of Application - EDC Core Team, K26 Batch",
    w / 2,
    y,
    { align: "center" }
  );
  doc.setDrawColor(...COLORS.yellow);
  doc.setLineWidth(1);
  doc.line(w / 2 - 60, y + 7, w / 2 + 60, y + 7);

  /* Body */
  y += 32;
  const P = COLORS.purple;
  const rolesText = d.roles.length
    ? d.roles.map((r, i) => `${i + 1}. ${r.title} Team`).join("   ")
    : "-";

  y = drawParagraph(
    doc,
    [{ text: `Dear ${d.firstName},` }],
    margin,
    y,
    contentW,
    { justify: false }
  );

  y = drawParagraph(
    doc,
    [
      { text: "Thank you for applying to the" },
      { text: "Entrepreneurship Development Cell (EDC), BIT Mesra.", bold: true },
      {
        text: "This letter confirms that we have received your application for the K26 recruitment drive.",
      },
    ],
    margin,
    y,
    contentW
  );

  // Application ID + Positions (two tight lines)
  doc.setFontSize(BODY.size);
  [
    ["Application ID:", d.applicationId],
    ["Position(s) applied for:", rolesText],
  ].forEach(([label, value], i) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...P);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label + " ");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.ink);
    doc.text(value, margin + lw, y);
    y += i === 0 ? BODY.leading : BODY.leading + BODY.gap;
  });

  y = drawParagraph(
    doc,
    [
      {
        text: "Our selection process has three rounds: an Online Assessment (OA), a Group Discussion (GD) and a Personal Interview (PI). Shortlisted candidates will be informed on WhatsApp and email before each round.",
      },
    ],
    margin,
    y,
    contentW
  );

  y = drawParagraph(
    doc,
    [
      {
        text: "At EDC, ideas turn into action. Whether you build, design, write or lead, this is your chance to work alongside people who are shaping the startup culture at BIT Mesra.",
      },
    ],
    margin,
    y,
    contentW
  );

  drawParagraph(
    doc,
    [
      {
        text: "We appreciate your interest in building the entrepreneurial ecosystem at BIT Mesra and wish you the best for the upcoming rounds. Every great venture begins with a single step, and this is yours.",
      },
    ],
    margin,
    y,
    contentW
  );

  /* Sign-off (fixed position near bottom) */
  const H = PAGE.h;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.ink);
  doc.text("Keep building,", margin, H - 175);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.purple);
  doc.text("Team EDC", margin, H - 150);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.grey);
  doc.text("Entrepreneurship Development Cell, BIT Mesra", margin, H - 134);

  /* Note + footer */
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  doc.text(
    "Note: This letter only acknowledges receipt of your application. It is not an offer of membership.",
    margin,
    H - 92
  );

  doc.setDrawColor(...COLORS.rule);
  doc.setLineWidth(0.6);
  doc.line(margin, H - 78, right, H - 78);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(
    "EDC BIT Mesra  |  This is a system-generated letter.",
    margin,
    H - 62
  );
  doc.text("Page 1 of 1", right, H - 62, { align: "right" });

  return { doc, data: d };
}

/** Generate and download the PDF. Returns the filename. */
export async function downloadApplicationLetter(response, letterheadSrc) {
  const { doc, data } = await generateApplicationPdf(response, letterheadSrc);
  const filename = `${data.applicationId}-${data.firstName || "Letter"}.pdf`;
  doc.save(filename);
  return filename;
}

/** Same PDF as a Blob (e.g. to email it or upload to the backend). */
export async function getApplicationLetterBlob(response, letterheadSrc) {
  const { doc } = await generateApplicationPdf(response, letterheadSrc);
  return doc.output("blob");
}
