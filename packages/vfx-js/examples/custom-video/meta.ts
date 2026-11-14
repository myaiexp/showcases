// a wrapped video blended into an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A wrapped video as a second input',
  summary:
    'The element is a picture, and the effect wraps a separate video with ctx.wrapTexture. Videos upload every frame by default, so the live clip sweeps across the still picture through a soft diagonal edge. The video is never shown in the page itself.',
  section: 'Custom Effects',
  tags: ['wrapTexture', 'HTMLVideoElement', 'autoUpdate', 'EffectTexture', 'uvContent', 'uvSrc'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/skills/vfx-js/references/effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
