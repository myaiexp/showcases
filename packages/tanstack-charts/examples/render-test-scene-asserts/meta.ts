// tanstack-charts example: Assertions on a compiled scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assertions on a compiled scene",
  summary:
    "The testing guide starts at the scene: compile with createChartScene and assert on points, domains and bounds with no DOM. A small runner evaluates five checks on the scene and prints a pass or fail line for each. The checkbox drops a row from the data, and the checks that depend on the row count start to fail.",
  section: "Testing and Debugging",
  tags: ['createChartScene', 'scene.points', 'scene.scales', 'scene.chart', 'assertions'],
  docs: ['repo/docs/guides/testing-and-debugging.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
