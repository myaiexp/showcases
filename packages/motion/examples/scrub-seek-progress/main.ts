// A mini animation player: play/pause, a progress scrubber, seek to labels, reverse and speed
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const LABELS = ['intro', 'middle', 'outro'] as const;

const mount: Mount = (el, { preview }) => {
  const scrubAbort = new AbortController();
  el.innerHTML = `
    <div class="player">
      <div class="screen"><div class="blob"></div></div>
      <div class="scrub"><input type="range" min="0" max="1" step="0.001" value="0" aria-label="Progress" /></div>
    </div>`;
  const slider = el.querySelector<HTMLInputElement>('input')!;
  if (preview) slider.disabled = true;

  const scope = scopeMotion(el, () => {
    const timeline = animate(
      [
        'intro',
        ['.blob', { scale: [0, 1], opacity: [0, 1] }, { duration: 0.8 }],
        'middle',
        ['.blob', { x: [0, 90, -90, 0], backgroundColor: ['#5b6cff', '#e0558a', '#2fb67c', '#5b6cff'] }, { duration: 2 }],
        'outro',
        ['.blob', { rotate: 360, borderRadius: '50%' }, { duration: 0.8 }],
      ],
      {
        repeat: preview ? Infinity : 0,
        // onUpdate gives seconds, so progress is time over the length of one run.
        onUpdate: (t) => {
          slider.value = String(Math.min(1, t / timeline.iterationDuration));
        },
      },
    );
    if (preview) return;

    const p = panel(el);
    const playPause = p.button('Pause', () => {
      if (timeline.state === 'running') {
        timeline.pause();
        playPause.textContent = 'Play';
      } else {
        if (timeline.progress >= 1) timeline.time = 0;
        timeline.play();
        playPause.textContent = 'Pause';
      }
    });
    // Dragging the scrubber sets progress directly: 0 is the start, 1 the end.
    slider.addEventListener('input', () => {
      timeline.pause();
      playPause.textContent = 'Play';
      timeline.progress = Number(slider.value);
    }, { signal: scrubAbort.signal });
    LABELS.forEach((l) => p.button(`seek("${l}")`, () => (timeline.seek(l), timeline.pause(), (playPause.textContent = 'Play'))));
    p.button('seek("outro-0.5")', () => (timeline.seek('outro-0.5'), timeline.pause(), (playPause.textContent = 'Play')));
    p.button('reverse()', () => {
      timeline.reverse();
      playPause.textContent = 'Pause';
    });
    p.select('Speed', ['0.5x', '1x', '2x'] as const, '1x', (v) => {
      timeline.speed = parseFloat(v);
    });
    hint(el, 'Drag the scrubber or seek to a label. Labels are just names for times: intro, middle and outro were written into the sequence as plain strings.');
    return () => p.dispose();
  });
  return () => {
    scrubAbort.abort();
    scope.cancel();
  };
};

export default mount;
