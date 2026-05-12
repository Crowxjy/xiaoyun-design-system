import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const sourceFiles = ['assets/sprite.svg', 'index.js', 'icons-preview.html'];

function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
}

function main() {
  for (const sourceRelative of sourceFiles) {
    const sourcePath = path.join(packageRoot, sourceRelative);
    ensureFileExists(sourcePath);
  }

  console.log('Icon source of truth stays in packages/icons.');
  console.log('No nested mirror package is generated.');
}

main();
