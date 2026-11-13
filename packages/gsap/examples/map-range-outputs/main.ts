// One value fanned out through clamp, pipe(clamp, mapRange, snap), normalize and mapRange into four visual outputs
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const W = 260; // track width in px
const LO = -20;
const HI = 120;

const mount: Mount = (el, { preview }) => {
  const make = <K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent?: HTMLElement) => {
    const n = document.createElement(tag);
    n.className = cls;
    parent?.append(n);
    return n;
  };
  const row = (call: string) => {
    const r = make('div', preview ? 'row compact' : 'row', el);
    const label = make('div', 'label', r);
    label.textContent = call;
    const track = make('div', 'track', r);
    const value = make('span', 'value', label);
    return { track, value };
  };

  const clampRow = row('clamp(0, 100, v)');
  const clampDot = make('div', 'dot', clampRow.track);
  const pipeRow = row('pipe(clamp, mapRange(0,100,0,244), snap(20))');
  const pipeDot = make('div', 'dot alt', pipeRow.track);
  const normRow = row(`normalize(${LO}, ${HI}, v)`);
  const fill = make('div', 'fill', normRow.track);
  const rotRow = row(`mapRange(${LO}, ${HI}, -90, 90, v)`);
  rotRow.track.classList.add('dial');
  const needle = make('div', 'needle', rotRow.track);

  // Reusable functions: each remembers its ranges, pipe() chains three of them.
  const clamper = gsap.utils.clamp(0, 100);
  const toPixels = gsap.utils.pipe(clamper, gsap.utils.mapRange(0, 100, 0, W - 16), gsap.utils.snap(20));
  const norm = gsap.utils.normalize(LO, HI);
  const toAngle = gsap.utils.mapRange(LO, HI, -90, 90);

  // quickSetter functions are created once (inside the context, so revert() clears them) and
  // record no animation per call, unlike gsap.set.
  let setClampX: (n: number) => void = () => {};
  let setPipeX: (n: number) => void = () => {};
  let setFill: (n: number) => void = () => {};
  let setNeedle: (n: number) => void = () => {};
  const toClampPx = gsap.utils.mapRange(0, 100, 0, W - 16);

  const render = (v: number): void => {
    const c = clamper(v);
    const px = toPixels(v);
    const n = norm(v);
    const a = toAngle(v);
    setClampX(toClampPx(c));
    setPipeX(px);
    setFill(n);
    setNeedle(a);
    clampRow.value.textContent = ` input ${v.toFixed(0)} gives ${c.toFixed(0)}`;
    pipeRow.value.textContent = ` ${px}px`;
    normRow.value.textContent = ` ${n.toFixed(2)}`;
    rotRow.value.textContent = ` ${a.toFixed(0)} deg`;
  };

  const ctx = gsap.context(() => {
    gsap.set(fill, { transformOrigin: '0 50%' });
    setClampX = gsap.quickSetter(clampDot, 'x', 'px') as (n: number) => void;
    setPipeX = gsap.quickSetter(pipeDot, 'x', 'px') as (n: number) => void;
    setFill = gsap.quickSetter(fill, 'scaleX') as (n: number) => void;
    setNeedle = gsap.quickSetter(needle, 'rotation', 'deg') as (n: number) => void;
    const proxy = { v: 50 };
    render(proxy.v);
    if (preview) {
      gsap.fromTo(
        proxy,
        { v: LO },
        { v: HI, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => render(proxy.v) },
      );
    }
  }, el);

  if (!preview) {
    const slider = make('input', 'slider');
    slider.type = 'range';
    slider.min = String(LO);
    slider.max = String(HI);
    slider.value = '50';
    slider.addEventListener('input', () => render(Number(slider.value)));
    el.append(slider);
  }

  return () => ctx.revert();
};

export default mount;
