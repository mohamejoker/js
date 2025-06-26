// Script لتشغيل Backend Server
const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 بدء تشغيل Backend Server...");

// تشغيل Backend Server
const backend = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
});

backend.on("error", (err) => {
  console.error("❌ خطأ في تشغيل Backend:", err);
});

backend.on("close", (code) => {
  console.log(`🔚 Backend Server انتهى بالكود: ${code}`);
});

// إنهاء العملية بشكل صحيح
process.on("SIGINT", () => {
  console.log("\n🛑 إيقاف Backend Server...");
  backend.kill("SIGINT");
  process.exit(0);
});

console.log("✅ Backend Server يعمل على http://localhost:4000");
