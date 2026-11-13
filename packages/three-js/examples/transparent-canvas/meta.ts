// Three.js example: an alpha WebGPURenderer canvas layered over HTML content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transparent canvas over HTML',
  summary:
    'An alpha renderer with a clear alpha of 0, layered over a CSS gradient and heading. A slider moves the clear alpha so you can see what the page shows through.',
  section: 'Tips',
  tags: ['alpha', 'setClearAlpha', 'setClearColor', 'pointer-events', 'CSS'],
  docs: [
    'repo/manual/pages/tips.html',
    'repo/docs/pages/Renderer.html.md',
    'repo/docs/pages/WebGPURenderer.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
