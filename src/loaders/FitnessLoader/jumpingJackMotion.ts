// Grounded poses alternate with two short jumps. Values use artwork-relative
// distances so the same motion works at icon and full-screen sizes.
const poses = [
  { time: 0, spread: 0, jump: 0, crouch: 0 },
  { time: 0.08, spread: 0, jump: 0, crouch: 1 },
  { time: 0.28, spread: 0.65, jump: 1, crouch: 0 },
  { time: 0.44, spread: 1, jump: 0, crouch: 0.5 },
  { time: 0.52, spread: 1, jump: 0, crouch: 0 },
  { time: 0.6, spread: 1, jump: 0, crouch: 0.7 },
  { time: 0.76, spread: 0.4, jump: 1, crouch: 0 },
  { time: 0.94, spread: 0, jump: 0, crouch: 0.5 },
  { time: 1, spread: 0, jump: 0, crouch: 0 },
];

export function jumpingJackPose(phase: number) {
  const time = Math.max(0, Math.min(1, phase));
  const end = poses.findIndex((pose) => pose.time >= time);
  const to = poses[Math.max(1, end)]!;
  const from = poses[Math.max(0, end - 1)]!;
  const fraction = (time - from.time) / (to.time - from.time);
  const eased = fraction * fraction * (3 - 2 * fraction);
  const spread = from.spread + (to.spread - from.spread) * eased;
  const jump = from.jump + (to.jump - from.jump) * eased;
  const crouch = from.crouch + (to.crouch - from.crouch) * eased;
  const leg = 3 + spread * 27;
  // Lower the hips in the wide stance so the feet return to the same floor.
  const stanceDrop = 0.26 * (1 - Math.cos((leg * Math.PI) / 180));

  return {
    arm: 8 + spread * 148,
    elbow: 8 + spread * 58,
    leg,
    bodyY: stanceDrop - jump * 0.065 + crouch * 0.012,
    bodyScale: 1 - crouch * 0.035,
    shadowScale: 1 + spread * 0.3 - jump * 0.2,
    shadowOpacity: 0.2 - jump * 0.09,
  };
}

export const jackPhases = Array.from({ length: 81 }, (_, index) => index / 80);
export const jackFrames = jackPhases.map(jumpingJackPose);
