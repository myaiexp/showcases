// fabric example: Images: a video as an image source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Images: a video as an image source',
  summary:
    'A video element is a valid FabricImage source: a canvas animated in code feeds it through captureStream(), and the canvas is re-rendered every frame.',
  section: 'Images',
  tags: ['FabricImage', 'HTMLVideoElement', 'captureStream', 'requestRenderAll'],
  docs: ['repo/src/content/docs/api/classes/FabricImage.md', 'repo/src/content/docs/api/classes/Canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
