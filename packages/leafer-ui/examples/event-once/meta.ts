// leafer-ui example: Events: once() listens a single time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: once() listens a single time",
  summary: "once() removes the listener after its first call, so the second visit logs nothing. The button (or each card round) arms the two listeners again.",
  section: "Interaction",
  tags: ["once","on","PointerEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/on.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/emit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
