// leafer-ui example: Config wheel: disabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config wheel: disabled",
  summary:
    "wheel.disabled: true switches wheel events off: the wheel neither pans nor zooms. It takes effect immediately when changed on a running engine; dragging with the pointer is unaffected.",
  section: "App & engine config",
  tags: ['Leafer', 'wheel', 'disabled', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/wheel.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
