// VFX-JS example: VFX.init() and the plain-HTML fallback when WebGL is missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'VFX.init() and the plain-HTML fallback',
  summary:
    'new VFX() throws when WebGL is not available; VFX.init() returns null instead. The example branches on that result: with a VFX it adds the glitch preset, with null it leaves the headline as ordinary HTML. The toggle takes the null branch on purpose, since this browser has WebGL.',
  section: 'Getting Started',
  tags: ['VFX.init', 'fallback', 'WebGL', 'progressive enhancement'],
  docs: ['pages/amagi-dev/vfx-js/getting-started.md', 'pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/vfx.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
