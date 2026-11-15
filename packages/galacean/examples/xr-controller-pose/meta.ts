// galacean example: XR: reading a controller
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: reading a controller",
  summary:
    "The docs' controller reads, run on the left-controller object with made-up data: a script writes a pose and Select and Squeeze presses into it, and the scene then reads gripPose, isButtonDown, isButtonHeldDown and isButtonUp back to move and colour a stand-in controller. A real headset fills the same fields.",
  section: "XR",
  tags: ['XRController.gripPose', 'XRController.isButtonDown', 'XRController.isButtonHeldDown', 'XRController.isButtonUp', 'XRInputButton'],
  docs: [
    'repo/docs/en/xr/system/input.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
