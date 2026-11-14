// A small text overlay inside the stage, and longitude wrapping, for the guide examples
/** A monospace label pinned to a corner of the stage; set `.textContent` to update it. */
export function overlay(box: HTMLElement, text = '', corner: 'top' | 'bottom' = 'top'): HTMLDivElement {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = '8px';
  div.style.right = '8px';
  div.style[corner] = '8px';
  div.style.padding = '4px 8px';
  div.style.borderRadius = '4px';
  div.style.background = 'rgba(8, 14, 22, 0.78)';
  div.style.color = '#d6e2f0';
  div.style.font = '12px/1.4 monospace';
  div.style.pointerEvents = 'none';
  div.style.whiteSpace = 'pre-wrap';
  div.textContent = text;
  box.append(div);
  return div;
}

/** Wraps a longitude into [-180, 180) so a drifting view state keeps drawing. */
export function wrapLng(lng: number): number {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}
