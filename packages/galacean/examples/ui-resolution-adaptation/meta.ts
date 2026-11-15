// galacean example: UI resolution adaptation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI resolution adaptation",
  summary:
    "A 600 x 300 reference resolution drawn as a frame while resolutionAdaptationMode cycles through Width, Height, Both, Expand and Shrink. A select picks the mode in the full view; resize the window to see the difference.",
  section: "UI",
  tags: ['ResolutionAdaptationMode', 'referenceResolution', 'resolutionAdaptationMode'],
  docs: [
    'repo/docs/en/UI/quickStart/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
