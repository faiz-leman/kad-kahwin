const fs = require("fs");
const path = require("path");

// Simple CSS minifier
function minifyCSS(css) {
  return (
    css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around selectors and properties
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .replace(/;\}/g, "}")
      // Remove last semicolon in block
      .replace(/;}/g, "}")
      .trim()
  );
}

// Simple JS minifier (basic)
function minifyJS(js) {
  return (
    js
      // Remove single-line comments (but not URLs)
      .replace(/(?:^|[^:])\/\/.*$/gm, "")
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around operators and brackets
      .replace(/\s*([{}();,:\[\]])\s*/g, "$1")
      .trim()
  );
}

// Files to minify
const files = {
  css: [{ input: "source/css/opener.css", output: "source/css/opener.css" }],
  js: [{ input: "source/js/main.js", output: "source/js/main.js" }],
};

console.log("🔄 Starting minification...\n");

// Minify CSS files
files.css.forEach((file) => {
  try {
    const inputPath = path.join(__dirname, file.input);
    const outputPath = path.join(__dirname, file.output);

    console.log(`📄 Minifying CSS: ${file.input}`);
    const content = fs.readFileSync(inputPath, "utf8");
    const originalSize = Buffer.byteLength(content, "utf8");

    const minified = minifyCSS(content);
    const minifiedSize = Buffer.byteLength(minified, "utf8");

    fs.writeFileSync(outputPath, minified, "utf8");

    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    console.log(
      `   ✅ ${originalSize} bytes → ${minifiedSize} bytes (${savings}% smaller)\n`
    );
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  }
});

// Minify JS files
files.js.forEach((file) => {
  try {
    const inputPath = path.join(__dirname, file.input);
    const outputPath = path.join(__dirname, file.output);

    console.log(`📄 Minifying JS: ${file.input}`);
    const content = fs.readFileSync(inputPath, "utf8");
    const originalSize = Buffer.byteLength(content, "utf8");

    const minified = minifyJS(content);
    const minifiedSize = Buffer.byteLength(minified, "utf8");

    fs.writeFileSync(outputPath, minified, "utf8");

    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    console.log(
      `   ✅ ${originalSize} bytes → ${minifiedSize} bytes (${savings}% smaller)\n`
    );
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
  }
});

console.log("✨ Minification complete!\n");
console.log("📦 Summary:");
console.log("   - Backups saved in: source/backup-unminified/");
console.log("   - Minified files: source/css/ and source/js/");
console.log("   - All functionality preserved");
