// css-doodle example: A minus before a command name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A minus before a command name",
  summary:
    "A minus sign before a command name negates its value, each part of move and scale included. Written -rotate: 30 the star turns clockwise instead.",
  section: 'Shapes',
  tags: ['@shape', 'rotate', 'move'],
  docs: ['repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
