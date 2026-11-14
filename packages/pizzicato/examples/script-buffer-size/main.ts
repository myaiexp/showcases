// The bufferSize option: how often Pizzicato calls your function, counted
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const SIZES = [256, 1024, 4096] as const;

interface Counter {
  sound: Sound;
  calls: number;
  size: number;
  /** Seconds of sound in each block, filled in by the first call. */
  blockSeconds: number;
  retired: Sound[];
}

/** A quiet tone whose function counts how many times it is called. */
function make(size: number, count: Counter | null): Counter {
  const c: Counter = count ?? { sound: undefined as unknown as Sound, calls: 0, size, blockSeconds: 0, retired: [] };
  c.size = size;
  c.calls = 0;
  let phase = 0;
  c.sound = new Pizzicato.Sound({
    source: 'script',
    options: {
      bufferSize: size,
      volume: 0.3,
      audioFunction: (e) => {
        c.calls++;
        c.blockSeconds = e.outputBuffer.length / e.outputBuffer.sampleRate;
        const out = e.outputBuffer.getChannelData(0);
        const step = (2 * Math.PI * 220) / e.outputBuffer.sampleRate;
        for (let i = 0; i < out.length; i++) {
          out[i] = Math.sin(phase);
          phase += step;
        }
        phase %= 2 * Math.PI;
      },
    },
  });
  return c;
}

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const title = bigText(stage.visual, 15);
  const big = bigText(stage.visual, 24);
  const note = smallText(stage.visual);
  const bar = document.createElement('div');
  bar.style.cssText = 'align-self:center;width:80%;height:8px;border-radius:4px;background:var(--bg-surface);overflow:hidden;flex:0 0 auto';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;background:#7aa2ff;width:0';
  bar.append(fill);
  stage.visual.append(bar);

  // How much of the 'many calls' bar to fill, from calls per second (256 gives the most).
  const show = (size: number, perSecond: number, blockMs: number): void => {
    title.textContent = `bufferSize: ${size}`;
    big.textContent = `${Math.round(perSecond)} calls/s`;
    note.textContent = blockMs ? `each call: ${blockMs.toFixed(0)} ms of sound` : 'press play and count';
    fill.style.width = `${Math.min(100, perSecond)}%`;
  };
  show(1024, 0, 0);

  return stage.run({
    build: () => make(1024, null),
    play: (c, at) => {
      const size = c.size;
      c.calls = 0;
      c.sound.play();
      stage.show(() => show(size, 0, 0));
      // Every quarter second, read how many times the function has run so far.
      for (let i = 1; i <= 7; i++) {
        at(i * 0.25, () => {
          const perSecond = c.calls / (i * 0.25);
          const ms = c.blockSeconds * 1000;
          stage.show(() => show(size, perSecond, ms));
        });
      }
      at(1.9, () => c.sound.stop());
    },
    variants: SIZES.map((size) => ({ label: `bufferSize ${size}`, apply: (c: Counter) => remake(c, size) })),
    controls: (c, bar2) => {
      select(bar2, 'bufferSize', SIZES.map(String), (v) => {
        const wasPlaying = c.sound.playing;
        remake(c, Number(v));
        if (wasPlaying) c.sound.play();
      }, '1024');
    },
  });

  function remake(c: Counter, size: number): void {
    c.sound.stop();
    c.retired.push(c.sound);
    make(size, c);
  }
};

export default mount;
