// Overlays for Scene examples: event chips that flash, and a small value panel
/** A row of chips over the map, one per event name; flash(name) lights one up and counts it. */
export function eventBoard(container: HTMLElement, names: readonly string[]): (name: string, detail?: string) => void {
  const board = document.createElement('div');
  board.style.cssText =
    'position:absolute;left:6px;top:6px;right:6px;z-index:4;display:flex;flex-wrap:wrap;gap:4px;pointer-events:none;font:11px/1.2 ui-monospace,monospace';
  const chips = new Map<string, { el: HTMLSpanElement; n: number }>();
  for (const name of names) {
    const el = document.createElement('span');
    el.style.cssText = 'padding:2px 6px;border-radius:9px;background:rgba(20,30,44,.85);color:#8aa0b8;border:1px solid #2c3e55';
    el.textContent = name;
    board.append(el);
    chips.set(name, { el, n: 0 });
  }
  container.append(board);
  return (name, detail) => {
    const chip = chips.get(name);
    if (!chip) return;
    chip.n += 1;
    chip.el.textContent = `${name} ×${chip.n}${detail ? ` ${detail}` : ''}`;
    chip.el.animate(
      [
        { background: '#ffd166', color: '#111' },
        { background: 'rgba(20,30,44,.85)', color: '#8aa0b8' },
      ],
      { duration: 700 },
    );
  };
}

/** A small key/value panel in a corner of the map; set(rows) replaces its contents. */
export function valuePanel(container: HTMLElement, corner: 'tl' | 'tr' | 'bl' | 'br' = 'bl'): (rows: Record<string, string>) => void {
  const panel = document.createElement('div');
  const v = corner[0] === 't' ? 'top:6px' : 'bottom:6px';
  const h = corner[1] === 'l' ? 'left:6px' : 'right:6px';
  panel.style.cssText = `position:absolute;${v};${h};z-index:4;padding:4px 8px;border-radius:4px;background:rgba(10,16,24,.85);color:#cfe3f7;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre`;
  container.append(panel);
  return (rows) => {
    panel.textContent = Object.entries(rows)
      .map(([k, val]) => `${k}: ${val}`)
      .join('\n');
  };
}
