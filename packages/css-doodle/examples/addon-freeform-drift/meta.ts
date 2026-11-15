// The addons guide's drifting freeform gradient: $drift() with @r speeds per call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drifting gradient points',
  summary:
    "The addons guide's moving freeform gradient. A function defined with --drift() writes a position as math with t, and because each call gets its own @r() values, every one of the four points wanders on its own path. Each new seed sends them on new ones.",
  section: 'Addons',
  tags: ["gradient-2d", "@freeform-gradient", "--name()", "@r", "t"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/gradient-2d/README.md", "pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
