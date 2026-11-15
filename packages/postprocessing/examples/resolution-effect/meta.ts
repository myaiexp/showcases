// postprocessing example: a custom effect that owns a Resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resolution: in a custom effect',
  summary:
    'This effect keeps a Resolution. Its setSize() hands the composer size to `setBaseSize`, a change listener resizes a small render target to the resolution\'s width and height, and update() copies the frame into it with a CopyPass. The shader shows that target with nearest filtering, so lowering `resolution.scale` gives chunky pixels.',
  section: 'Utilities',
  tags: ['Resolution', 'scale', 'setBaseSize', 'Effect', 'setSize', 'update', 'CopyPass', 'initialize'],
  docs: ['repo/README.md', 'repo/src/core/Resolution.js', 'repo/src/effects/Effect.js', 'repo/src/passes/CopyPass.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
