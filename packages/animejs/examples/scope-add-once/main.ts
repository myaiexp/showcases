// Scope addOnce(): a constructor that runs a single time while add() constructors rebuild on every refresh
import { createScope, createTimeline, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

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
  const onceCircles = makeRow('addOnce()');
  const addCircles = makeRow('add()');
  el.append(stage);

  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let onceRuns = 0;
  let addRuns = 0;
  let isSmall = false;
  const show = (): void => {
    readout.textContent = `addOnce() ran ${onceRuns}x\nadd() ran     ${addRuns}x\nisSmall = ${String(isSmall)}`;
  };
  const scope = createScope({
    root: stage,
    mediaQueries: { isSmall: '(max-width: 700px)' },
  }).add((maybeSelf) => {
    const self = maybeSelf!;
    self.addOnce(() => {
      onceRuns++;
      show();
      // Not reverted when the scope refreshes: the colour cycle never restarts.
      createTimeline().add(onceCircles, {
        backgroundColor: ['#ff4b4b', '#f6de00'],
        loop: true,
        alternate: true,
        duration: 2000,
      }, stagger(100));
    });

    self.add(() => {
      addRuns++;
      isSmall = Boolean(self.matches.isSmall);
      show();
      // Reverted and rebuilt on each refresh: this motion starts over every time.
      createTimeline().add(addCircles, {
        x: self.matches.isSmall ? [-20, 20] : [-50, 50],
        scale: [0.5, 1.1],
        loop: true,
        alternate: true,
      }, stagger(100));
    });
  });

  const refresh = (): void => {
    scope.refresh();
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(refresh, 2200);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'scope.refresh()';
    btn.addEventListener('click', refresh);
    const hint = document.createElement('span');
    hint.className = 'label';
    hint.textContent = 'A media query change (window narrower than 700px) refreshes the scope too.';
    bar.append(btn, hint);
    el.append(bar);
  }

  return () => {
    window.clearInterval(timer);
    scope.revert();
  };
};

export default mount;
