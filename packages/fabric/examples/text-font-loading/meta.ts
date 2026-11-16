// fabric example: Text: A font that loads late
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: A font that loads late",
  summary:
    "Text created before its font arrives is measured with a fallback and keeps a wrong box; cache.clearFontCache(family) followed by initDimensions() re-measures it.",
  section: 'Text',
  tags: ["FabricText","cache","clearFontCache","initDimensions","fontFamily","dirty"],
  docs: ["repo/src/content/docs/docs/Old docs/fabric-text.md", "repo/src/content/docs/api/variables/cache.md", "repo/src/content/docs/api/classes/FabricText.md", "repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
