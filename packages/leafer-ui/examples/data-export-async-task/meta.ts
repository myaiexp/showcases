// leafer-ui example: Data: export waits for Resource.tasker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: export waits for Resource.tasker",
  summary:
    "Resource.tasker.add(fn) adds an async task that an export waits for before rendering. The task takes 0.8 s and changes the fill; the export's time includes it.",
  section: "Data",
  tags: ["Resource","tasker","export"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/export.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
