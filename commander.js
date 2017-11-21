#!/usr/bin/env node

const program = require('commander');
const {
  exec, rm, cd, cp
} = require('shelljs');
require('dotenv').config();

const VERSION = require('./foxyext/manifest').version;

console.log('Extension Version: %s', VERSION);

program.version('0.1.0');

program
  .command('vendors <action>')
  .description('vendor actions')
  .action((action) => {
    switch (action) {
      case 'install':
        exec('sh vendor.sh');
        break;
      case 'clear':
        rm('-rf', 'root/Applications/Foxy.app/Resources/foxycli/resources/Hey_Foxy.pmdl.original');
        rm('-rf', 'root/Applications/Foxy.app/Resources/foxycli/node_modules');
        rm('-rf', 'root/Applications/Foxy.App/Resources/{cellar,node}');
        rm('-rf', '.homebrew');
        break;
      default:
        console.log('exec unknown "%s" action', action);
    }
  });

program
  .command('extension <action>')
  .description('extension actions')
  .action((action) => {
    switch (action) {
      case 'sign':
        cd('foxyext');
        exec('npm run lint && npm run lint:ext');
        exec(
          `./node_modules/.bin/web-ext sign --api-key=${process.env.AMO_JWT_ISSUER} --api-secret=${
            process.env.AMO_JWT_SECRET
          }`,
          { async: true }
        );
        break;
      case 'install':
        cp(
          '-f',
          `./foxyext/web-ext-artifacts/hey_foxy_extension-${VERSION}-an+fx.xpi`,
          'root/Library/Application Support/Mozilla/Extensions/{ec8030f7-c20a-464f-9b0e-13a3a9e97384}/foxycli@example.com.xpi'
        );
        break;
      case 'test':
        exec('npm test');
        break;
      case 'build':
        exec('packagesbuild -v pkg.pkgproj');
        break;
      default:
        console.log('exec unknown "%s" action', action);
    }
  });

program.parse(process.argv);
