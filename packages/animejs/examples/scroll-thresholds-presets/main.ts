// Scroll thresholds: the same linked animation re-declared with each documented enter/leave syntax
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from './stage.ts';
import './style.css';

type Threshold = string | { target: string; container: string };
const PRESETS: { label: string; enter: Threshold; leave: Threshold }[] = [
  { label: "object {target, container}", enter: { target: 'top', container: 'bottom' }, leave: { target: 'bottom', container: 'top' } },
  { label: "container value 'bottom' / 'top'", enter: 'bottom', leave: 'top' },
  { label: "shorthand 'bottom top' / 'top bottom'", enter: 'bottom top', leave: 'top bottom' },
  { label: "positions 'center top' / 'center bottom'", enter: 'center top', leave: 'center bottom' },
  { label: "numeric '80% 20%' / '50 -25'", enter: '80% 20%', leave: '50 -25' },
  { label: "relative 'center+=1em top-=100%'", enter: 'center+=1em top-=100%', leave: 'center-=1em bottom+=100%' },
  { label: "min / max 'max bottom' / 'min top'", enter: 'max bottom', leave: 'min top' },
];

const mount: Mount = (el, { preview }) => {
  const { scroller, square } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);
  const buttons: HTMLButtonElement[] = [];

  let animation: ReturnType<typeof animate> | undefined;
  let observer: ReturnType<typeof onScroll> | undefined;
  const setPreset = (index: number): void => {
    observer?.revert();
    animation?.revert();
    const { label, enter, leave } = PRESETS[index] ?? PRESETS[0]!;
    observer = onScroll({ container: scroller, enter, leave, sync: true, debug: !preview });
    animation = animate(square, {
      x: preview ? '7rem' : '15rem',
      rotate: '1turn',
      ease: 'linear',
      autoplay: observer,
    });
    readout.textContent = label;
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
  };

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'modes';
    PRESETS.forEach(({ label }, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label.split(' ')[0] ?? label;
      b.title = label;
      b.addEventListener('click', () => setPreset(i));
      buttons.push(b);
      bar.append(b);
    });
    el.prepend(bar);
  }

  setPreset(0);
  let cycle = 0;
  let stopScroll = (): void => {};
  if (preview) {
    stopScroll = autoScroll(scroller);
    let i = 0;
    cycle = window.setInterval(() => setPreset(++i % PRESETS.length), 7000);
  }

  return () => {
    window.clearInterval(cycle);
    stopScroll();
    observer?.revert();
    animation?.revert();
  };
};

export default mount;
