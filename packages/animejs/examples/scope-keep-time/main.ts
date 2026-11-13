// Scope keepTime(): the animation is rebuilt with new parameters on refresh but resumes from its current time
import { createScope, createTimeline, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Tl = ReturnType<typeof createTimeline>;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const makeRow = (label: string): HTMLElement[] => {
    const row = document.createElement('div');
    row.className = 'row';
    const text = document.createElement('span');
    text.className = 'row-label';
    text.textContent = label;
    const circles = [0, 1, 2].map(() => {
      const c = document.createElement('div');
      c.className = 'circle';
      return c;
    });
    row.append(text, ...circles);
    stage.append(row);
    return circles;
  };
  const addCircles = makeRow('add()');
  const keepCircles = makeRow('keepTime()');
  el.append(stage);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let wide = true;
  let addTl: Tl | undefined;
  let keepTl: Tl | undefined;
  const build = (targets: HTMLElement[], range: number): Tl =>
    createTimeline().add(targets, {
      x: [-range, range],
      scale: [0.5, 1.1],
      loop: true,
      alternate: true,
      duration: 1500,
    }, stagger(100));

  const scope = createScope({
    root: stage,
    mediaQueries: { isSmall: '(max-width: 700px)' },
  }).add((maybeSelf) => {
    const self = maybeSelf!;
    // The window width and the button both feed the new range.
    const range = (wide ? 70 : 25) * (self.matches.isSmall ? 0.7 : 1);
    addTl = build(addCircles, range);
    keepTl = self.keepTime(() => build(keepCircles, range)) as Tl;
  });

  // Show where each timeline is in its loop, so the restart on the add() row is visible.
  let raf = 0;
  const tick = (): void => {
    readout.textContent =
      `add()      currentTime ${Math.round(addTl?.currentTime ?? 0).toString().padStart(5)} ms\n` +
      `keepTime() currentTime ${Math.round(keepTl?.currentTime ?? 0).toString().padStart(5)} ms`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  const change = (): void => {
    wide = !wide;
    scope.refresh();
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(change, 2600);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Change range and scope.refresh()';
    btn.addEventListener('click', change);
    bar.append(btn);
    el.append(bar);
  }

  return () => {
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    scope.revert();
  };
};

export default mount;
