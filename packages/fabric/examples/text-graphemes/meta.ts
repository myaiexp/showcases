// fabric example: Text: Graphemes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Graphemes",
  summary:
    "graphemeSplit (Intl.Segmenter in v7) keeps combining accents, ZWJ emoji and flags as one character each, which __charBounds and editing count by.",
  section: 'Text',
  tags: ["FabricText","graphemeSplit","__charBounds","text"],
  docs: ["repo/src/content/docs/docs/Old docs/fabric-text.md", "repo/src/content/docs/api/namespaces/util/namespaces/string/functions/graphemeSplit.md", "repo/CHANGELOG.md", "repo/src/content/docs/api/classes/FabricText.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
