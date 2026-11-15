// galacean example: Renderer base properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer base properties",
  summary:
    "The base Renderer fields the docs print with console.log, shown live for one cube drifting out of view: castShadows, receiveShadows, priority, materialCount, bounds and isCulled.",
  section: "Renderer",
  tags: ['Renderer.castShadows', 'Renderer.receiveShadows', 'Renderer.priority', 'Renderer.materialCount', 'Renderer.bounds', 'Renderer.isCulled'],
  docs: [
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
