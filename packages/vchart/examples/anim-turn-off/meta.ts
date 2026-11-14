// vchart example: Turning animation off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Turning animation off",
  summary:
    "The same updateData loop with animation switched on and off. spec.animation false removes every animation; the card flips the flag each round and the full view has a checkbox.",
  section: 'Animation',
  tags: ['animation', 'updateSpec', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Attributes_and_Settings.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
