// galacean example: UI settings panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI settings panel",
  summary:
    "A small settings panel that uses the whole system: a root UICanvas, UITransform alignment for a bar that fills from the left, Images, Texts, Buttons with transitions and a UIGroup that dims when sound is off. A scripted pointer drives the card.",
  section: "UI",
  tags: ['UICanvas', 'Image', 'Text', 'Button', 'UIGroup', 'UITransform'],
  docs: [
    'repo/docs/en/UI/overall.mdx',
    'repo/docs/en/UI/system.mdx',
    'repo/docs/en/UI/quickStart/canvas.mdx',
    'repo/docs/en/UI/quickStart/button.mdx',
    'repo/docs/en/UI/quickStart/group.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
