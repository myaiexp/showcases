// A puck sweeps along a number line; three markers show where it would snap: closest, next up, next down
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { check, h, slider } from '../../shared/ui.ts';
import { getDirectionalSnapFunc } from './getDirectionalSnapFunc.ts';
import './style.css';

const POINTS = [0, 12, 30, 55, 72, 100];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const line = h('div', 'line', '', root);
  const state = { useArray: preview, auto: true, value: 0 };
  const ticks = h('div', 'ticks', '', line);
  const puck = h('div', 'mark puck', '', line);
  const closest = h('div', 'mark closest', '', line);
  const up = h('div', 'mark up', '', line);
  const down = h('div', 'mark down', '', line);
  const legend = h('div', 'legend', '', root);
  const readout = h('p', 'readout', '', root);

  let snap = getDirectionalSnapFunc(10);
  const drawTicks = (): void => {
    ticks.replaceChildren();
    const at = state.useArray ? POINTS : Array.from({ length: 11 }, (_, i) => i * 10);
    for (const v of at) {
      const t = h('i', '', '', ticks);
      t.style.left = `${v}%`;
    }
    snap = getDirectionalSnapFunc(state.useArray ? POINTS : 10);
  };
  drawTicks();
  if (preview) readout.remove();
  const mk = (cls: string, text: string): void => { h('span', cls, text, legend); };
  mk('c-closest', 'snap(v)');
  mk('c-up', 'snap(v, 1)');
  mk('c-down', 'snap(v, -1)');

  const ctx = gsap.context(() => {
    const setters = [puck, closest, up, down].map((m) => gsap.quickSetter(m, 'left', '%') as (v: number) => void);
    let prev = 0;
    const show = (): void => {
      const v = state.value;
      const dir = Math.sign(v - prev) || 1;
      prev = v;
      const [sp, sc, su, sd] = setters as [(v: number) => void, (v: number) => void, (v: number) => void, (v: number) => void];
      sp(v);
      sc(snap(v));
      su(snap(v, 1));
      sd(snap(v, -1));
      readout.textContent = `value ${v.toFixed(1)}  closest ${snap(v)}  up ${snap(v, 1)}  down ${snap(v, -1)}  travelling ${dir > 0 ? 'right' : 'left'} -> snap(v, ${dir}) = ${snap(v, dir)}`;
    };
    const sweep = gsap.to(state, { value: 100, duration: preview ? 5 : 7, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: show });
    show();
    if (preview) return;
    const bar = h('div', 'controls', '', root);
    const input = slider('drag the value ', 0, 100, 0.5, 0, (v) => {
      sweep.pause();
      auto.checked = false;
      state.value = v;
      show();
    }, bar);
    const auto = check('auto sweep', (on) => { on ? sweep.play() : sweep.pause(); }, bar);
    auto.checked = true;
    check('snap to an array of points instead of every 10', (on) => { state.useArray = on; drawTicks(); show(); }, bar);
    sweep.eventCallback('onUpdate', () => { show(); input.value = String(state.value); });
  }, el);

  return () => ctx.revert();
};

export default mount;
