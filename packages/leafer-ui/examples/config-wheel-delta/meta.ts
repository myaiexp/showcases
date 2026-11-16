// leafer-ui example: Config wheel: delta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config wheel: delta",
  summary:
    "wheel.delta is the base wheel step ({ x: 20, y: 8 } by default) that zoomSpeed and moveSpeed are measured against; if the speeds do not feel right on some system, adjust it. A larger y delta means smaller zoom steps.",
  section: "App & engine config",
  tags: ['Leafer', 'wheel', 'delta', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/wheel.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
