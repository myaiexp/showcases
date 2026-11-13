// echarts example: Label formatter templates and callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label formatter templates and callbacks',
  summary:
    'The same bar labels written six ways: string templates with {a}, {b}, {c}, {@dimension} and {@[index]}, a callback that reads params, a callback that returns rich text, and one that returns an empty string to hide a label.',
  section: 'Label',
  tags: ['label.formatter', '{a}', '{b}', '{c}', '{@xxx}', '{@[n]}', 'rich', 'params'],
  docs: [
    'repo/contents/en/concepts/dataset.md',
    'repo/contents/en/how-to/label/rich-text.md',
    'repo/en/option/partial/label.md',
    'repo/en/option/partial/2d-data.md',
    'repo/en/option/partial/formatter.md',
    'repo/en/option/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
