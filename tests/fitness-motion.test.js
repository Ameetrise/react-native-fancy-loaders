const { it } = require('node:test');
const assert = require('node:assert/strict');
const {
  jumpingJackPose,
  jackFrames,
} = require('../lib/loaders/FitnessLoader/jumpingJackMotion');

it('joins the jumping-jack loop in the same resting pose', () => {
  assert.deepEqual(jumpingJackPose(0), jumpingJackPose(1));
});
it('leaves the ground twice and lands in both stances', () => {
  assert.ok(jumpingJackPose(0.28).bodyY < 0);
  assert.ok(jumpingJackPose(0.76).bodyY < 0);
  assert.equal(jumpingJackPose(0.52).leg, 30);
  assert.equal(jumpingJackPose(1).leg, 3);
  assert.ok(jumpingJackPose(0.52).bodyY > 0);
});
it('keeps all sampled poses finite and within the artwork', () => {
  for (const frame of jackFrames) {
    assert.ok(Object.values(frame).every(Number.isFinite));
    assert.ok(frame.bodyY > -0.1 && frame.bodyY < 0.1);
    assert.ok(frame.arm >= 8 && frame.arm <= 156);
  }
});
