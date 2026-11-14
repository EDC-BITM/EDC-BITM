import storyTemplateSrc from "../../../assets/story-template.png";

let cachedTemplateImg = null;

function loadTemplateImage() {
  if (
    cachedTemplateImg &&
    cachedTemplateImg.complete &&
    cachedTemplateImg.naturalWidth > 0
  ) {
    return Promise.resolve(cachedTemplateImg);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = storyTemplateSrc;
    img.onload = () => {
      cachedTemplateImg = img;
      resolve(img);
    };
    img.onerror = () => {
      resolve(null);
    };
  });
}

// Preload template when in browser
if (typeof window !== "undefined") {
  loadTemplateImage();
}

export async function createApplicationStory({ name, subTeams } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the application story image.");

  const bgImg = await loadTemplateImage();
  if (bgImg) {
    context.drawImage(bgImg, 0, 0, 1080, 1920);
  } else {
    // Fallback gradient if background image fails
    const background = context.createLinearGradient(0, 0, 1080, 1920);
    background.addColorStop(0, "#17130b");
    background.addColorStop(0.52, "#090909");
    background.addColorStop(1, "#17130b");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FED853";
    context.font = "700 30px Sora, sans-serif";
    context.fillText("EDC · BIT MESRA", 120, 180);

    context.fillStyle = "#FFFFFF";
    context.font = "800 98px Sora, sans-serif";
    context.fillText("BIG IDEAS", 120, 500);
    context.fillStyle = "#FED853";
    context.fillText("START HERE.", 120, 615);

    context.fillStyle = "rgba(255,255,255,0.62)";
    context.font = "500 28px Sora, sans-serif";
    context.fillText("THE NEXT CHAPTER BELONGS TO", 120, 960);
  }

  // Draw Candidate Name under "THE NEXT CHAPTER BELONGS TO"
  const displayName = (name || "").trim() || "A future innovator";
  let nameFontSize = 74;
  context.font = `700 ${nameFontSize}px Sora, sans-serif`;
  while (context.measureText(displayName).width > 840 && nameFontSize > 36) {
    nameFontSize -= 2;
    context.font = `700 ${nameFontSize}px Sora, sans-serif`;
  }
  context.fillStyle = "#FFFFFF";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText(displayName, 120, 1045);

  // Draw Sub-team Pills under "READY TO BUILD WITH"
  const teams =
    Array.isArray(subTeams) && subTeams.length ? subTeams : ["EDC BIT Mesra"];
  context.font = "700 28px Sora, sans-serif";
  let curX = 120;
  let curY = 1295;
  const pillHeight = 56;
  const pillRadius = 28;
  const pillPaddingX = 26;

  teams.forEach((team) => {
    const textWidth = context.measureText(team).width;
    const pillWidth = Math.min(textWidth + pillPaddingX * 2, 800);

    // If second pill would wrap or overflow row, place on next row
    if (curX + pillWidth > 960 && curX > 120) {
      curX = 120;
      curY += 68;
    }

    context.beginPath();
    if (context.roundRect) {
      context.roundRect(curX, curY, pillWidth, pillHeight, pillRadius);
    } else {
      context.rect(curX, curY, pillWidth, pillHeight);
    }
    context.fillStyle = "rgba(254, 216, 83, 0.14)";
    context.fill();
    context.strokeStyle = "rgba(254, 216, 83, 0.75)";
    context.lineWidth = 2;
    context.stroke();

    context.fillStyle = "#FED853";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(team, curX + pillWidth / 2, curY + pillHeight / 2);

    curX += pillWidth + 18;
  });

  return canvas.toDataURL("image/png");
}
