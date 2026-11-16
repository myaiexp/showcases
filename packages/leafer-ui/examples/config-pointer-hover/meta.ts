// leafer-ui example: Config pointer: hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: hover",
  summary:
    "pointer.hover: false stops pointer.over, out, enter and leave from being dispatched at all (useful on touch devices). Hovering the rect lights it only while hover is on.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'hover', 'PointerEvent', 'ENTER', 'LEAVE'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
