const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeProgress, positiveNumber } = require('../lib/utils/numbers');

describe('public numeric inputs', () => {
  for (const [input, expected] of [
    [undefined, undefined],
    [NaN, undefined],
    [Infinity, undefined],
    [-20, 0],
    [140, 100],
    [0, 0],
    [42.5, 42.5],
  ]) {
    it(`normalizes progress ${input}`, () =>
      assert.equal(normalizeProgress(input), expected));
  }
  for (const input of [0, -1, NaN, Infinity]) {
    it(`rejects invalid size or duration ${input}`, () =>
      assert.equal(positiveNumber(input, 80), 80));
  }
  it('preserves positive sizes', () =>
    assert.equal(positiveNumber(48, 80), 48));
});

const { liquidBounds } = require('../lib/loaders/PillLoader/liquidGeometry');

it('keeps liquid bounds aligned to gravity as a capsule rotates', () => {
  assert.equal(liquidBounds(40, 80, 0), 80);
  assert.ok(Math.abs(liquidBounds(40, 80, 90) - 40) < 0.0001);
  assert.equal(liquidBounds(40, 80, 180), 80);
  assert.equal(liquidBounds(40, 80, -35), liquidBounds(40, 80, 35));
  assert.ok(
    Math.abs(liquidBounds(40, 80, -35) - liquidBounds(40, 80, 325)) < 0.0001,
  );
});

it('keeps circular liquid bounds constant at any angle', () => {
  for (const angle of [0, 45, 90, 180, 360]) {
    assert.equal(liquidBounds(40, 40, angle), 40);
  }
});
