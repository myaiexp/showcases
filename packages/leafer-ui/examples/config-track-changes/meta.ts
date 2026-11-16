// leafer-ui example: Config: trackChanges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: trackChanges",
  summary:
    "trackChanges: false stops elements from creating and dispatching PropertyEvent and ChildEvent: less work for games and industrial views that never need a change history. The counter shows PropertyEvents received while the rect moves.",
  section: "App & engine config",
  tags: ['Leafer', 'trackChanges', 'PropertyEvent', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
