// AntV Infographic example: Infographic API: on() and off()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: on() and off()",
  summary:
    "on() adds a listener and off() removes the very same function. The card keeps one infographic and a counter listener on rendered; every other step it calls off() and the count stops growing, then on() again and it resumes, while the drawing keeps changing the whole time.",
  section: "Infographic API",
  tags: ["on", "off", "listener", "rendered"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
