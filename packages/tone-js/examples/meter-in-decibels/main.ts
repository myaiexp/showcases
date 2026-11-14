// Meter: getValue() gives a sound's RMS loudness in decibels
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { rms, source, type Source } from '../../shared/fx-kit.ts';
import { BLUE, bar, column, dbFrac, dbOf, dbText } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

interface Graph {
  src: Source;
  vol: Tone.Volume;
  meter: Tone.Meter;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const col = column(stage.visual, 10);
  const number = bigLabel(col, '-inf dB');
  const level = bar(col, 'level', BLUE);
  const scale = document.createElement('div');
  scale.style.cssText = 'display:flex;justify-content:space-between;font:11px ui-monospace,monospace;color:var(--fg-3);padding:0 2px';
  scale.innerHTML = '<span>-60 dB</span><span>-30</span><span>0 dB</span>';
  col.append(scale);
  let smoothed = 0;
  let smoothing = 0.8;
  let live: Graph | undefined;

  return stage.run({
    build: async (): Promise<Graph> => {
      const src = await source('riff');
      const vol = new Tone.Volume(0).toDestination();
      // The meter listens to the same signal that goes to the speakers.
      const meter = new Tone.Meter({ smoothing });
      src.out.connect(vol);
      vol.connect(meter);
      live = { src, vol, meter };
      return live;
    },
    play: (g, time) => g.src.start(time),
    dispose: (g) => {
      live = undefined;
      g.src.dispose();
      g.vol.dispose();
      g.meter.dispose();
    },
    stop: (g, time) => g.src.stop(time),
    variants: [0, -12, -24].map((db) => ({ label: `volume ${db} dB`, apply: (g: Graph) => (g.vol.volume.value = db) })),
    controls: (g, box) => {
      slider(box, 'volume', -40, 0, 1, 0, (v) => (g.vol.volume.value = v), dbText);
      slider(box, 'smoothing', 0, 0.99, 0.01, 0.8, (v) => (g.meter.smoothing = smoothing = v));
    },
    frame: () => {
      let db: number;
      if (stage.preview) {
        // A card reads silence from the Meter: take the level of the rendered sound instead,
        // smoothed the way Meter does (it can jump up at once but only falls slowly).
        smoothed = Math.max(rms(stage.samples()), smoothed * smoothing);
        db = dbOf(smoothed);
      } else {
        db = live ? (live.meter.getValue() as number) : -100;
      }
      number.textContent = dbText(db);
      level.set(dbFrac(db), '');
    },
  });
};

export default mount;
