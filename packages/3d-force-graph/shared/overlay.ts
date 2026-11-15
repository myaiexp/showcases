// A line of text over a graph pane: a caption for what a card is doing right now
import type { Pane, Stage } from './stage.ts';

/** Call after `new ForceGraph3D(stage.container)`: the constructor empties the pane. */
export function overlay(stage: Stage, text = '', pane: Pane = stage): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText =
    'position:absolute;left:8px;top:6px;right:8px;pointer-events:none;font:11px/1.35 ui-monospace,monospace;' +
    'color:#c0caf5;text-shadow:0 0 4px #000,0 0 2px #000;white-space:pre-wrap';
  div.textContent = text;
  pane.container.append(div);
  return div;
}
