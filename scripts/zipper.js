import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    'Usage: node ./scripts/ zipper.js <source_folder_path> <source_folder_path>'
  );
  process.exit(1);
}

const sourceFolder = path.resolve(args[0]);
const outputZipPath = path.resolve(args[1]);

// Check if the source folder exists
if (!fs.existsSync(sourceFolder) || !fs.lstatSync(sourceFolder).isDirectory()) {
  console.error(
    'Error: The specified source folder does not exist or is not a directory.'
  );
  process.exit(1);
}

const output = fs.createWriteStream(outputZipPath);

const archive = archiver('zip', {
  zlib: { level: 9 },
});

output.on('close', () => {
  console.log(
    `Archive has been finalized. ${archive.pointer()} total bytes written.`
  );
});

output.on('end', () => {
  console.log('Data has been drained');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(sourceFolder, false);
archive.finalize();
