// galacean example: Script: engine events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: engine events",
  summary:
    "Scripts talking through the engine as an EventDispatcher: engine.on listens, engine.once listens a single time, engine.dispatch sends data, engine.off removes a listener. Buttons in the full view dispatch; the card dispatches on a timer.",
  section: "Script",
  tags: ['Script', 'EventDispatcher', 'on', 'once', 'dispatch', 'off'],
  docs: [
    'repo/docs/en/script/communication.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
