// PanVol: a pan knob and a volume fader in one node, like a mixer strip
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { BLUE, bar, column, dbText, strip } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Setting {
  pan: number;
  volume: number;
}

const SETTINGS: { label: string; s: Setting }[] = [
  { label: 'centre, 0 dB', s: { pan: 0, volume: 0 } },
  { label: 'pan -0.6, -12 dB', s: { pan: -0.6, volume: -12 } },
  { label: 'pan 0.8, -6 dB', s: { pan: 0.8, volume: -6 } },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const col = column(stage.visual);
  const panDot = strip(col, 'L', 'R');
  const fader = bar(col, 'vol', BLUE);
  let setting: Setting = { pan: 0, volume: 0 };
  const paint = (s: Setting): void => {
    panDot.set((s.pan + 1) / 2);
    fader.set(1 + s.volume / 40, `${dbText(s.volume)}, pan ${s.pan}`);
  };

  return stage.run({
    build: async () => {
      const src = await source('riff');
      const panVol = new Tone.PanVol(0, 0).toDestination();
      src.out.connect(panVol);
      return { src, panVol };
    },
    play: (g: { src: Source; panVol: Tone.PanVol }, time) => {
      g.panVol.pan.value = setting.pan;
      g.panVol.volume.value = setting.volume;
      g.src.start(time);
      const s = { ...setting };
      stage.show(time, () => paint(s));
    },
    stop: (g, time) => g.src.stop(time),
    variants: SETTINGS.map(({ label, s }) => ({
      label,
      apply: () => {
        setting = s;
      },
    })),
    controls: (g, box) => {
      slider(box, 'pan', -1, 1, 0.01, 0, (v) => { g.panVol.pan.value = setting.pan = v; paint(setting); });
      slider(box, 'volume', -40, 6, 1, 0, (v) => { g.panVol.volume.value = setting.volume = v; paint(setting); }, dbText);
      checkbox(box, 'mute', false, (m) => (g.panVol.mute = m));
    },
  });
};

export default mount;
