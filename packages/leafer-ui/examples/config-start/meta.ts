// leafer-ui example: Config: start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: start",
  summary:
    "start: false creates the engine without running it: elements can be added (even asynchronously) and nothing renders until leafer.start(). stop() pauses rendering and layout but keeps the state. The ball keeps moving in data while stopped.",
  section: "App & engine config",
  tags: ['Leafer', 'start', 'stop', 'running'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
