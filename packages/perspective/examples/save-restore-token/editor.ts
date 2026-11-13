// A JSON textarea for viewing and editing a save() token
export function tokenEditor(el: HTMLElement): { set(token: unknown): void; get(): Record<string, unknown> } {
  const area = document.createElement('textarea');
  area.spellcheck = false;
  Object.assign(area.style, {
    width: '100%',
    height: '220px',
    marginTop: '8px',
    fontFamily: 'var(--font-mono, monospace)',
    fontSize: '12px',
  });
  el.append(area);
  return {
    set(token) {
      area.value = JSON.stringify(token, null, 2);
    },
    get() {
      return JSON.parse(area.value) as Record<string, unknown>;
    },
  };
}
