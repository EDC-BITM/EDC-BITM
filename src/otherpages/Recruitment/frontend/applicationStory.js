export function createApplicationStory({ name, subTeams }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the application story image.");

  const background = context.createLinearGradient(0, 0, 1080, 1920);
  background.addColorStop(0, "#17130b");
  background.addColorStop(0.52, "#090909");
  background.addColorStop(1, "#17130b");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(840, 530, 20, 840, 530, 720);
  glow.addColorStop(0, "rgba(254,216,83,0.2)");
  glow.addColorStop(1, "rgba(254,216,83,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(254,216,83,0.35)";
  context.lineWidth = 2;
  context.strokeRect(56, 56, 968, 1808);
  context.strokeStyle = "rgba(255,255,255,0.1)";
  context.beginPath();
  context.moveTo(112, 250);
  context.lineTo(968, 250);
  context.stroke();

  context.textAlign = "left";
  context.fillStyle = "#FED853";
  context.font = "700 30px Sora, sans-serif";
  context.fillText("EDC  ·  BIT MESRA", 112, 180);

  context.fillStyle = "rgba(255,255,255,0.62)";
  context.font = "600 24px Sora, sans-serif";
  context.fillText("RECRUITMENT", 112, 360);

  context.fillStyle = "#FFFFFF";
  context.font = "800 98px Sora, sans-serif";
  context.fillText("BIG IDEAS", 108, 500);
  context.fillStyle = "#FED853";
  context.fillText("START HERE.", 108, 615);

  context.fillStyle = "rgba(255,255,255,0.62)";
  context.font = "500 28px Sora, sans-serif";
  context.fillText("The next chapter belongs to", 112, 820);

  const displayName = name.trim() || "A future innovator";
  let nameFontSize = 76;
  context.font = `700 ${nameFontSize}px Sora, sans-serif`;
  while (context.measureText(displayName).width > 850 && nameFontSize > 42) {
    nameFontSize -= 2;
    context.font = `700 ${nameFontSize}px Sora, sans-serif`;
  }
  context.fillStyle = "#FFFFFF";
  context.fillText(displayName, 108, 940);

  context.fillStyle = "rgba(255,255,255,0.62)";
  context.font = "500 26px Sora, sans-serif";
  context.fillText("READY TO BUILD WITH", 112, 1120);

  const teams = subTeams.length ? subTeams : ["EDC BIT Mesra"];
  context.font = "600 28px Sora, sans-serif";
  teams.forEach((team, index) => {
    const y = 1200 + index * 92;
    const pillWidth = Math.min(context.measureText(team).width + 56, 800);
    context.fillStyle = "rgba(254,216,83,0.12)";
    context.beginPath();
    context.roundRect(108, y - 44, pillWidth, 64, 32);
    context.fill();
    context.strokeStyle = "rgba(254,216,83,0.4)";
    context.stroke();
    context.fillStyle = "#FED853";
    context.fillText(team, 136, y);
  });

  context.strokeStyle = "rgba(255,255,255,0.1)";
  context.beginPath();
  context.moveTo(112, 1660);
  context.lineTo(968, 1660);
  context.stroke();
  context.fillStyle = "#FFFFFF";
  context.font = "600 28px Sora, sans-serif";
  context.fillText("Curiosity turns into impact.", 112, 1730);
  context.fillStyle = "rgba(255,255,255,0.5)";
  context.font = "500 22px Sora, sans-serif";
  context.fillText("ENTREPRENEURSHIP DEVELOPMENT CELL", 112, 1790);
  context.fillText("BIRLA INSTITUTE OF TECHNOLOGY, MESRA", 112, 1830);

  return canvas.toDataURL("image/png");
}
