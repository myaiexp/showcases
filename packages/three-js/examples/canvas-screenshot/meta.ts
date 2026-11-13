// Three.js example: capture the canvas to thumbnails by rendering just before toBlob
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Taking a screenshot',
  summary:
    'A button captures the animated canvas into a strip of thumbnails. It renders and calls toBlob in the same task, because the drawing buffer is only valid until the browser presents the frame.',
  section: 'Tips',
  tags: ['toBlob', 'screenshot', 'drawing buffer', 'WebGPURenderer', 'canvas'],
  docs: ['repo/manual/pages/tips.html', 'repo/docs/pages/Renderer.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
