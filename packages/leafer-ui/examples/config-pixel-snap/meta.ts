// leafer-ui example: Config: pixelSnap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: pixelSnap",
  summary:
    "pixelSnap rounds to physical pixels at render time, so a 1 px line at a fractional position stays crisp instead of smearing over two rows. Two tiny canvases, each shown magnified, draw the same frame and a diagonal; only the right one snaps.",
  section: "App & engine config",
  tags: ['Leafer', 'pixelSnap', 'pixelRatio', 'config', 'stroke'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
