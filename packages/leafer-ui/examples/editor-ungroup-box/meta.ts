// leafer-ui example: Editor: ungroup() leaves Box and Frame alone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: ungroup() leaves Box and Frame alone",
  summary: "The docs warn that Box and Frame do not ungroup, to prevent problems: ungroup() on a selected Group frees its children, on a Box it does nothing.",
  section: 'Graphic editor',
  tags: ["Editor", "ungroup", "Box", "Group"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/group.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
