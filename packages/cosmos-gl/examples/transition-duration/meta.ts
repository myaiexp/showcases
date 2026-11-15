// cosmos-gl example: Transition duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transition duration",
  summary:
    "transitionDuration sets how long a move takes, and 0 snaps. render(undefined, ms) overrides it for a single call, so one update can snap or run slowly without touching the config.",
  section: "Transitions",
  tags: ["transitionDuration", "render", "setConfigPartial"],
  docs: [
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
