// A line of live status: a bar readout or a card badge
import { readout } from './controls.ts';
import type { Pane, Stage } from './stage.ts';

/** Returns a setter for one line of text (multi-line strings keep their line breaks). */
export function status(stage: Stage, initial = '', pane: Pane = stage): (text: string) => void {
  if (stage.bar) {
    const line = readout(stage.bar, initial);
    return (text) => {
      if (line.textContent !== text) line.textContent = text;
    };
  }
  const badge = document.createElement('div');
  badge.style.cssText =
    'position:absolute;left:6px;bottom:5px;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.85);color:#333;font:11px/1.3 ui-monospace,monospace;pointer-events:none;white-space:pre;z-index:4';
  badge.textContent = initial;
  pane.frame.append(badge);
  return (text) => {
    if (badge.textContent !== text) badge.textContent = text;
  };
}
