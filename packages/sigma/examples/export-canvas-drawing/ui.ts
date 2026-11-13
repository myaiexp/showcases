// Tiny DOM helpers for the controls row (no innerHTML)
export function controlsRow(el: HTMLElement): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'controls';
  el.append(row);
  return row;
}

export function button(row: HTMLElement, text: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = text;
  b.addEventListener('click', onClick);
  row.append(b);
  return b;
}

export function readout(row: HTMLElement, text = ''): HTMLOutputElement {
  const o = document.createElement('output');
  o.textContent = text;
  row.append(o);
  return o;
}
