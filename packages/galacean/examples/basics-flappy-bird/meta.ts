// galacean example: Basics: Flappy Bird in script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Basics: Flappy Bird in script",
  summary:
    "The Flappy Bird tutorial's script half without the Editor: a GameCtrl EventDispatcher with Idle, Flying, Crash and Result states, a bird with free-fall flaps, pooled pipes, trigger colliders and a restart button with onPointerClick, all with sprites drawn in code. Click to flap; cards play themselves.",
  section: "Basics",
  tags: ['EventDispatcher', 'Script', 'SpriteRenderer', 'DynamicCollider', 'StaticCollider', 'onTriggerEnter', 'onPointerClick', 'isPointerDown'],
  docs: [
    'repo/docs/en/basics/quickStart/flappy-bird.mdx',
    'repo/docs/en/script/communication.mdx',
    'repo/docs/en/input/pointer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
