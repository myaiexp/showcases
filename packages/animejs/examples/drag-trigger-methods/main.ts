// Draggable trigger handle: the card moves, only its handle starts the drag; method buttons in the full view
import { createDraggable, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const card = document.createElement('div');
  card.className = 'card';
  const handle = document.createElement('div');
  handle.className = 'handle';
  handle.textContent = 'drag here';
  const body = document.createElement('div');
  body.className = 'body';
  body.textContent = 'Only the handle triggers the drag';
  card.append(handle, body);
  stage.append(card);
  el.append(stage);

  const draggable = createDraggable(card, {
    trigger: handle,
    container: stage,
    cursor: { onHover: 'move', onGrab: 'grabbing' },
  });

  const state = document.createElement('div');
  state.className = 'state';
  const showState = (): void => {
    state.textContent = `enabled: ${draggable.enabled}`;
    card.classList.toggle('off', !draggable.enabled);
  };
  showState();

  let timer = 0;
  if (preview) {
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      if (step % 4 === 0) draggable.reset();
      else draggable.setX(utils.random(0, 90)).setY(utils.random(0, 60));
    }, 800);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const add = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', () => {
        fn();
        showState();
      });
      panel.append(b);
    };
    add('disable()', () => draggable.disable());
    add('enable()', () => draggable.enable());
    add('reset()', () => draggable.reset());
    add('stop()', () => draggable.stop());
    add('setX(random)', () => draggable.setX(utils.random(0, 120)));
    add('setY(random)', () => draggable.setY(utils.random(0, 80)));
    el.append(panel, state);
  }

  return () => {
    window.clearInterval(timer);
    draggable.revert();
  };
};

export default mount;
