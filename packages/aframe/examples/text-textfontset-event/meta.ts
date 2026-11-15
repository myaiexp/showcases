// aframe example: text: font and the textfontset event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "text: font and the textfontset event",
  summary: "Choosing another stock font on the text component loads its font file and emits textfontset when it is set. A select cycles through all nine stock fonts, the read-out names the last font reported by the event, and the card steps through them on a timer.",
  section: 'Components',
  tags: ["text", "font", "textfontset", "stock fonts", "event"],
  docs: ["repo/docs/components/text.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
