// A fixed-height row for a card's keys or strip, so flex layouts do not squash it
export function box(parent: HTMLElement, height: number): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `width:100%;height:${height}px;flex:0 0 auto;display:flex`;
  parent.append(div);
  return div;
}
