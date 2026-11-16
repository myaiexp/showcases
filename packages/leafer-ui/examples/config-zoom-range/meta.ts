// leafer-ui example: Config zoom: min and max
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config zoom: min and max",
  summary:
    "zoom.min and zoom.max bound the view scale (0.02 to 256 by default). Zoom as far as you like with ctrl + wheel: the readout stops at the limits. The card zooms past the limits of 0.8 to 2.",
  section: "App & engine config",
  tags: ['Leafer', 'zoom', 'min', 'max', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/zoom.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
