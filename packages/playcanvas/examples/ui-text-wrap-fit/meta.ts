// PlayCanvas: Text wrapping, justify and auto fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text wrapping, justify and auto fit",
  summary:
    "A paragraph wraps at the width of its element when Wrap Lines is on and Auto Width off; justify stretches wrapped lines to both edges and maxLines limits them. A badge uses Auto Fit Width and Height to shrink long names between maxFontSize and minFontSize.",
  section: "User Interface",
  tags: ["wrapLines","justify","maxLines","autoFitWidth","autoFitHeight","maxFontSize","minFontSize"],
  docs: ["repo/docs/user-manual/user-interface/text-elements.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
