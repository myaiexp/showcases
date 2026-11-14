// Full-view control panel (buttons, sliders, selects, readouts) and the trap list
//
// Traps for Motion examples (add to this list when you hit a new one):
// - Clean up with scopeMotion(el, setup): selectors resolve inside `el`, and scope.cancel()
//   stops every animate/scroll/inView/hover/press/drag/delay/animateLayout it collected.
//   It does NOT stop styleEffect/attrEffect/svgEffect/propEffect, nor setTimeout/setInterval,
//   nor work started after an `await`. Cancel effects yourself; use delay() or scope.bind().
// - delay() inside a scope is collected, so a card loop `const tick = () => { ...; delay(tick, 2) }`
//   started in setup stops with the scope.
// - Gestures have no pointer in a card: script them with shared/pointer.ts (`loopGesture`), which
//   queues every scripted gesture on the page, because drag/press/pinch listen on window and
//   would steer each other.
// - animateView() uses document.startViewTransition, which snapshots the whole page and runs one
//   transition at a time. Run it inside shared/frame.ts (an iframe with its own Motion) only.
// - scopeMotion matchMedia and window-level resize()/scroll() read the window: use the iframe too.
// - CSS is global; no @keyframes (the build fails). Animate with Motion.
// - A card is 260x200 and must not fetch or play sound.
// - The full view's mount element is display:block (`.sc-stage-full > .sc-mount`, specificity 0,2,0).
//   To centre content there, write `&&& { display: flex; flex-direction: column; align-items: center; }`
//   as the first rule inside the example's scoped block.
// - animate(obj, { v: target }) is skipped as already finished when target equals the current value.
//   That includes type: 'inertia', which ignores the target: pass any value that differs (current + 1).
// - Not verified that `motion/mini` animations join a scope: keep their controls and stop() them yourself.

export interface Panel {
  el: HTMLElement;
  button(label: string, fn: () => void): HTMLButtonElement;
  slider(label: string, opts: { min: number; max: number; step: number; value: number }, fn: (v: number) => void): HTMLInputElement;
  select<T extends string>(label: string, options: readonly T[], value: T, fn: (v: T) => void): HTMLSelectElement;
  toggle(label: string, value: boolean, fn: (v: boolean) => void): HTMLInputElement;
  readout(label: string, initial?: string): (v: string | number) => void;
  /** Removes every listener the panel added. */
  dispose(): void;
}

/** Appends a panel to `parent`. Every listener is removed by `dispose()`. */
export function panel(parent: HTMLElement): Panel {
  const ac = new AbortController();
  const el = document.createElement('div');
  el.className = 'motion-panel';
  Object.assign(el.style, { display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center', alignItems: 'center', marginTop: 'var(--space-3)' });
  parent.append(el);

  const labelled = (text: string, input: HTMLElement): HTMLLabelElement => {
    const l = document.createElement('label');
    Object.assign(l.style, { display: 'inline-flex', gap: 'var(--space-1)', alignItems: 'center', fontSize: '0.8rem', color: 'var(--fg-2)' });
    l.append(text, input);
    el.append(l);
    return l;
  };

  return {
    el,
    button(label, fn) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn, { signal: ac.signal });
      el.append(b);
      return b;
    },
    slider(label, o, fn) {
      const i = document.createElement('input');
      Object.assign(i, { type: 'range', min: String(o.min), max: String(o.max), step: String(o.step), value: String(o.value) });
      const out = document.createElement('span');
      out.style.minWidth = '3ch';
      out.textContent = String(o.value);
      i.addEventListener('input', () => {
        out.textContent = i.value;
        fn(Number(i.value));
      }, { signal: ac.signal });
      labelled(label, i).append(out);
      return i;
    },
    select(label, options, value, fn) {
      const s = document.createElement('select');
      for (const o of options) s.append(new Option(o, o, o === value, o === value));
      s.addEventListener('change', () => fn(s.value as (typeof options)[number]), { signal: ac.signal });
      labelled(label, s);
      return s;
    },
    toggle(label, value, fn) {
      const i = document.createElement('input');
      i.type = 'checkbox';
      i.checked = value;
      i.addEventListener('change', () => fn(i.checked), { signal: ac.signal });
      labelled(label, i);
      return i;
    },
    readout(label, initial = '') {
      const v = document.createElement('code');
      v.textContent = initial;
      const wrap = document.createElement('span');
      Object.assign(wrap.style, { fontSize: '0.8rem', color: 'var(--fg-2)' });
      wrap.append(`${label} `, v);
      el.append(wrap);
      return (x) => {
        v.textContent = String(x);
      };
    },
    dispose: () => ac.abort(),
  };
}

/** A one-line explanation under the stage, shown in the full view only. */
export function hint(parent: HTMLElement, text: string): HTMLElement {
  const p = document.createElement('p');
  Object.assign(p.style, { margin: 'var(--space-2) 0 0', fontSize: '0.8rem', color: 'var(--fg-3)', textAlign: 'center', maxWidth: '36rem' });
  p.textContent = text;
  parent.append(p);
  return p;
}
