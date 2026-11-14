// an Effect with an async init
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async init: vfx.add waits',
  summary:
    'The effect decodes a generated picture inside an async init(), then wraps it as a texture. vfx.add returns a promise that resolves only after init() has finished, so the picture stays plain HTML until the effect is ready. The init waits an extra second to make that gap visible.',
  section: 'Custom Effects',
  tags: ['init', 'async', 'Promise', 'vfx.add', 'vfx.remove', 'wrapTexture', 'HTMLImageElement'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
