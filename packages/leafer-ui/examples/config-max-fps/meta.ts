// leafer-ui example: Config: maxFPS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: maxFPS",
  summary:
    "maxFPS caps the render rate (it follows the display, up to 120 FPS, by default); values that divide 60 such as 30, 20 or 15 save work. It can change while running; leafer.FPS reports the rate reached.",
  section: "App & engine config",
  tags: ['Leafer', 'maxFPS', 'FPS', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
