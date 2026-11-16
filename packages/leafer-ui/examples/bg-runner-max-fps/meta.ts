// leafer-ui example: Background runner: maxFPS limits hidden-tab rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Background runner: maxFPS limits hidden-tab rendering",
  summary:
    "BackgroundRunner.maxFPS (default 60) is the frame rate the engine renders at while the tab is hidden. The select sets it; after you switch to another tab and back, the readout gives the frame rate of that hidden stretch.",
  section: 'Official plugins',
  tags: ["BackgroundRunner", "maxFPS", "bg-runner", "visibilitychange"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
