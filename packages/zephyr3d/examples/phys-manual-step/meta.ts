// zephyr3d example: Stepping the world by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stepping the world by hand',
  summary:
    'With world.enabled = false the world only moves when you call world.update(dt), still in fixed steps: a time-scale slider gives slow motion and a button advances one 1/60 s step.',
  section: 'Physics',
  tags: ['enabled', 'update', 'physicsWorld'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
