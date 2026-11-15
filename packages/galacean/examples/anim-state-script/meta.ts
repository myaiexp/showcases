// galacean example: Animation: state machine scripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: state machine scripts",
  summary:
    "A StateMachineScript added to each state logs onStateEnter, onStateUpdate counts and onStateExit as Idle, Walk and Wave chain on.",
  section: "Animation",
  tags: ['StateMachineScript','onStateEnter','onStateUpdate','onStateExit','addStateMachineScript'],
  docs: [
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
