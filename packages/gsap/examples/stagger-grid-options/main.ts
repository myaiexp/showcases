// Advanced stagger object on a grid: from, axis, amount vs each, and the stagger ease
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const ROWS = 5;
const COLS = 9;
const FROMS = ['start', 'center', 'edges', 'random', 'end'] as const;

function select(label: string, options: readonly string[], value: string, parent: HTMLElement): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.textContent = label;
  const sel = document.createElement('select');
  for (const o of options) sel.add(new Option(o, o));
  sel.value = value;
  wrap.append(sel);
  parent.append(wrap);
  return sel;
}

const mount: Mount = (el, { preview }) => {
  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.setProperty('--cols', String(COLS));
  const cells: HTMLElement[] = [];
  for (let i = 0; i < ROWS * COLS; i++) {
    const c = document.createElement('div');
    c.className = 'cell';
    cells.push(c);
    grid.append(c);
  }
  el.append(grid);

  const readout = document.createElement('code');
  readout.className = 'readout';
  let fromSel: HTMLSelectElement | undefined;
  let axisSel: HTMLSelectElement | undefined;
  let modeSel: HTMLSelectElement | undefined;
  let easeSel: HTMLSelectElement | undefined;
  let timeRange: HTMLInputElement | undefined;
  let timeOut: HTMLElement | undefined;

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    fromSel = select('from', FROMS, 'center', bar);
    axisSel = select('axis', ['none', 'x', 'y'], 'none', bar);
    easeSel = select('stagger ease', ['none', 'power2.in', 'power2.inOut'], 'none', bar);
    modeSel = select('timing', ['amount', 'each'], 'amount', bar);
    const tl = document.createElement('label');
    tl.textContent = 'seconds ';
    timeRange = document.createElement('input');
    timeRange.type = 'range';
    timeRange.min = '0.2';
    timeRange.max = '2';
    timeRange.step = '0.1';
    timeRange.value = '1';
    timeOut = document.createElement('span');
    tl.append(timeRange, timeOut);
    bar.append(tl);
    const replay = document.createElement('button');
    replay.className = 'btn btn-primary';
    replay.textContent = 'Replay';
    bar.append(replay);
    el.append(bar, readout);
    replay.addEventListener('click', () => run());
    bar.addEventListener('change', () => run());
    bar.addEventListener('input', () => run());
  }

  let tween: gsap.core.Tween | undefined;
  let timer = 0;

  function run(fromValue?: string): void {
    tween?.kill();
    const from = fromValue ?? fromSel?.value ?? 'center';
    const axis = axisSel?.value === 'x' || axisSel?.value === 'y' ? axisSel.value : undefined;
    const secs = Number(timeRange?.value ?? 1);
    const mode = modeSel?.value === 'each' ? 'each' : 'amount';
    const stagger: gsap.StaggerVars = {
      grid: [ROWS, COLS],
      from: from as gsap.StaggerVars['from'],
      axis,
      ease: easeSel?.value ?? 'none',
    };
    if (mode === 'each') stagger.each = secs / 10;
    else stagger.amount = secs;
    if (timeOut) timeOut.textContent = ` ${secs.toFixed(1)}`;
    readout.textContent =
      `stagger: { grid: [${ROWS}, ${COLS}], from: '${from}', ${axis ? `axis: '${axis}', ` : ''}` +
      `${mode}: ${mode === 'each' ? (secs / 10).toFixed(2) : secs.toFixed(1)}, ease: '${stagger.ease}' }`;
    // Outside the context on purpose: every run builds a new staggered tween, and a context
    // would keep all of them until revert(). The handle is killed by hand instead.
    gsap.set(cells, { scale: 1 });
    tween = gsap.to(cells, {
      scale: 0.1,
      duration: 1,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: preview ? -1 : 1,
      repeatDelay: preview ? 0.4 : 0,
      stagger,
    });
  }

  if (preview) {
    let n = 0;
    run('center');
    timer = window.setInterval(() => run(FROMS[++n % FROMS.length]), 3200);
  } else {
    run();
  }

  return () => {
    window.clearInterval(timer);
    tween?.kill();
    gsap.set(cells, { clearProps: 'transform' });
  };
};

export default mount;
