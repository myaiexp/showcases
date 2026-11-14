// PlayCanvas: Scale mode and scale blend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale mode and scale blend",
  summary:
    "Blend scales a screen-space interface against a reference resolution; scale blend weights the width against the height. The canvas narrows and widens while a frame anchored to the edges follows it and a 160 unit square scales; the full view switches scale mode None and changes the blend.",
  section: "User Interface",
  tags: ["scaleMode","SCALEMODE_BLEND","SCALEMODE_NONE","scaleBlend","referenceResolution","scale"],
  docs: ["repo/docs/user-manual/user-interface/screens.md","repo/docs/user-manual/editor/scenes/components/screen.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
