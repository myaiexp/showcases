// Pretext example: auto-size a textarea from prepare() with pre-wrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto-growing textarea',
  summary:
    'A textarea is sized from prepare(value, font, { whiteSpace: \'pre-wrap\' }) and layout() on every keystroke, adding the extra line a textarea shows when its value is empty or ends with a newline.',
  section: 'Measure height',
  tags: ['pre-wrap', 'textarea', 'prepare', 'layout'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
