// PlayCanvas: Button tint transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Button tint transitions",
  summary:
    "A button component tints its image for hover, pressed and inactive states, and fadeDuration blends between them. Three identical buttons use 0, 300 and 900 ms; a fourth has active set to false. The card fires the element events the button listens to; the full view takes the real pointer.",
  section: "User Interface",
  tags: ["ButtonComponent","hoverTint","pressedTint","inactiveTint","fadeDuration","active","BUTTON_TRANSITION_MODE_TINT"],
  docs: ["repo/docs/user-manual/user-interface/buttons.md","repo/docs/user-manual/editor/scenes/components/button.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
