// A theremin: pointer x sets the frequency of one sine wave, pointer y sets its volume
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, noteName, smallText } from '../../shared/widgets.ts';

const LOW = 45; // A2, 110 Hz, at the left edge
const SPAN = 36; // three octaves to the right edge
const LOUDEST = 0.5;
const TICK = 0.04;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4.4, playLabel: 'Play by itself' });
  const title = bigText(stage.visual, 18);
  const note = smallText(stage.visual, ctx.preview ? 'gliding by itself' : 'move over the pad');
  const pad = document.createElement('div');
  pad.style.cssText = `position:relative;flex:1 1 ${ctx.preview ? 0 : 200}px;min-height:${ctx.preview ? 0 : 200}px;width:100%;border:1px solid var(--border);border-radius:8px;background:linear-gradient(90deg,rgba(122,162,255,0.05),rgba(122,162,255,0.25)),linear-gradient(0deg,transparent,rgba(122,162,255,0.12));touch-action:none;cursor:crosshair;overflow:hidden`;
  const dot = document.createElement('div');
  dot.style.cssText = 'position:absolute;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#ff8fb1;transition:opacity .15s;opacity:0.35';
  for (const [text, at] of [['low', 'left:6px;bottom:4px'], ['high', 'right:6px;bottom:4px'], ['loud', 'left:6px;top:4px']] as const) {
    const tag = document.createElement('span');
    tag.textContent = text;
    tag.style.cssText = `position:absolute;${at};font:11px ui-monospace,monospace;color:var(--fg-3)`;
    pad.append(tag);
  }
  pad.append(dot);
  stage.visual.append(pad);

  // x and y run from 0 to 1 across the pad (y is 1 at the top).
  const frequencyAt = (x: number): number => Math.round(hz(LOW + x * SPAN));
  const volumeAt = (y: number): number => Math.round(y * LOUDEST * 100) / 100;
  const draw = (x: number, y: number, on: boolean): void => {
    dot.style.left = `${x * 100}%`;
    dot.style.top = `${(1 - y) * 100}%`;
    dot.style.opacity = on ? '1' : '0.35';
    title.textContent = `${frequencyAt(x)} Hz · volume ${volumeAt(y)}`;
    note.textContent = noteName(Math.round(LOW + x * SPAN));
  };
  draw(0.3, 0.6, false);
  let held = false;

  return stage.run({
    build: () =>
      new Pizzicato.Sound({ source: 'wave', options: { type: 'sine', frequency: 220, volume: 0.3, attack: 0.05, release: 0.15 } }),
    play: (sound, at) => {
      sound.play();
      for (let t = 0; t < 4.2; t += TICK) {
        // A slow swoop across the pad with a wobble in loudness.
        const x = 0.5 + 0.4 * Math.sin(t * 1.4 - 1.2);
        const y = 0.55 + 0.35 * Math.sin(t * 3.1);
        at(t, () => {
          if (held) return; // a finger on the pad wins over the demo
          sound.frequency = frequencyAt(x);
          sound.volume = volumeAt(y);
          stage.show(() => draw(x, y, true));
        });
      }
      at(4.2, () => {
        sound.stop();
        stage.show(() => draw(0.3, 0.6, false));
      });
    },
    controls: (sound) => {
      const move = (e: PointerEvent): void => {
        const r = pad.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        const y = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height));
        sound.frequency = frequencyAt(x);
        sound.volume = volumeAt(y);
        draw(x, y, true);
      };
      pad.addEventListener('pointerdown', (e) => {
        void Pizzicato.context.resume(); // a touch is the gesture that lets the page make sound
        held = true;
        pad.setPointerCapture(e.pointerId);
        sound.play();
        move(e);
      });
      pad.addEventListener('pointermove', (e) => held && move(e));
      const release = (): void => {
        if (!held) return;
        held = false;
        sound.stop();
        draw(0.3, 0.6, false);
      };
      pad.addEventListener('pointerup', release);
      pad.addEventListener('pointercancel', release);
    },
  });
};

export default mount;
