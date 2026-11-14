// A short message over the stage, for features this browser or device lacks
export function showNotice(el: HTMLElement, text: string): HTMLElement {
  const note = document.createElement('p');
  note.textContent = text;
  Object.assign(note.style, {
    margin: '0',
    padding: 'var(--space-2) var(--space-3)',
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--bg-surface)',
    color: 'var(--fg-2)',
    fontSize: '0.85rem',
    textAlign: 'center',
  });
  el.append(note);
  return note;
}
