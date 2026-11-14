// one effect instance per element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One instance per element: a factory',
  summary:
    'Effects keep state, so the docs say not to share one instance between elements and to use a factory. Three words each get their own DriftEffect with its own persistent buffer and speed, so their trails move independently.',
  section: 'Custom Effects',
  tags: ['factory', 'effect instance', 'persistent', 'createRenderTarget', 'params', 'vfx.add'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
