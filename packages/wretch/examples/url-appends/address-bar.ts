// A browser-style address bar that highlights the newest piece
export interface AddressBar {
  show(pieces: readonly string[]): void;
}

export function addressBar(parent: HTMLElement, base: string): AddressBar {
  const bar = document.createElement('div');
  bar.className = 'address';
  parent.append(bar);
  return {
    show(pieces) {
      bar.replaceChildren(base);
      pieces.forEach((p, i) => {
        const span = document.createElement('span');
        span.className = 'piece';
        span.textContent = p;
        bar.append(span);
        if (i === pieces.length - 1) {
          span.animate([{ background: 'var(--accent-bg)' }, { background: 'transparent' }], { duration: 1200 });
        }
      });
    },
  };
}
