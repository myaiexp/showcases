// vchart example: Update animation: oneByOne and delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Update animation: oneByOne and delay",
  summary:
    "The update animation of a bar mark can run all bars together, one after another with oneByOne true, or with a fixed gap in milliseconds when oneByOne is a number. A select picks the mode; the data changes every few seconds.",
  section: "Option: Animation",
  tags: ["animationUpdate","oneByOne","delay","duration","update"],
  docs: [
    'repo/docs/assets/option/en/animate/mark-animate.md',
    'repo/docs/assets/option/en/animate/state-animate.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
