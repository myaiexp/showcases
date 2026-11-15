// postprocessing example: antialiasing methods side by side in time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Antialiasing: none, MSAA, FXAA, SMAA',
  summary:
    'The same wire scene with no antialiasing, composer multisampling, an FXAAEffect and an SMAAEffect, swapped by replacing the composer\'s last pass. MSAA works on geometry edges before shading, FXAA and SMAA work on the finished image.',
  section: 'Antialiasing',
  tags: ['EffectComposer', 'multisampling', 'FXAAEffect', 'SMAAEffect', 'CopyPass', 'removePass', 'addPass'],
  docs: ['repo/src/core/EffectComposer.js', 'repo/src/effects/FXAAEffect.js', 'repo/src/effects/SMAAEffect.js', 'repo/src/passes/CopyPass.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
