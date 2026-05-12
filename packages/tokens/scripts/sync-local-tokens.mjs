import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.resolve(__dirname, '../xiaoyun-ds-tokens.css');

function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing required file: ${sourcePath}`);
  }

  console.log('Token source of truth is packages/tokens/xiaoyun-ds-tokens.css');
  console.log('No extra snapshot files are generated.');
}

main();
