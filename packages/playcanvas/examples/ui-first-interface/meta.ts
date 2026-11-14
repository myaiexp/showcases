// PlayCanvas: First interface: panel, label, button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "First interface: panel, label, button",
  summary:
    "The smallest complete interface: a screen-space screen scaled with Blend, a panel with a label and a button, a button component with hover and pressed tints and a click handler that counts. Text uses a CanvasFont, since a font asset needs a file; the card replays hover, press and click on a timer.",
  section: "User Interface",
  tags: ["ScreenComponent","ElementComponent","ButtonComponent","CanvasFont","ELEMENTTYPE_IMAGE","ELEMENTTYPE_TEXT","click"],
  docs: ["repo/docs/user-manual/user-interface/user-interface-basics.md","repo/docs/user-manual/user-interface/index.md","repo/docs/user-manual/user-interface/fonts.md","repo/docs/user-manual/editor/scenes/components/screen.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/editor/scenes/components/button.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
