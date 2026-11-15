// postprocessing example: a CopyPass frozen as a snapshot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CopyPass: snapshot and difference',
  summary:
    'The CopyPass is enabled for a single frame and then disabled, so its texture holds a frozen snapshot of the scene. A TextureEffect compares the live picture with it: DIFFERENCE lights up whatever has moved since, NORMAL shows the frozen frame itself.',
  section: 'Passes',
  tags: ['CopyPass', 'enabled', 'texture', 'TextureEffect', 'DIFFERENCE', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/passes/CopyPass.js', 'repo/src/passes/Pass.js', 'repo/src/effects/TextureEffect.js', 'repo/src/enums/BlendFunction.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
