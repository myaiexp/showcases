// globe-gl example: Render: postProcessingComposer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: postProcessingComposer",
  summary:
    "postProcessingComposer() returns the Three.js EffectComposer globe.gl renders through, which holds a single RenderPass by default. Adding an UnrealBloomPass makes the city lights, the dashed arcs and the rings glow; the full view tunes the pass.",
  section: "Render Control",
  tags: ["postProcessingComposer", "EffectComposer", "UnrealBloomPass", "arcsData", "ringsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
