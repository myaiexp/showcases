// leafer-ui example: Background runner: keep rendering after switching tabs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Background runner: keep rendering after switching tabs",
  summary:
    "A browser pauses requestAnimationFrame in a hidden tab. Importing @leafer-in/bg-runner keeps the engine rendering from a timer instead. The counters tell total renders from renders that happened while the tab was hidden.",
  section: 'Official plugins',
  tags: ["bg-runner", "BackgroundRunner", "RenderEvent.START", "animation"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
