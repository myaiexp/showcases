// postprocessing example: RenderPass ignoreBackground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RenderPass: ignoreBackground',
  summary:
    'The scene has a gradient background and the renderer an orange clear colour. With ignoreBackground set, the RenderPass hides scene.background while it renders, so the clear colour shows through instead; the pass restores the background afterwards.',
  section: 'Passes',
  tags: ['RenderPass', 'ignoreBackground', 'clearPass', 'scene.background', 'EffectComposer'],
  docs: ['repo/README.md', 'repo/src/passes/RenderPass.js', 'repo/src/passes/ClearPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
