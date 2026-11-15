// galacean example: UI group ignore parent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI group ignore parent",
  summary:
    "Two nested groups under one fading parent group: the one with ignoreParentGroup keeps its full opacity. Controls for the parent alpha and the flag in the full view.",
  section: "UI",
  tags: ['UIGroup.ignoreParentGroup', 'UIGroup.alpha'],
  docs: [
    'repo/docs/en/UI/quickStart/group.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
