// fabric example: Text: Selection API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Selection API",
  summary:
    "An IText's selection is selectionStart and selectionEnd; selectAll, selectWord, selectLine and getSelectedText drive and read it once the text is being edited.",
  section: 'Text',
  tags: ["IText","selectionStart","selectionEnd","selectAll","selectWord","selectLine","getSelectedText","enterEditing","findWordBoundaryRight"],
  docs: ["repo/src/content/docs/api/classes/IText.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
