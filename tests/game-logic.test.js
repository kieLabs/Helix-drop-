const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/function normalizeAngle\(a\)\{[\s\S]*?window\.__helixLogic=\{[^}]+\};/);
assert.ok(match, 'Browser-used helix physics rules should be exposed for deterministic tests');
const sandbox = { window: {}, TWO_PI: Math.PI * 2 };
vm.runInNewContext(match[0], sandbox);
const logic = sandbox.window.__helixLogic;

assert.equal(logic.normalizeAngle(0), 0);
assert.ok(Math.abs(logic.normalizeAngle(-0.5) - (Math.PI * 2 - 0.5)) < 1e-10);
assert.equal(logic.getSectorIndex(Math.PI / 2, 12), 3);
assert.equal(logic.getSectorIndex(Math.PI * 2, 12), 0);

const initial = () => ({ layer: 0, combo: 0, fireball: false, score: 0, mode: 'falling', velocity: -2, bounceVelocity: 4.8 });
let r = logic.applyImpact(initial(), 'gap');
assert.equal(r.outcome, 'drop');
assert.equal(r.state.layer, 1, 'passing a gap advances to the next platform');
assert.equal(r.state.combo, 1, 'a clean gap increases the consecutive-drop combo');
assert.equal(r.state.mode, 'falling', 'a gap keeps the character in free fall');

let s = initial();
s = logic.applyImpact(s, 'gap').state;
s = logic.applyImpact(s, 'gap').state;
s = logic.applyImpact(s, 'gap').state;
assert.equal(s.combo, 3);
assert.equal(s.fireball, true, 'three uninterrupted gap drops arm fireball');

r = logic.applyImpact(s, 'hazard');
assert.equal(r.outcome, 'smash', 'fireball destroys a hazard platform instead of killing the player');
assert.equal(r.state.layer, 4);
assert.equal(r.state.fireball, false, 'fireball is consumed after one platform smash');
assert.equal(r.state.mode, 'falling', 'smash continues the downward fall');

r = logic.applyImpact(initial(), 'hazard');
assert.equal(r.outcome, 'crash', 'a normal landing on a hazard ends the run');
assert.equal(r.state.mode, 'dead');

r = logic.applyImpact(initial(), 'safe');
assert.equal(r.outcome, 'land');
assert.equal(r.state.mode, 'bouncing', 'safe platforms launch the character into an automatic bounce');
assert.equal(r.state.velocity, 4.8);
assert.equal(r.state.combo, 0, 'a safe landing resets the consecutive-drop combo');
assert.equal(r.state.score, 0, 'bouncing on the same platform must not count as passing a level');

r = logic.applyImpact({ ...initial(), combo: 2 }, 'safe');
assert.equal(r.outcome, 'land', 'two clean gaps are not enough to smash a safe platform');
assert.equal(r.state.fireball, false);

console.log('PASS: 23 helix physics and state-transition assertions');
