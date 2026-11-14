// playcanvas example: Depth sensing and camera color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth sensing and camera color',
  summary:
    "Depth sensing gives AR a distance for every camera pixel, and camera color gives the camera image itself. A simulated room supplies both as textures: the depth is packed in two bytes (the LA8 layout) and unpacked in a shader with the docs' dot product and raw-to-metres factor. Switch between the depth map, the camera colour and an occlusion view where a virtual disc hides behind nearer real surfaces; hover to read a distance, as view.getDepth(u, v) does. The Enter AR button requests depthSensing preferences and cameraColor, and shows the real support flags.",
  section: 'XR',
  tags: ['XrViews', 'supportedDepth', 'supportedColor', 'depthSensing', 'cameraColor', 'getDepth', 'XRDEPTHSENSINGUSAGE_GPU', 'XRDEPTHSENSINGFORMAT_F32', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/xr/ar/depth-sensing.md', 'repo/docs/user-manual/xr/ar/camera-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
