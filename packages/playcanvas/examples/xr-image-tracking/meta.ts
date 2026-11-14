// playcanvas example: Image tracking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image tracking',
  summary:
    "AR image tracking finds printed images in the camera feed. A generated marker is registered with imageTracking.add(image, width) before the session, as the docs require, and the tracked image reports a pose plus tracking, emulated and trackable states and the tracked and untracked events. A simulated card moves while it is tracked and stays put once lost, when the pose is only emulated from the last sighting: a cube hovers over it and the outline turns from green to amber. In a session the same follow code runs on the real XrTrackedImage.",
  section: 'XR',
  tags: ['XrImageTracking', 'XrTrackedImage', 'imageTracking.add', 'tracking', 'emulated', 'trackable', 'tracked', 'untracked'],
  docs: ['repo/docs/user-manual/xr/ar/image-tracking.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
