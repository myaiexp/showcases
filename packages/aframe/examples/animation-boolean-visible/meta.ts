// aframe example: animation: a boolean property takes its to value at the end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: a boolean property takes its to value at the end",
  summary: "A boolean cannot be tweened, so the animation applies its to value when the cycle ends. The visible property of a box goes from false to true after a one-second cycle and back again, which makes it blink; a read-out shows the value.",
  section: 'Components',
  tags: ["animation", "visible", "boolean", "from", "to", "dir: alternate"],
  docs: ["repo/docs/components/animation.md", "repo/docs/components/visible.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
