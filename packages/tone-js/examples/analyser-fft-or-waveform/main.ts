// Analyser: type "waveform" gives the shape, "fft" the frequencies
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { BLUE, PINK, rateOf } from '../../shared/routing-kit.ts';
import { barsCanvas, dft, stable, toBars } from '../../shared/spectrum-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Kind = 'waveform' | 'fft';
const MAX_HZ = 5500;
interface Graph {
  synth: Tone.Synth;
  analyser: Tone.Analyser;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, hideScopeInCard: true });
  const view = barsCanvas(stage.visual, stage.preview ? 0 : 180);
  const caption = document.createElement('div');
  caption.style.cssText = 'font:600 11px/1.2 ui-monospace,monospace;color:var(--fg-2);text-align:center;padding:2px';
  // A card's variant label already says the type.
  if (!stage.preview) stage.visual.append(caption);
  let live: Graph | undefined;
  let kind: Kind = 'waveform';
  // The type of the pass being shown (a card shows one variant after another).
  let shown: Kind = 'waveform';

  return stage.run({
    build: (): Graph => {
      const synth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.9, release: 0.2 }, volume: -10 }).toDestination();
      const analyser = new Tone.Analyser({ type: kind, size: 512, smoothing: 0.8 });
      synth.connect(analyser);
      live = { synth, analyser };
      return live;
    },
    play: (g, time) => {
      g.synth.triggerAttackRelease('A3', 0.9, time);
      g.synth.triggerAttackRelease('E4', 0.9, time + 1);
      const k = kind;
      stage.show(time, () => {
        shown = k;
        caption.textContent = k === 'fft' ? 'type: "fft" returns loudness per frequency' : 'type: "waveform" returns the wave shape';
      });
    },
    stop: (g, time) => g.synth.triggerRelease(time),
    dispose: (g) => {
      live = undefined;
      g.synth.dispose();
      g.analyser.dispose();
    },
    variants: (['waveform', 'fft'] as const).map((k) => ({
      label: `type: "${k}"`,
      apply: (g: Graph) => {
        kind = k;
        g.analyser.type = k;
      },
    })),
    controls: (g, box) => {
      select(box, 'type', ['waveform', 'fft'] as const, (k) => {
        kind = shown = k;
        g.analyser.type = k;
        caption.textContent = k === 'fft' ? 'type: "fft" returns loudness per frequency' : 'type: "waveform" returns the wave shape';
      });
      slider(box, 'smoothing', 0, 0.95, 0.05, 0.8, (v) => (g.analyser.smoothing = v));
    },
    frame: () => {
      if (stage.preview) {
        // A card reads silence from the Analyser, so it works from the rendered sound.
        const s = stage.samples();
        if (shown === 'fft') view.draw(toBars(dft(s, rateOf(stage)), 64, MAX_HZ), BLUE);
        else view.line(stable(s.subarray(-256), 256), PINK);
        return;
      }
      if (!live) return;
      const v = live.analyser.getValue() as Float32Array;
      if (shown === 'fft') view.draw(toBars({ db: v, binHz: Tone.getContext().sampleRate / (2 * live.analyser.size) }, 64, MAX_HZ), BLUE);
      else view.line(stable(v.subarray(0, 256), 256), PINK);
    },
  });
};

export default mount;
