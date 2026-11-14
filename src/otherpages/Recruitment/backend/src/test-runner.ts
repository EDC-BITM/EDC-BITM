import { buildApp } from "./app.js";

async function runTests() {
  console.log("🧪 Starting Automated Backend Verification Suite...\n");

  const app = buildApp();
  await app.ready();

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message || err}`);
      failed++;
    }
  }

  // Test 1: GET /health
  await test("GET /health returns 200 and healthy DB connection", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/health",
    });

    if (res.statusCode !== 200) {
      throw new Error(`Expected 200, got ${res.statusCode}: ${res.body}`);
    }

    const json = JSON.parse(res.body);
    if (json.status !== "healthy" || json.database !== "connected") {
      throw new Error(`Unexpected body: ${res.body}`);
    }
  });

  // Test 2: Missing required fields
  await test("POST /api/recruitment rejects missing required fields", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Test User",
        // missing branch, email, rollNumber, etc.
      },
    });

    if (res.statusCode !== 400) {
      throw new Error(`Expected 400, got ${res.statusCode}: ${res.body}`);
    }

    const json = JSON.parse(res.body);
    if (!json.errors || !json.errors.email || !json.errors.rollNumber) {
      throw new Error(`Expected field errors for email and rollNumber: ${res.body}`);
    }
  });

  // Test 3: Invalid email format
  await test("POST /api/recruitment rejects invalid email format", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Test Candidate",
        branch: "CSE",
        email: "not-an-email",
        rollNumber: "MCA/99999/26",
        whatsappNumber: "9876543210",
        subTeams: ["Tech"],
        discoverySource: "Friends",
      },
    });

    if (res.statusCode !== 400) {
      throw new Error(`Expected 400, got ${res.statusCode}: ${res.body}`);
    }
    const json = JSON.parse(res.body);
    if (!json.errors?.email) {
      throw new Error(`Expected email error: ${res.body}`);
    }
  });

  // Test 4: Different roll number formats (MCA, BTECH, MBA, etc.)
  const timestamp = Date.now();
  const testEmail1 = `applicant_${timestamp}@bitmesra.ac.in`;
  const nonBtechRoll = `MCA/10052/${timestamp.toString().slice(-2)}`;

  await test("POST /api/recruitment accepts non-B.Tech roll number format (e.g. MCA)", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Non BTech Candidate",
        branch: "MCA",
        email: testEmail1,
        rollNumber: nonBtechRoll,
        whatsappNumber: "9876543210",
        callingNumber: "9876543210",
        whyJoin: "Passionate about tech operations and building tools for EDC.",
        experience: "Ex-freelance fullstack developer.",
        otherSocieties: "None",
        commitment: "Can dedicate 15 hours a week across all events.",
        subTeams: ["Tech", "Design"],
        discoverySource: "Instagram/LinkedIn Pages",
        portfolioLink: "https://github.com/example",
        resumeLink: "https://drive.google.com/resume",
        campusIdeas: "Improve digital notice board accessibility for campus.",
      },
    });

    if (res.statusCode !== 201) {
      throw new Error(`Expected 201 Created, got ${res.statusCode}: ${res.body}`);
    }

    const json = JSON.parse(res.body);
    if (!json.success || !json.applicationId) {
      throw new Error(`Expected success and applicationId: ${res.body}`);
    }
  });

  // Test 5: Reject special characters/letters in whatsappNumber
  await test("POST /api/recruitment rejects special characters/letters in whatsappNumber", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Special Char Phone",
        branch: "ECE",
        email: `special_${timestamp}@bitmesra.ac.in`,
        rollNumber: `BTECH/99999/${timestamp.toString().slice(-2)}`,
        whatsappNumber: "+91-98765-43210", // contains + and -
        whyJoin: "Passionate about tech operations and building tools for EDC.",
        experience: "Ex-freelance fullstack developer.",
        commitment: "Can dedicate 15 hours a week across all events.",
        campusIdeas: "Improve digital notice board accessibility for campus.",
        subTeams: ["Outreach"],
        discoverySource: "Through Events (Innovate-A-Thon / E-Summit)",
      },
    });

    if (res.statusCode !== 400) {
      throw new Error(`Expected 400 Bad Request, got ${res.statusCode}: ${res.body}`);
    }
    const json = JSON.parse(res.body);
    if (!json.errors?.whatsappNumber) {
      throw new Error(`Expected whatsappNumber error: ${res.body}`);
    }
  });

  // Test 6: Subjective questions are required
  await test("POST /api/recruitment rejects empty subjective questions", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Missing Subjective",
        branch: "ECE",
        email: `subjective_${timestamp}@bitmesra.ac.in`,
        rollNumber: `BTECH/77777/${timestamp.toString().slice(-2)}`,
        whatsappNumber: "9123456780",
        subTeams: ["Outreach"],
        discoverySource: "Through Events (Innovate-A-Thon / E-Summit)",
        // missing whyJoin, experience, commitment, campusIdeas
      },
    });

    if (res.statusCode !== 400) {
      throw new Error(`Expected 400 Bad Request, got ${res.statusCode}: ${res.body}`);
    }
    const json = JSON.parse(res.body);
    if (!json.errors?.whyJoin || !json.errors?.experience || !json.errors?.commitment || !json.errors?.campusIdeas) {
      throw new Error(`Expected errors for subjective fields: ${res.body}`);
    }
  });

  // Test 7: Duplicate submission handling (same email / roll number)
  await test("POST /api/recruitment rejects duplicate roll number with 409", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/recruitment",
      payload: {
        fullName: "Duplicate Attempt",
        branch: "CSE",
        email: `another_${timestamp}@bitmesra.ac.in`,
        rollNumber: nonBtechRoll, // already submitted in Test 4
        whatsappNumber: "9876543211",
        whyJoin: "Passionate about tech operations and building tools for EDC.",
        experience: "Ex-freelance fullstack developer.",
        commitment: "Can dedicate 15 hours a week across all events.",
        campusIdeas: "Improve digital notice board accessibility for campus.",
        subTeams: ["Tech"],
        discoverySource: "Seniors",
      },
    });

    if (res.statusCode !== 409) {
      throw new Error(`Expected 409 Conflict, got ${res.statusCode}: ${res.body}`);
    }

    const json = JSON.parse(res.body);
    if (!json.message || !json.message.includes("already been submitted")) {
      throw new Error(`Expected duplicate message, got: ${res.body}`);
    }
  });

  // Test 7: CORS origin filtering
  await test("CORS permits approved production origin (https://edcbitmesra.in)", async () => {
    const res = await app.inject({
      method: "OPTIONS",
      url: "/api/recruitment",
      headers: {
        origin: "https://edcbitmesra.in",
        "access-control-request-method": "POST",
      },
    });

    const allowOrigin = res.headers["access-control-allow-origin"];
    if (allowOrigin !== "https://edcbitmesra.in") {
      throw new Error(`Expected Access-Control-Allow-Origin: https://edcbitmesra.in, got: ${allowOrigin}`);
    }
  });

  await test("CORS permits local frontend origin (http://localhost:5173)", async () => {
    const res = await app.inject({
      method: "OPTIONS",
      url: "/api/recruitment",
      headers: {
        origin: "http://localhost:5173",
        "access-control-request-method": "POST",
      },
    });

    const allowOrigin = res.headers["access-control-allow-origin"];
    if (allowOrigin !== "http://localhost:5173") {
      throw new Error(`Expected Access-Control-Allow-Origin: http://localhost:5173, got: ${allowOrigin}`);
    }
  });

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  await app.close();

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
