// galacean example: UI group interactive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI group interactive",
  summary:
    "Three buttons under one UIGroup: setting interactive to false disables all of them at once, so scripted clicks stop counting. A checkbox in the full view.",
  section: "UI",
  tags: ['UIGroup.interactive', 'Button', 'addClicked'],
  docs: [
    'repo/docs/en/UI/quickStart/group.mdx',
    'repo/docs/en/UI/quickStart/button.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
