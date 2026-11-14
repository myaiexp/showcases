// vchart example: Events: component queries by type, id and node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: component queries by type, id and node",
  summary:
    "Axis clicks reported through three queries: level model with type axis, the id set in the axis spec, and nodeName axis-label. Clicks are fired at the axes from code, and the log shows which model and node each query caught.",
  section: "Events",
  tags: ['on','level: model','type: axis','id','nodeName'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
    "repo/docs/assets/guide/en/tutorial_docs/Event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
