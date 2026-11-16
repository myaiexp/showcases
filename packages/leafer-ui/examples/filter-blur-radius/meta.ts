// leafer-ui example: Filter: change a filter value live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: change a filter value live",
  summary:
    "A filter is plain data on the element: assigning a new filter object re-renders it. The slider sets blur from 0 to 40 on a custom blur filter, and getSpread keeps the soft edge inside the bounds.",
  section: 'Official plugins',
  tags: ["filter", "Filter.register", "getSpread", "blur"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
