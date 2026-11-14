// Clicks scheduled ahead on Pizzicato.context.currentTime with plain oscillator nodes
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { releaseAll } from '../../shared/dispose.ts';
import { select, slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const BEATS = ['1', '2', '3', '4'] as const;
const SECONDS = 2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const clock = bigText(stage.visual, ctx.preview ? 15 : 22);
  const dots = lights(stage.visual, BEATS);
  const info = smallText(stage.visual);

  return stage.run({
    build: () => ({
      // Every click is a plain Web Audio node; they are kept here so cleanup can free them.
      nodes: [] as AudioNode[],
      setup: { interval: 0.5, type: 'square' as OscillatorType, pitch: 1000 },
    }),
    play: (g, at) => {
      releaseAll(g.nodes);
      g.nodes.length = 0;
      const context = Pizzicato.context;
      const start = context.currentTime + 0.05;
      const beats = Math.round(SECONDS / g.setup.interval);
      for (let i = 0; i < beats; i++) {
        const accent = i % 4 === 0;
        const osc = context.createOscillator();
        osc.type = g.setup.type;
        osc.frequency.value = g.setup.pitch * (accent ? 1.5 : 1);
        const click = context.createGain();
        const when = start + i * g.setup.interval;
        // A 60 ms blip: full volume at once, then a quick fade.
        click.gain.setValueAtTime(accent ? 0.35 : 0.2, when);
        click.gain.exponentialRampToValueAtTime(0.001, when + 0.06);
        osc.connect(click);
        click.connect(Pizzicato.masterGainNode);
        osc.start(when);
        osc.stop(when + 0.08);
        g.nodes.push(osc, click);
        // The picture follows the same clock: read currentTime when the click is due.
        at(0.05 + i * g.setup.interval, () => {
          const now = Pizzicato.context.currentTime;
          const rate = Pizzicato.context.sampleRate;
          stage.show(() => {
            BEATS.forEach((b, j) => dots.set(b, j === i % 4));
            clock.textContent = `currentTime ${now.toFixed(2)} s`;
            info.textContent = `click ${i + 1} · ${rate} Hz audio clock`;
          });
        });
        at(0.05 + i * g.setup.interval + 0.12, () => stage.show(() => dots.set(BEATS[i % 4]!, false)));
      }
    },
    variants: [
      { label: '120 BPM: a click every 0.5 s', apply: () => undefined },
      { label: '240 BPM, triangle clicks', apply: ({ setup }) => Object.assign(setup, { interval: 0.25, type: 'triangle', pitch: 700 }) },
    ],
    controls: ({ setup }, bar) => {
      clock.textContent = 'press Play';
      slider(bar, 'tempo', 60, 240, 10, 120, (v) => (setup.interval = 60 / v), (v) => `${v} BPM`);
      select(bar, 'click', ['square', 'sine', 'triangle', 'sawtooth'] as const, (v) => (setup.type = v));
      slider(bar, 'pitch', 300, 2000, 50, setup.pitch, (v) => (setup.pitch = v), (v) => `${v} Hz`);
    },
  });
};

export default mount;
