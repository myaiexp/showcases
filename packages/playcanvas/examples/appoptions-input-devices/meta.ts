// playcanvas example: AppOptions input devices and features
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AppOptions input devices and features",
  summary: "Mouse, keyboard, touch, gamepads, the sound manager and the batch manager exist on the app only when set in AppOptions. Tick which to set, rebuild the app, and read app.mouse, app.keyboard and the rest as set or null; hold the mouse or Space to see a live device act.",
  section: "Engine",
  tags: ["AppOptions","Mouse","Keyboard","TouchDevice","GamePads","SoundManager","BatchManager"],
  docs: ["repo/docs/user-manual/engine/bundle-size.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
