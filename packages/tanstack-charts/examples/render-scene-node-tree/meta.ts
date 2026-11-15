// tanstack-charts example: The scene as a tree of keyed nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The scene as a tree of keyed nodes",
  summary:
    "createChartScene compiles a definition to plain data: groups, rules, polylines, areas, dots, rects and labels, each with a stable key. The readout prints the tree with indentation for the first nodes of whichever definition is selected, which is the structure any renderer receives.",
  section: "Runtime and Scene",
  tags: ['createChartScene', 'SceneNode', 'group', 'key', 'scene.nodes'],
  docs: ['repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
