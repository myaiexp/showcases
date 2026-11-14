// marked example: Task lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Task lists",
  summary:
    'A bullet that starts with [ ] or [x] becomes a checkbox that is empty or ticked, a GitHub Flavored Markdown feature. Marked outputs a disabled checkbox input.',
  section: 'Supported Markdown',
  tags: ['checkbox','GFM','list'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
