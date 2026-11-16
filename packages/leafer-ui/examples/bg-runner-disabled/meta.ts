// leafer-ui example: Background runner: disabled switches background rendering off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Background runner: disabled switches background rendering off",
  summary:
    "BackgroundRunner.disabled = true makes the engine render with requestAnimationFrame only, as without the plugin, so a hidden tab pauses the animation. The checkbox sets it, and the counters show renders while hidden.",
  section: 'Official plugins',
  tags: ["BackgroundRunner", "disabled", "bg-runner"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/bg-runner/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
