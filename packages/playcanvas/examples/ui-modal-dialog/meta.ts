// PlayCanvas: Modal dialog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Modal dialog",
  summary:
    "A dialog is the last child of the screen with a full-screen backdrop that has input enabled, so it catches every click that misses the panel and the HUD below receives none. OK, Cancel and a click on the backdrop close it by disabling its entity.",
  section: "User Interface",
  tags: ["useInput","enabled","ButtonComponent","opacity"],
  docs: ["repo/docs/user-manual/user-interface/common-widgets.md","repo/docs/user-manual/user-interface/input.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
