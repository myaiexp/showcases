// deck-gl example: Transitions: enter, onStart, onEnd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transitions: enter, onStart, onEnd",
  summary:
    "New points fly in from Paris through the enter callback of a getPosition transition, while onStart, onEnd and onInterrupt report to a readout.",
  section: "Using layers",
  tags: ["transitions", "enter", "onStart", "onEnd", "onInterrupt"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/animations-and-transitions.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
