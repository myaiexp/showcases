// vchart example: FAQ: disable chart interaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: disable chart interaction",
  summary:
    "The disableTriggerEvent constructor option makes a chart a picture: no hover, tooltip or click events. A select rebuilds it either way and a counter shows the events that arrive.",
  section: 'FAQ',
  tags: ["disableTriggerEvent","IInitOption","on"],
  docs: [
    "repo/docs/assets/faq/en/35- How to disable chart interaction.md",
    "repo/docs/assets/api/en/API/vchart.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
