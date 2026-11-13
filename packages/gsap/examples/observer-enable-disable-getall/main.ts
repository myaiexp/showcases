// Observer lifecycle: three observers with ids, enable(), disable(), kill(), getAll(), getById(), onEnable and onDisable
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(Observer);

const NAMES = ['red', 'green', 'blue'] as const;
let mounts = 0;

const mount: Mount = (el, { preview }) => {
  // getAll() returns every Observer on the page, so ids carry a per-mount prefix to pick ours out.
  const prefix = `lifecycle-${++mounts}-`;
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const pads = h('div', 'pads', '', wrap);
  const cards = NAMES.map((name) => {
    const pad = h('div', `pad ${name}`, '', pads);
    h('b', '', name, pad);
    const count = h('span', 'count', '0', pad);
    const state = h('span', 'state', '', pad);
    return { pad, count, state, n: 0 };
  });
  const list = h('pre', 'readout', '', wrap);
  const timers: number[] = [];

  const ids = (): string[] => Observer.getAll().filter((o) => String(o.vars.id).startsWith(prefix)).map((o) => String(o.vars.id).slice(prefix.length));
  const draw = (): void => {
    NAMES.forEach((name, i) => {
      const card = cards[i];
      const o = Observer.getById(prefix + name);
      if (!card) return;
      card.count.textContent = String(card.n);
      card.state.textContent = o ? (o.isEnabled ? 'enabled' : 'disabled') : 'killed';
      card.pad.classList.toggle('off', !o?.isEnabled);
    });
    list.textContent = `getAll() -> [${ids().join(', ')}]   Observer.getById("${prefix}green") -> ${Observer.getById(`${prefix}green`) ? 'found' : 'undefined'}`;
  };

  const ctx = gsap.context(() => {
    const build = (name: (typeof NAMES)[number]): void => {
      const i = NAMES.indexOf(name);
      const card = cards[i];
      if (!card || Observer.getById(prefix + name)) return;
      Observer.create({
        id: prefix + name,
        target: card.pad,
        type: 'wheel,touch,pointer',
        onChange: () => { card.n++; draw(); },
        onEnable: draw,
        onDisable: draw,
      });
      draw();
    };
    NAMES.forEach(build);

    if (preview) {
      // Wheel events at a rotating pad, while the middle observer is switched off and on.
      let t = 0;
      timers.push(window.setInterval(() => {
        const pad = cards[t++ % NAMES.length]?.pad;
        pad?.dispatchEvent(new WheelEvent('wheel', { deltaY: 40, bubbles: true }));
        if (t % 6 === 0) Observer.getById(`${prefix}green`)?.disable();
        if (t % 6 === 3) Observer.getById(`${prefix}green`)?.enable();
        draw();
      }, 420));
    } else {
      NAMES.forEach((name, i) => {
        const bar = h('div', 'bar', `${name} `, wrap);
        btn('disable()', () => { Observer.getById(prefix + name)?.disable(); draw(); }, bar);
        btn('enable()', () => { Observer.getById(prefix + name)?.enable(); draw(); }, bar);
        btn('kill()', () => { Observer.getById(prefix + name)?.kill(); draw(); }, bar);
        btn('create again', () => ctx.add(() => build(NAMES[i] ?? name)), bar);
      });
      h('p', 'note', 'Wheel, swipe or drag over a pad to count events. A disabled observer has removed its listeners; a killed one is gone from getAll() and getById() for good.', wrap);
    }
  }, el);

  return () => {
    for (const t of timers) clearInterval(t);
    for (const o of Observer.getAll()) if (String(o.vars.id).startsWith(prefix)) o.kill();
    ctx.revert();
  };
};

export default mount;
