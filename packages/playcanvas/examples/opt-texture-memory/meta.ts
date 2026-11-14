// playcanvas example: Texture formats and VRAM
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture formats and VRAM',
  summary:
    "Texture memory is a budget: a decoded image takes width x height x bytes per pixel, however small its file. The same checker is uploaded in RGBA8, RGB565, L8, DXT1 and DXT5 (the compressed ones built from solid blocks in code, with no file), each tile labelled with texture.gpuSize, and app.stats.vramTextureBytes shows the device total. Compressed formats appear only where the device flags such as extCompressedTextureS3TC are set. The full view also lists which of Basis's transcode targets this device supports, sized with TextureUtils.calcGpuSize.",
  section: 'Debugging and Optimization',
  tags: ['Texture', 'gpuSize', 'TextureUtils', 'calcGpuSize', 'PIXELFORMAT_DXT1', 'PIXELFORMAT_RGB565', 'vramTextureBytes', 'extCompressedTextureS3TC'],
  docs: ['repo/docs/user-manual/optimization/texture-compression.md', 'repo/docs/user-manual/optimization/app-stats.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
