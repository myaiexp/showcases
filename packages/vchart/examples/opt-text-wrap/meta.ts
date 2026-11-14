// vchart example: Text: whiteSpace and wordBreak for wrapped lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: whiteSpace and wordBreak for wrapped lines",
  summary:
    "With whiteSpace normal and a maxLineWidth, text wraps. wordBreak decides where: break-word keeps long words whole, break-all splits anywhere, keep-all keeps CJK runs together. Two sample strings show the difference.",
  section: "Option: Marks and Graphics",
  tags: ["whiteSpace","wordBreak","maxLineWidth","lineHeight","text"],
  docs: [
    'repo/docs/assets/option/en/graphic/text-font.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
