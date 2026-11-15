// A small text label in a corner of the chart, for cards that have no side panel

/** A small text overlay in a corner of the chart, for cards that have no side panel. */
export function overlay(host: HTMLElement): (text: string) => void {
  const box = document.createElement('div');
  box.style.cssText =
    'position:absolute;top:4px;left:6px;max-width:34%;padding:2px 6px;border-radius:4px;background:#27272acc;color:#e4e4e7;font:10px/1.3 monospace;pointer-events:none;white-space:pre-wrap';
  host.append(box);
  return (text) => {
    box.textContent = text;
  };
}
