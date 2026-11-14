// Headless Tippy: render()'s onUpdate diffs old and new props to redraw a progress bubble
import tippy from 'tippy.js/headless';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Press Upload and watch the bubble change.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Upload photos';
  stage.root.append(button);
  const info = stage.bar ? readout(stage.bar, 'onUpdate calls: 0, redraws: 0') : null;

  let calls = 0;
  let redraws = 0;
  const tip = stage.own(
    tippy(button, {
      content: '0',
      trigger: 'manual',
      placement: 'bottom',
      appendTo: stage.root,
      render(instance) {
        const popper = document.createElement('div');
        const box = document.createElement('div');
        const label = document.createElement('div');
        const track = document.createElement('div');
        const fill = document.createElement('div');
        box.className = 'bubble';
        track.className = 'track';
        fill.className = 'fill';
        track.append(fill);
        box.append(label, track);
        popper.append(box);

        // Draw the first state, then let onUpdate patch only what differs.
        const paint = (pct: string, done: boolean): void => {
          label.textContent = done ? 'Upload complete' : `Uploading ${pct}%`;
          fill.style.width = `${pct}%`;
          box.classList.toggle('done', done);
        };
        paint(String(instance.props.content), instance.props.theme === 'done');

        return {
          popper,
          onUpdate(prev, next) {
            calls += 1;
            if (prev.content !== next.content || prev.theme !== next.theme) {
              redraws += 1;
              paint(String(next.content), next.theme === 'done');
            }
            if (info) info.textContent = `onUpdate calls: ${calls}, redraws: ${redraws}`;
          },
        };
      },
    }),
  );

  let timer = 0;
  stage.onDispose(() => window.clearInterval(timer));
  const upload = (): void => {
    window.clearInterval(timer);
    let pct = 0;
    tip.setProps({ content: '0', theme: '' });
    tip.show();
    timer = window.setInterval(() => {
      pct = Math.min(100, pct + 4);
      if (pct < 100) tip.setContent(String(pct));
      else {
        tip.setProps({ content: '100', theme: 'done' });
        window.clearInterval(timer);
        stage.after(1500, () => tip.hide());
      }
    }, 110);
  };
  button.addEventListener('click', upload);

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.click(button, 700);
      await wait(4200);
      await wait(2000);
    });
  }

  return stage.dispose;
};

export default mount;
