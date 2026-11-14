// A tip that loads a new picture each time it opens, guarding against repeat loads
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// Per-instance load state, kept in a WeakMap (the docs hang _isFetching/_src on the instance).
interface LoadState {
  fetching: boolean;
  picture: HTMLCanvasElement | null;
}

// Stand-in for a network request: draws a picture after a short wait.
function drawPicture(n: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 90;
  canvas.style.cssText = 'display:block;border-radius:4px';
  const g = canvas.getContext('2d')!;
  const hue = (n * 67) % 360;
  const sky = g.createLinearGradient(0, 0, 0, 90);
  sky.addColorStop(0, `hsl(${hue} 70% 62%)`);
  sky.addColorStop(1, `hsl(${(hue + 50) % 360} 80% 82%)`);
  g.fillStyle = sky;
  g.fillRect(0, 0, 150, 90);
  g.fillStyle = `hsl(${hue} 40% 28%)`;
  g.beginPath();
  g.moveTo(0, 90);
  for (let x = 0; x <= 150; x += 15) g.lineTo(x, 55 + ((n * 31 + x * 7) % 25));
  g.lineTo(150, 90);
  g.fill();
  g.fillStyle = '#fff9';
  g.beginPath();
  g.arc(25 + ((n * 41) % 100), 22, 11, 0, Math.PI * 2);
  g.fill();
  return canvas;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover the button. Try moving in and out quickly.' });

  const tally = document.createElement('div');
  tally.className = 'tally';
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Hover for a new picture';
  stage.root.append(tally, button);

  let hovers = 0;
  let loads = 0;
  const showTally = (): void => {
    tally.textContent = `Opened ${hovers}x, loads started ${loads}`;
  };
  showTally();

  const states = new WeakMap<Instance, LoadState>();

  stage.own(
    tippy(button, {
      content: 'Loading...',
      appendTo: stage.root,
      onCreate(instance) {
        states.set(instance, { fetching: false, picture: null });
      },
      onShow(instance) {
        hovers++;
        const state = states.get(instance)!;
        // Already loading, or already loaded: don't start another request.
        if (state.fetching || state.picture) return showTally();
        state.fetching = true;
        loads++;
        showTally();
        stage
          .wait(400 + Math.random() * 500)
          .then(() => {
            // The pointer left while loading: drop the result so the next open loads fresh.
            if (!instance.state.isVisible) return;
            state.picture = drawPicture(loads);
            instance.setContent(state.picture);
          })
          .catch(() => {
            if (!instance.state.isDestroyed) instance.setContent('Request failed.');
          })
          .finally(() => {
            state.fetching = false;
          });
      },
      onHidden(instance) {
        // Back to the placeholder, and forget the picture so the next open loads a new one.
        instance.setContent('Loading...');
        states.get(instance)!.picture = null;
      },
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(button, 700);
      await wait(2200);
      stage.ghost.leave();
      await wait(700);
      // A quick in-and-out and back: still only one load.
      await stage.ghost.hover(button, 300);
      await wait(200);
      stage.ghost.leave();
      await wait(450);
      await stage.ghost.hover(button, 200);
      await wait(2200);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 40, y: 170 }, 600);
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
