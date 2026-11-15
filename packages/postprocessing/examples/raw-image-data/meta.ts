// postprocessing example: RawImageData from ImageData and from an Image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RawImageData: from and toCanvas',
  summary:
    'RawImageData holds width, height and RGBA bytes. `RawImageData.from()` reads an ImageData (sharing its pixel array) or an Image element, `toCanvas()` draws it into a new canvas, and the constructor wraps any Uint8ClampedArray. A moving plasma goes through all three paths.',
  section: 'Utilities',
  tags: ['RawImageData', 'from', 'toCanvas', 'ImageData'],
  docs: ['repo/src/textures/RawImageData.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
