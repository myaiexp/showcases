// playcanvas example: Texture formats from canvas.toBlob
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Texture formats from canvas.toBlob',
  summary:
    "PNG, JPEG and WebP are all supported texture formats, and a canvas can encode each in memory. The same detailed image is encoded three ways, served as blob URLs and loaded as texture assets on three boxes, with file sizes printed. The quality slider re-encodes the lossy two and swaps in new assets.",
  section: 'Assets',
  tags: ['Asset', 'texture', 'AssetRegistry', 'unload', 'canvas.toBlob', 'srgb', 'PNG', 'JPEG', 'WebP'],
  docs: [
    'repo/docs/user-manual/assets/supported-formats.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
