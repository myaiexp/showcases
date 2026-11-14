// Lets an overlay label wrap inside a narrow card instead of overflowing
export function wrapInCard(label: HTMLElement, preview: boolean): void {
  if (!preview) return;
  Object.assign(label.style, { whiteSpace: 'pre-wrap', right: '8px', fontSize: '11px' });
}
