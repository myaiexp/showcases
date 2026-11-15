// aframe example: cursor: downEvents and upEvents from other events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cursor: downEvents and upEvents from other events",
  summary: "downEvents and upEvents list extra events on the cursor entity that count as mousedown and mouseup, which is how controllers are wired. Here a gaze cursor on the camera presses on a custom pressbutton event and releases on releasebutton; buttons emit them, and the box under the gaze reacts to mousedown, mouseup and click.",
  section: 'Components',
  tags: ["cursor", "downEvents", "upEvents", "mousedown", "mouseup", "click", "emit"],
  docs: ["repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
