// 3d-force-graph example: Utility: getGraphBbox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: getGraphBbox",
  summary:
    "getGraphBbox(filter) returns the { x, y, z } ranges around the nodes, or just those a filter keeps. A three Box3Helper is resized to it every frame, with the numbers in a readout.",
  section: "Utility",
  tags: ['getGraphBbox', 'scene'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
