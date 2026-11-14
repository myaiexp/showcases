// FFT: getValue() gives the loudness of each frequency, drawn as bars
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { BLUE, rateOf } from '../../shared/routing-kit.ts';
import { barsCanvas, dft, toBars } from '../../shared/spectrum-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const MAX_HZ = 5500;
const BARS = 64;
type Wave = 'sine' | 'triangle' | 'sawtooth' | 'square';
interface Graph {
  synth: Tone.Synth;
  fft: Tone.FFT;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, hideScopeInCard: true });
  const view = barsCanvas(stage.visual, stage.preview ? 0 : 160);
  const axis = document.createElement('div');
  axis.style.cssText = 'display:flex;justify-content:space-between;font:11px ui-monospace,monospace;color:var(--fg-3);padding:2px 4px';
  axis.innerHTML = '<span>0 Hz</span><span>1.4 kHz</span><span>2.8 kHz</span><span>4.1 kHz</span><span>5.5 kHz</span>';
  // A card's variant label sits where the axis would be.
  if (!stage.preview) stage.visual.append(axis);
  let live: Graph | undefined;
  let wave: Wave = 'sawtooth';

  return stage.run({
    build: (): Graph => {
      const synth = new Tone.Synth({ oscillator: { type: wave }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.9, release: 0.2 }, volume: -8 }).toDestination();
      // 512 bins from 0 Hz to half the sample rate.
      const fft = new Tone.FFT(512);
      synth.connect(fft);
      live = { synth, fft };
      return live;
    },
    play: (g, time) => {
      g.synth.triggerAttackRelease('A3', 0.9, time);
      g.synth.triggerAttackRelease('E4', 0.9, time + 1);
    },
    stop: (g, time) => g.synth.triggerRelease(time),
    dispose: (g) => {
      live = undefined;
      g.synth.dispose();
      g.fft.dispose();
    },
    variants: (['sine', 'triangle', 'sawtooth', 'square'] as const).map((w) => ({
      label: `oscillator: ${w}`,
      apply: (g: Graph) => {
        g.synth.oscillator.type = w;
      },
    })),
    controls: (g, box) => {
      select(box, 'oscillator', ['sine', 'triangle', 'sawtooth', 'square'] as const, (w) => {
        wave = w;
        g.synth.oscillator.type = w;
      }, wave);
      slider(box, 'smoothing', 0, 0.95, 0.05, 0.8, (v) => (g.fft.smoothing = v));
    },
    frame: () => {
      if (stage.preview) {
        // A card reads silence from the FFT node, so it takes a small DFT of the rendered sound.
        view.draw(toBars(dft(stage.samples(), rateOf(stage)), BARS, MAX_HZ), BLUE);
      } else if (live) {
        const db = live.fft.getValue();
        const binHz = Tone.getContext().sampleRate / (2 * live.fft.size);
        view.draw(toBars({ db, binHz }, BARS, MAX_HZ), BLUE);
      }
    },
  });
};

export default mount;
