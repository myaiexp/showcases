// aframe example: Minecraft guide: a snap component for a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: a snap component for a grid',
  summary:
    'The guide shows snap only by its attributes (snap and offset), so this one is written from that description. A translucent box glides while its twin with snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5" moves in half-metre steps.',
  section: 'Guides',
  tags: ['snap', 'offset', 'registerComponent', 'vec3', 'tick', 'animation'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
