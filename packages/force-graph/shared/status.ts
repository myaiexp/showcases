// A line of live status: the control bar's readout in a full view, a small badge over the pane in a card
import { readout } from './controls.ts';
import type { Stage } from './stage.ts';

/**
 * Returns a setter for one line of text. Call it after `new ForceGraph(stage.container)`, which
 * empties the pane: a badge added earlier would be wiped.
 */
export function status(stage: Stage, initial = ''): (text: string) => void {
  if (stage.bar) {
    const line = readout(stage.bar, initial);
    return (text) => {
      line.textContent = text;
    };
  }
  const badge = document.createElement('div');
  badge.style.cssText =
    'position:absolute;left:6px;bottom:5px;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.8);color:#333;font:11px/1.3 ui-monospace,monospace;pointer-events:none;white-space:pre';
  badge.textContent = initial;
  stage.container.append(badge);
  return (text) => {
    if (badge.textContent !== text) badge.textContent = text;
  };
}
