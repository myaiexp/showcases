// leafer-ui example: Lifecycle: element created, mounted, unmounted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lifecycle: element created, mounted, unmounted",
  summary:
    "An element's life: created (constructed), mounted (added to a tree, so it can render), unmounted (removed). The event option binds created, mounted and unmounted at creation; on() binds them later. The log shows each as the rect is added and removed.",
  section: "Advanced",
  tags: ['Rect', 'event', 'created', 'mounted', 'unmounted', 'on', 'ChildEvent'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/life/ui.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
