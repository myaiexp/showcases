// echarts example: Rich text inheriting the plain label style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rich text inheriting the plain label style',
  summary:
    'The v6 upgrade-guide change: rich fragments now inherit fontSize, fontWeight, fontStyle, fontFamily and the text shadow from the plain label. Flip richInheritPlainLabel off, at the root of the option or on the label, to see the v5 look come back.',
  section: "What's New in 6",
  tags: ['richInheritPlainLabel', 'label.rich', 'label.formatter', 'fontSize', 'fontWeight', 'fontStyle', 'textShadowBlur'],
  docs: [
    'repo/contents/en/basics/release-note/v6-upgrade-guide.md',
    'repo/en/option/partial/rich-inherit-plain-label.md',
    'repo/en/option/partial/text-style.md',
    'repo/contents/en/how-to/label/rich-text.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
