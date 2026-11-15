// A small text badge pinned to a corner of a globe pane, for live values
export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/** Appends a monospace badge to `layer` (a pane's layer); set `.textContent` to update it. */
export function badge(layer: HTMLElement, text = '', corner: Corner = 'top-left'): HTMLDivElement {
  const div = document.createElement('div');
  const [v, h] = corner.split('-') as ['top' | 'bottom', 'left' | 'right'];
  div.style.cssText = `position:absolute;${v}:4px;${h}:4px;z-index:1;padding:2px 6px;border-radius:4px;
    font:11px/1.4 ui-monospace,monospace;color:var(--fg-1);background:rgb(0 0 0 / 0.55);
    white-space:pre;pointer-events:none`;
  div.textContent = text;
  layer.append(div);
  return div;
}
