// Sample DOM subjects for effects: a big headline, a text panel, a button

/** A big headline, the kind of element VFX-JS captures as text. */
export function headline(text = 'VFX-JS', color?: string): HTMLHeadingElement {
  const h = document.createElement('h2');
  h.className = 'vx-title';
  h.textContent = text;
  if (color) h.style.color = color;
  return h;
}

/** A small card of HTML: a heading and a paragraph. */
export function panel(title: string, body: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'vx-panel';
  const h = document.createElement('h3');
  h.textContent = title;
  const p = document.createElement('p');
  p.style.margin = '0';
  p.textContent = body;
  div.append(h, p);
  return div;
}

/** A real <button> (base.css .btn). */
export function realButton(label: string): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn';
  b.textContent = label;
  return b;
}
