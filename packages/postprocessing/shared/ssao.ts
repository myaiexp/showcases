// SSAO examples: room stage options and a camera sway that keeps walls in view
import type { Stage, StageOptions } from './stage.ts';

/** Stage options for examples on `room()`. No orbit: it would swing through the two walls. */
export const AO_STAGE: StageOptions = { position: [5.2, 3.6, 6.6], target: [-0.6, 1, -0.6], background: 0x15171d, orbit: false };

/** Slides the camera a little left and right of the room's corner; call it every frame. */
export function sway(stage: Stage, t: number): void {
  stage.camera.position.x = 5.2 + Math.sin(t * 0.35) * 1.6;
  stage.camera.lookAt(-0.6, 1, -0.6);
}
