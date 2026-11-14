// PlayCanvas: Rendering 3D into an image element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rendering 3D into an image element",
  summary:
    "A camera on its own layer renders a spinning model into a render target, and an image element shows that texture: the way character portraits and item previews are made. The camera has priority -1 so the texture is ready when the interface draws.",
  section: "User Interface",
  tags: ["RenderTarget","RENDERTARGET_ORIGIN_TOP","Layer","priority","texture","PIXELFORMAT_SRGBA8"],
  docs: ["repo/docs/user-manual/user-interface/image-elements.md","repo/docs/user-manual/user-interface/draw-order-and-performance.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
