// leafer-ui example: Config: shadowDOM
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: shadowDOM",
  summary:
    "shadowDOM: true is for micro-frontends: the Leafer mounts inside a Shadow DOM tree, so its canvas is invisible to document-level queries. The div here has a shadow root; the readout compares the canvas counts.",
  section: "App & engine config",
  tags: ['Leafer', 'shadowDOM', 'view'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
