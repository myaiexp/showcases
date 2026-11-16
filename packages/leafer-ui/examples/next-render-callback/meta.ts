// leafer-ui example: nextRender: run code before the next frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "nextRender: run code before the next frame",
  summary: "rect.nextRender(fn, bind) schedules fn for the coming render frame and removeNextRender(fn) cancels it. The log shows a callback queued three times, then removed once before it runs.",
  section: "Element advanced",
  tags: ["nextRender", "removeNextRender", "RenderEvent"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/nextRender.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
