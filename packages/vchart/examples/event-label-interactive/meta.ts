// vchart example: Events: interactive labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: interactive labels",
  summary:
    "Labels do not emit events until label.interactive is true. The selector toggles it; click the bars and the labels in the full view and the log shows which query, the type label model or the bar mark, hears each click.",
  section: "Events",
  tags: ['label.interactive','type: label','level: model','on'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
    "repo/docs/assets/option/en/component/label.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
