// playcanvas example: Version and device support
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Version and device support",
  summary: "createGraphicsDevice asks for WebGPU and falls back to WebGL 2. The full view prints pc.version, the device type that was chosen, whether the browser exposes navigator.gpu, and a few device limits next to a spinning model.",
  section: "Engine",
  tags: ["createGraphicsDevice","DEVICETYPE_WEBGPU","version","revision","isWebGPU"],
  docs: ["repo/docs/user-manual/engine/versioning.md","repo/docs/user-manual/engine/supported-browsers.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
