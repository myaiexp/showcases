// galacean example: UI button click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI button click",
  summary:
    "A UI Button with an Image and a Text, a ColorTransition for hover and press, and a listener added with addClicked that counts clicks. Click it in the full view; the card moves a scripted pointer over it.",
  section: "UI",
  tags: ['Button', 'addClicked', 'ColorTransition', 'UICanvas'],
  docs: [
    'repo/docs/en/UI/quickStart/button.mdx',
    'repo/docs/en/UI/quickStart/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
