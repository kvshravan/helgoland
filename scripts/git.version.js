const {
  execSync
} = require("child_process");
const {
  existsSync,
  writeFileSync
} = require("fs");

const revision = execSync('git rev-parse HEAD').toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const toolboxVersion = require('../package.json').dependencies['@helgoland/core'];

console.log(`version: '${process.env.npm_package_version}', toolbox: '${toolboxVersion}', revision: '${revision}', branch: '${branch}'`);
const content = '// this file is automatically generated by git.version.ts script\n' +
  `export const versions = {
    version: '${process.env.npm_package_version}',
    toolbox: '${toolboxVersion}',
    revision: '${revision}',
    branch: '${branch}',
    buildDate: '${new Date()}'
};
`;
const folder = 'src/environments';
if (!existsSync(folder)) {
  mkdirSync(folder, {
    recursive: true,
    mode: 0o755
  });
}

writeFileSync(
  `${folder}/versions.ts`,
  content, {
    encoding: 'utf8'
  }
);
