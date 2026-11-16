// leafer-ui example: Data: App JSON through app.tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: App JSON through app.tree",
  summary:
    "An App cannot be imported or exported directly: export app.tree with toJSON(), then import with app.tree.set({ children: json.children }). The right app copies the left.",
  section: "Data",
  tags: ["App","tree","toJSON","set"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/json.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
