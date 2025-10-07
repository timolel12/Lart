const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const bumpType = process.argv[2] || 'patch'; // default = patch

function bumpVersion(version, type) {
  let [major, minor, patch] = version.split('.').map(Number);

  switch (type) {
    case 'major':
      major++;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor++;
      patch = 0;
      break;
    case 'patch':
    default:
      patch++;
  }

  return `${major}.${minor}.${patch}`;
}

pkg.version = bumpVersion(pkg.version, bumpType);

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

console.log(`Bumped ${bumpType} version to ${pkg.version}`);
