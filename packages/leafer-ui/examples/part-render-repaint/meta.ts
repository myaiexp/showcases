// leafer-ui example: Partial rendering: only the changed region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial rendering: only the changed region",
  summary:
    "The engine redraws only the area an element changed. A red flash shows each repaint region (from RenderEvent.END): a small box around the moving ball with usePartRender on, the whole canvas with it off. The setting is changed live through config.",
  section: "Advanced",
  tags: ['App', 'tree', 'usePartRender', 'RenderEvent', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/partRender.md', 'pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
