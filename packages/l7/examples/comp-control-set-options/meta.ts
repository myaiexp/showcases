// l7 example: Control setOptions and getOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Control setOptions and getOptions",
  summary:
    "setOptions takes only the options you change, like the docs' position swap from leftbottom to topright; getOptions returns the merged result.",
  section: "Component",
  tags: ["setOptions","getOptions","position","Zoom"],
  docs: ["repo/site/docs/api/component/control.en.md","repo/site/docs/api/common/control/method.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
