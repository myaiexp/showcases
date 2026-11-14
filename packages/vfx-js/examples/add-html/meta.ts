// VFX-JS example: vfx.addHTML and supportsHtmlInCanvas on a small form
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'addHTML: a live capture',
  summary:
    'vfx.addHTML wraps an element in a canvas and uses the browser\'s html-in-canvas API, which repaints the capture whenever the element changes: typing, hover, CSS animation. Today that needs a Chrome flag; elsewhere addHTML falls back to the one-time capture, and supportsHtmlInCanvas() tells which you got.',
  section: 'How it Works',
  tags: ['addHTML', 'supportsHtmlInCanvas', 'html-in-canvas', 'capture'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/docs/html-in-canvas.md', 'repo/packages/vfx-js/src/vfx.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
