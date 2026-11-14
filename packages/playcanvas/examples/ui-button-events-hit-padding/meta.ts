// PlayCanvas: Button events and hit padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Button events and hit padding",
  summary:
    "A button fires mouseenter, hoverstart, mousedown, pressedstart, mouseup, pressedend, click, hoverend and mouseleave, in that order, which an in-canvas log shows. A small close button has its hit area grown by hitPadding, drawn as a translucent square that follows a slider.",
  section: "User Interface",
  tags: ["ButtonComponent","hitPadding","click","hoverstart","pressedstart","pressedend"],
  docs: ["repo/docs/user-manual/user-interface/buttons.md","repo/docs/user-manual/user-interface/input.md","repo/docs/user-manual/editor/scenes/components/button.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
