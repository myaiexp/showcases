// postprocessing example: composer multisampling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MSAA through the composer',
  summary:
    'Hardware multisampling set on the EffectComposer instead of the renderer. Change composer.multisampling between 0, 2, 4 and 8 and watch the wire edges soften. A CopyPass sits last so the multisampled buffer is resolved to the screen.',
  section: 'Antialiasing',
  tags: ['EffectComposer', 'multisampling', 'RenderPass', 'CopyPass'],
  docs: ['repo/src/core/EffectComposer.js', 'repo/src/passes/CopyPass.js', 'repo/src/passes/RenderPass.js', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
