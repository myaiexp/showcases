// From an array: ToneAudioBuffer.fromArray turns computed numbers into sound
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

interface Zap {
  from: number;
  to: number;
  wobble: number;
}
const ZAPS: Record<string, Zap> = {
  falling: { from: 1800, to: 150, wobble: 0 },
  rising: { from: 150, to: 1800, wobble: 0 },
  wobbling: { from: 700, to: 300, wobble: 0.35 },
};

/** Half a second of sine that sweeps from one pitch to another, fading out. */
function zapData(z: Zap): Float32Array {
  const rate = Tone.getContext().sampleRate;
  const data = new Float32Array(Math.floor(rate * 0.5));
  let phase = 0;
  data.forEach((_, i) => {
    const t = i / data.length;
    const sweep = z.from * (z.to / z.from) ** t;
    phase += (2 * Math.PI * sweep * (1 + z.wobble * Math.sin((2 * Math.PI * 30 * i) / rate))) / rate;
    data[i] = 0.8 * Math.sin(phase) * (1 - t) ** 2;
  });
  return data;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const wave = strip(stage.visual, ctx.preview ? 90 : 120);
  const label = bigLabel(stage.visual);
  let zap: Zap = ZAPS.falling!;
  const text = (z: Zap): string => `${z.from} Hz to ${z.to} Hz${z.wobble ? ', wobbling' : ''}`;

  /** Computes a new waveform and loads it into the player's buffer. */
  const load = (player: Tone.Player, z: Zap): Float32Array => {
    zap = z;
    const data = zapData(z);
    player.buffer = Tone.ToneAudioBuffer.fromArray(data);
    return data;
  };

  return stage.run({
    build: () => {
      const player = new Tone.Player({ volume: -8 }).toDestination();
      load(player, zap);
      return player;
    },

    play: (player, time) => {
      const z = zap;
      stage.show(time, wave.prepare(player.buffer.getChannelData(0), player.buffer.duration));
      stage.show(time, () => (label.textContent = text(z)));
      for (let i = 0; i < 4; i++) player.start(time + i * 0.7);
    },
    stop: (player, time) => player.stop(time),

    variants: Object.entries(ZAPS).map(([name, z]) => ({
      label: name,
      apply: (player: Tone.Player) => void load(player, z),
    })),

    controls: (player, bar) => {
      const redraw = (): void => {
        const data = load(player, { ...zap });
        wave.setData(data, data.length / Tone.getContext().sampleRate);
        label.textContent = text(zap);
      };
      redraw();
      slider(bar, 'start pitch', 100, 2000, 50, zap.from, (v) => ((zap = { ...zap, from: v }), redraw()), (v) => `${v} Hz`);
      slider(bar, 'end pitch', 100, 2000, 50, zap.to, (v) => ((zap = { ...zap, to: v }), redraw()), (v) => `${v} Hz`);
      slider(bar, 'wobble', 0, 0.6, 0.05, zap.wobble, (v) => ((zap = { ...zap, wobble: v }), redraw()));
    },

    frame: (time) => wave.draw({ cursor: Math.min(0.5, time % 0.7) }),
  });
};

export default mount;
