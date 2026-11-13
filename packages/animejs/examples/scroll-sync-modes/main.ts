// Scroll sync modes compared: the same animation linked to a scroll container with different `sync` values
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from './stage.ts';
import './style.css';

type SyncValue = boolean | number | string;
const MODES: { label: string; sync: SyncValue }[] = [
  { label: 'sync: true', sync: true },
  { label: 'sync: .1', sync: 0.1 },
  { label: "sync: 'inOutCirc'", sync: 'inOutCirc' },
  { label: "sync: 'play pause'", sync: 'play pause' },
  { label: "sync: 'resume pause reverse reset'", sync: 'resume pause reverse reset' },
];

const mount: Mount = (el, { preview }) => {
  const { scroller, square } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let animation: ReturnType<typeof animate> | undefined;
  let observer: ReturnType<typeof onScroll> | undefined;
  const setMode = (index: number): void => {
    // Revert the previous link before declaring the next one.
    observer?.revert();
    animation?.revert();
    const { label, sync } = MODES[index] ?? MODES[0]!;
    observer = onScroll({
      container: scroller,
      enter: 'bottom-=50 top',
      leave: 'top+=60 bottom',
      sync,
      debug: !preview,
    });
    animation = animate(square, {
      x: preview ? '7rem' : '15rem',
      rotate: '1turn',
      duration: 2000,
      ease: 'linear',
      autoplay: observer,
    });
    readout.textContent = label;
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
  };

  const buttons: HTMLButtonElement[] = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'modes';
    MODES.forEach(({ label }, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', () => setMode(i));
      buttons.push(b);
      bar.append(b);
    });
    el.prepend(bar);
  }

  setMode(0);
  let cycle = 0;
  let stopScroll = (): void => {};
  if (preview) {
    stopScroll = autoScroll(scroller);
    // Move to the next sync mode every scroll period.
    let i = 0;
    cycle = window.setInterval(() => setMode(++i % MODES.length), 7000);
  }

  return () => {
    window.clearInterval(cycle);
    stopScroll();
    observer?.revert();
    animation?.revert();
  };
};

export default mount;
