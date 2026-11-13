// refresh() re-rolls function-based parameters; revert() restores the square and deactivates the draggable
import { createDraggable, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const item = document.createElement('div');
  item.className = 'item';
  stage.append(item);
  el.append(stage);

  const readout = document.createElement('div');
  readout.className = 'readout';

  // Both parameters are functions, so refresh() calls them again.
  const make = (): ReturnType<typeof createDraggable> =>
    createDraggable(item, {
      container: stage,
      velocityMultiplier: 0,
      snap: () => utils.random(20, 60, 0),
      dragSpeed: () => utils.random(0.5, 1.5, 1),
    });
  let d = make();
  let active = true;
  const show = (): void => {
    readout.textContent = active
      ? `active   dragSpeed: ${d.dragSpeed}   snap: ${String(d.snapX)}px   x: ${Math.round(d.x)}`
      : 'reverted: the square is back at its start and no longer reacts to the pointer';
  };

  let cancelDrag: (() => void) | undefined;
  const replay = (): void => {
    d.reset();
    cancelDrag = fakeDrag(item, 100, 0, 500, show);
  };
  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  const buttons: HTMLButtonElement[] = [];
  const doRefresh = (): void => {
    d.refresh();
    show();
  };
  const doRevert = (): void => {
    cancelDrag?.();
    d.revert();
    active = false;
    buttons.forEach((b) => (b.disabled = b.dataset.needsActive === 'true'));
    show();
  };
  const doRebuild = (): void => {
    d = make();
    active = true;
    buttons.forEach((b) => (b.disabled = false));
    show();
  };

  let timer = 0;
  if (preview) {
    let n = 0;
    const cycle = (): void => {
      if (n % 4 === 3) {
        doRevert();
        later(doRebuild, 800);
      } else {
        doRefresh();
        replay();
      }
      n++;
    };
    cycle();
    timer = window.setInterval(cycle, 1500);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const add = (text: string, fn: () => void, needsActive: boolean): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.dataset.needsActive = String(needsActive);
      b.addEventListener('click', fn);
      buttons.push(b);
      panel.append(b);
    };
    add('refresh()', doRefresh, true);
    add('Replay a 100px drag', replay, true);
    add('revert()', doRevert, true);
    add('Create a new draggable', doRebuild, false);
    el.append(panel, readout);
    show();
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cancelDrag?.();
    d.revert();
  };
};

export default mount;
