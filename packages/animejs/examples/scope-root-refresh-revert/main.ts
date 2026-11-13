// Scope root, refresh, revert: each row has its own scope; buttons call refresh(), revert() and a registered method
import { animate, createScope, stagger, utils } from 'animejs';
import type { Scope } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 9;

interface Row {
  scope: Scope;
  row: HTMLElement;
  reverted: boolean;
}

const mount: Mount = (el, { preview }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'rows is-preview' : 'rows';
  el.append(wrap);

  const makeRow = (title: string): Row => {
    const box = document.createElement('div');
    box.className = 'row-wrap';
    const row = document.createElement('div');
    row.className = 'row';
    for (let i = 0; i < COUNT; i++) {
      const c = document.createElement('div');
      c.className = 'circle';
      row.append(c);
    }
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = title;
    box.append(label, row);
    wrap.append(box);

    // `root` limits every query inside this scope to this row
    let focus = 0;
    const state: Row = { row, reverted: false, scope: createScope({ root: row }) };
    state.scope.add(self => {
      const circles = utils.$('.circle');
      const from = focus++ % circles.length;
      utils.set(circles, { opacity: stagger([1, 0.25], { from, ease: 'out(3)' }) });
      animate(circles, {
        scale: [{ to: [0.5, 1], duration: 250 }, { to: 0.5, duration: 750 }],
        duration: 750,
        loop: true,
        delay: stagger(50, { from }),
      });
      // A method registered with add(name, fn) is callable from outside through scope.methods
      self?.add('wave', () => {
        animate('.circle', { y: [{ to: -14, duration: 150 }, { to: 0, duration: 350 }], delay: stagger(40) });
      });
    });
    return state;
  };

  const rows: Row[] = [makeRow('scope 1: root = this row'), makeRow('scope 2: root = this row')];
  const [first, second] = rows as [Row, Row];

  const refresh = (r: Row): void => {
    r.scope.refresh();
    r.reverted = false;
  };
  const revert = (r: Row): void => {
    r.scope.revert();
    r.reverted = true;
  };

  let timer = 0;
  if (preview) {
    // Scripted: refresh each row in turn, and every fourth step revert row 2 before the next refresh.
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      const r = step % 2 ? second : first;
      if (r === second && step % 8 === 1) revert(r);
      else refresh(r);
    }, 1400);
  } else {
    rows.forEach((r, i) => {
      const controls = document.createElement('div');
      controls.className = 'controls';
      const make = (text: string, fn: () => void): HTMLButtonElement => {
        const b = document.createElement('button');
        b.className = 'btn';
        b.textContent = text;
        b.addEventListener('click', fn);
        controls.append(b);
        return b;
      };
      make(`Refresh scope ${i + 1}`, () => refresh(r));
      make(`Revert scope ${i + 1}`, () => revert(r));
      make(`methods.wave() ${i + 1}`, () => {
        if (!r.reverted) r.scope.methods.wave?.();
      });
      r.row.parentElement?.append(controls);
    });
  }

  return () => {
    window.clearInterval(timer);
    for (const r of rows) r.scope.revert();
  };
};

export default mount;
