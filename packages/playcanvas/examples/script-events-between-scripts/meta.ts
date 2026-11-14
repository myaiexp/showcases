// playcanvas example: Events between scripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events between scripts',
  summary:
    "A Player script fires a move event on itself every frame, and a Display script on another entity registers with player.on('move') and mirrors the box. When the player script is destroyed, a once('destroy') handler calls off so no listener is left behind; hasEvent shows it.",
  section: 'Scripting',
  tags: ['EventHandler', 'on', 'once', 'off', 'fire', 'hasEvent', 'Script', 'destroy'],
  docs: ['repo/docs/user-manual/scripting/events.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
