// tanstack-charts example: The adapter controller step by step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The adapter controller step by step",
  summary:
    "createChartAdapter is the lifecycle framework bindings build on: prerender returns markup, mount attaches to a container, update replaces the options, getScene reads the scene and destroy releases everything. Each step runs on its own and the log shows what it returned, including that getScene is undefined until mount and that a second mount throws.",
  section: "SSR and Hydration",
  tags: ['createChartAdapter', 'prerender', 'mount', 'update', 'getScene', 'destroy'],
  docs: ['repo/docs/reference/adapter-controller.md', 'repo/docs/guides/ssr-and-hydration.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
