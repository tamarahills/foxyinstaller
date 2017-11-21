import test from 'ava';
import { existsSync, statSync } from 'fs';

const RESOURCES = 'root/Applications/Foxy.app/Resources';
const EXTENSION =
  'root/Library/Application Support/Mozilla/Extensions/{ec8030f7-c20a-464f-9b0e-13a3a9e97384}';

test('"foxycli" folder is existed', (t) => {
  t.true(existsSync(`${RESOURCES}/foxycli`));
  t.true(statSync(`${RESOURCES}/foxycli`).isDirectory());
});

test('"cellar" folder is exitsted', (t) => {
  t.true(existsSync(`${RESOURCES}/cellar`));
  t.true(statSync(`${RESOURCES}/cellar`).isDirectory());
});

test('"node" folder is exitsted', (t) => {
  t.true(existsSync(`${RESOURCES}/node`));
  t.true(statSync(`${RESOURCES}/node`).isDirectory());
});

test('"foxycli/resources/Hey_Foxy.pmdl.original" file is exitsted', (t) => {
  t.true(
    existsSync(`${RESOURCES}/foxycli/resources/Hey_Foxy.pmdl.original`),
    'resources/Hey_Foxy.pmdl.original is not existed'
  );
  t.true(statSync(`${RESOURCES}/foxycli/resources/Hey_Foxy.pmdl.original`).isFile());
});

test('"foxycli/resources/Hey_Foxy.pmdl" file is not exitsted', (t) => {
  t.false(
    existsSync(`${RESOURCES}/foxycli/resources/Hey_Foxy.pmdl`),
    'resources/Hey_Foxy.pmdl is exists'
  );
});

test('"foxycli/config/config.json" file is not exitsted', (t) => {
  t.false(existsSync(`${RESOURCES}/foxycli/config/config.json`), 'config/config.json is exists');
});

test('"foxycli@example.com.xpi" file is not exitsted', (t) => {
  t.true(existsSync(`${EXTENSION}/foxycli@example.com.xpi`), 'foxycli@example.com.xpi is existed');
});
