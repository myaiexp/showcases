// galacean example: Script: shared state controller
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: shared state controller",
  summary:
    "A small GameCtrl extending EventDispatcher holds a state (Idle, Flying, Crash, Result) and dispatches State_Change; three scripts on three entities each react in their own way, as in the Flappy Bird tutorial.",
  section: "Script",
  tags: ['Script', 'EventDispatcher', 'dispatch', 'on'],
  docs: [
    'repo/docs/en/script/communication.mdx',
    'repo/docs/en/basics/quickStart/flappy-bird.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
