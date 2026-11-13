// Three.js example: arrow keys on a canvas made focusable with tabindex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyboard input on a canvas',
  summary:
    'A canvas with tabindex="0" receives keydown events, so the arrow keys slide a cube across a grid. The default focus outline is removed and replaced by a border.',
  section: 'Tips',
  tags: ['tabindex', 'keydown', 'focus', 'canvas', 'input'],
  docs: ['repo/manual/pages/tips.html', 'repo/docs/pages/GridHelper.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
