// Control-bar inputs shared by the examples: buttons, selects, a log, a timer
/** A row for an example's controls, placed above the viewer. Not used in previews. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
    width: '100%',
    padding: '8px 0',
    fontSize: '13px',
  });
  el.append(bar);
  return bar;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

export function select(bar: HTMLElement, label: string, values: readonly string[], onChange: (v: string) => void): HTMLSelectElement {
  const wrap = document.createElement('label');
  Object.assign(wrap.style, { display: 'flex', gap: '6px', alignItems: 'center' });
  const sel = document.createElement('select');
  for (const v of values) sel.add(new Option(v, v));
  sel.addEventListener('change', () => onChange(sel.value));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}

/** A monospace box for printing results, events or JSON below the viewer. */
export function output(el: HTMLElement, height = 140): { box: HTMLPreElement; log(line: string): void; set(text: string): void } {
  const box = document.createElement('pre');
  Object.assign(box.style, {
    width: '100%',
    height: `${height}px`,
    overflow: 'auto',
    margin: '8px 0 0',
    padding: '8px',
    fontSize: '12px',
    background: 'var(--bg-surface)',
    color: 'var(--fg-2)',
    borderRadius: '6px',
    whiteSpace: 'pre-wrap',
  });
  el.append(box);
  return {
    box,
    log(line: string) {
      box.textContent = `${line}\n${box.textContent ?? ''}`.slice(0, 6000);
    },
    set(text: string) {
      box.textContent = text;
    },
  };
}

/** Runs `tick` every `ms` until the returned stop function is called. */
export function every(ms: number, tick: () => void): () => void {
  const id = window.setInterval(tick, ms);
  return () => window.clearInterval(id);
}
