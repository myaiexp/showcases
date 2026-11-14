// A live tippy.currentInput readout and the docs' "double tap to click" wrapper on Delete
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const isIOS = /iPhone|iPad|iPod/.test(navigator.platform);

// The docs' emulateIOS: with touch input the listener only runs on the second tap.
// `isTouch` defaults to Tippy's own flag; a card passes a stand-in, because the real
// flag is page-wide and flips on any touch anywhere.
function emulateIOS(listener: () => void, isTouch: () => boolean = () => tippy.currentInput.isTouch): () => void {
  let clicks = 0;
  return function () {
    clicks++;
    if (clicks === 2 || isIOS || !isTouch()) {
      clicks = 0;
      listener();
    }
  };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 240,
    hint: 'Use the mouse, then (on a touch screen) your finger, and watch the readout.',
  });

  const input = document.createElement('div');
  input.className = 'input';
  const message = document.createElement('div');
  message.className = 'message';
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Delete photo';
  stage.root.append(input, button, message);

  let fakeTouch = false;
  const isTouch = (): boolean => (stage.preview ? fakeTouch : tippy.currentInput.isTouch);
  const draw = (): void => {
    input.textContent = `tippy.currentInput.isTouch = ${isTouch()}`;
  };
  draw();
  // isTouch is a plain object property, so there is nothing to subscribe to: poll it.
  stage.every(200, draw);

  stage.own(tippy(button, { content: 'Tap twice to delete', placement: 'bottom', appendTo: stage.root }));

  let deleted = 0;
  const onClick = emulateIOS(() => {
    message.textContent = `Deleted (${++deleted})`;
    stage.after(1400, () => (message.textContent = ''));
  }, isTouch);
  button.addEventListener('click', () => {
    if (isTouch() && !message.textContent) message.textContent = 'First tap: only shows the tip';
    onClick();
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      fakeTouch = false;
      message.textContent = '';
      draw();
      await stage.ghost.hover(button, 700);
      await wait(500);
      await stage.ghost.click(button, 200);
      await wait(1900);
      stage.ghost.leave();
      fakeTouch = true;
      draw();
      await stage.ghost.hover(button, 300);
      await wait(400);
      await stage.ghost.click(button, 200);
      await wait(1100);
      await stage.ghost.click(button, 200);
      await wait(1800);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 220, y: 170 }, 400);
    });
  }

  return stage.dispose;
};

export default mount;
