// galacean example: Basics: rendering benchmark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Basics: rendering benchmark",
  summary:
    "The benchmark's first scenario in miniature: many glTF models and ten point lights, with a frame-time readout. Models come from one generated glTF instantiated again and again; the full view adds a slider for the count.",
  section: "Basics",
  tags: ['GLTFResource', 'instantiateSceneRoot', 'PointLight', 'AssetType', 'Time'],
  docs: [
    'repo/docs/en/basics/benchmark.mdx',
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
