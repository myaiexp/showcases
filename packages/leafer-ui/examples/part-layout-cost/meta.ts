// leafer-ui example: Partial layout: when everything moves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial layout: when everything moves",
  summary:
    "usePartLayout tracks which elements changed so layout can skip the rest. When nearly everything changes each frame, that tracking is overhead: turn it off and compare the average layout time printed from the layout events.",
  section: "Advanced",
  tags: ['Leafer', 'usePartLayout', 'LayoutEvent', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/partRender.md', 'pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
