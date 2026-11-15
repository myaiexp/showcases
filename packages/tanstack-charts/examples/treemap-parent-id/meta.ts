// tanstack-charts example: Treemap from parent ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap from parent ids",
  summary:
    "The same file tree given as rows with an id and a parent id. Group rows carry no size and sum up their children. Node ids are opaque here, so each label shows the whole id such as app/core/scene.",
  section: "Treemap Mark",
  tags: ['tooltip format', 'treemap', 'nodeId', 'parentId', 'value', 'radius'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
