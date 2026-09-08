import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import * as THREE from 'three';

const html = fs.readFileSync('index.html', 'utf8');
const main = fs.readFileSync('src/main.js', 'utf8');
const keyboard = fs.readFileSync('src/keyboard.js', 'utf8');
const css = fs.readFileSync('src/style.css', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id), `Missing anchor: ${id}`);
for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  const target = ref.startsWith('/src/') ? ref.slice(1) : path.join('public', ref.slice(1));
  assert(fs.existsSync(target), `Missing asset: ${target}`);
}
const integrations = ['diskdrive.webp', 'meta.svg', 'whatsapp.svg', 'gmail.svg', 'outlook.svg', 'excel.svg', 'claude.svg', 'openai.svg'];
for (const file of integrations) {
  const asset = fs.readFileSync(path.join('public/integrations', file));
  assert(asset.length > 100, `Empty integration: ${file}`);
  if (file.endsWith('.svg')) { const text = asset.toString(); assert(text.includes('<svg'), `Invalid SVG: ${file}`); assert(!/<script|<!ENTITY|javascript:/i.test(text), `Unsafe SVG: ${file}`); }
}
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/.test(main), 'Demo form must not transmit or persist data');
assert(main.includes('event.preventDefault()') && main.includes('reportValidity()'), 'Missing form validation');
assert(main.includes('ArrowRight') && main.includes('ArrowLeft'), 'Tabs need keyboard controls');
assert(css.includes('prefers-reduced-motion') && main.includes('prefers-reduced-motion'), 'Reduced motion is required');
assert(keyboard.includes('document.hidden') && keyboard.includes('IntersectionObserver'), '3D must suspend offscreen');
assert(html.includes('Demo form') && html.includes('ILLUSTRATIVE PREVIEW'), 'Demo boundaries must be visible');
assert(html.includes('name="description"') && html.includes('<html lang="en-ZA">'), 'Metadata missing');
assert(css.includes('@media(max-width:390px)'), 'Narrow mobile styling missing');
const fitAspect = Number(keyboard.match(/Math\.max\(1, ([\d.]+)\/aspect\)/)[1]);
for (const [width, height] of [[1380, 490], [1024, 380], [760, 300], [390, 300], [320, 265]]) {
  const camera = new THREE.PerspectiveCamera(29, width / height, .1, 100);
  camera.position.set(0, 9.8, 10.5).multiplyScalar(Math.max(1, fitAspect / (width / height)));
  camera.lookAt(0, 0, .25); camera.updateMatrixWorld();
  for (const tilt of [-.035, .035]) {
    const board = new THREE.Group(); board.rotation.set(tilt, -.06 + tilt, -.025); board.updateMatrixWorld();
    for (const x of [-8.175, 8.175]) for (const y of [-.4, .85]) for (const z of [-2.775, 2.775]) {
      const point = new THREE.Vector3(x, y, z).applyMatrix4(board.matrixWorld).project(camera);
      assert(Math.abs(point.x) < .99 && Math.abs(point.y) < .99, `Keyboard geometry clips at ${width} × ${height}`);
    }
  }
}
console.log('Passed: anchors, unique IDs, 11 local assets, SVG safety, demo form boundaries, tab keyboard controls, reduced motion, rendering suspension, metadata and mobile rules.');
console.log('Passed: 3D keyboard fits five screen sizes, including maximum animated tilt.');
