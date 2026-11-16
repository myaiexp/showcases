// leafer-ui example: Data: new Leafer(config, json)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: new Leafer(config, json)",
  summary:
    "A Leafer can be created straight from exported JSON: new Leafer(config, json). The right engine is rebuilt from the left one's toJSON() after each change.",
  section: "Data",
  tags: ["Leafer","toJSON","json"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/json.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
