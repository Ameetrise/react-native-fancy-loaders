/** Height of a rotated capsule's bounding box, measured in screen space. */
export function liquidBounds(width: number, height: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  // A capsule is a circle swept along a line: unlike a rectangle, its rounded
  // ends do not add extra height as it rotates.
  return width + Math.max(0, height - width) * Math.abs(Math.cos(radians));
}

export const rotationSamples = Array.from(
  { length: 73 },
  (_, index) => index / 72,
);
