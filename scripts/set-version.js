const fs = require('fs');
const path = require('path');

const { version } = require('../package.json');

const envFiles = [
  path.resolve(__dirname, '../src/environments/environment.ts'),
  path.resolve(__dirname, '../src/environments/environment.prod.ts')
];

envFiles.forEach(envPath => {
  if (!fs.existsSync(envPath)) {
    console.warn(`⚠️  Skipping ${envPath} (file not found)`);
    return;
  }

  let content = fs.readFileSync(envPath, 'utf8');

  if (/version\s*:\s*['"`]([\d.]+)['"`]/.test(content)) {
    // Replace existing version
    content = content.replace(/version\s*:\s*['"`][\d.]+['"`]/, `version: '${version}'`);
  } else {
    // Insert version field if missing
    content = content.replace(
      /export const environment\s*=\s*{([^}]*)}/,
      (match, inner) => `export const environment = {${inner}\n  version: '${version}'\n}`
    );
  }

  fs.writeFileSync(envPath, content, 'utf8');
  console.log(`✅ Updated ${path.basename(envPath)} with version ${version}`);
});
