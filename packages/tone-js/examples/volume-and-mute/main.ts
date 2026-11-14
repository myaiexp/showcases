// Volume: a dB fader; mute goes to -Infinity, unmute restores the level
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { source, rms, type Source } from '../../shared/fx-kit.ts';
import { BLUE, PINK, bar, column, dbFrac, dbOf, dbText } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Setting {
  db: number;
  muted: boolean;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const col = column(stage.visual);
  const fader = bar(col, 'fader', BLUE);
  const heard = bar(col, 'heard', PINK);
  let setting: Setting = { db: 0, muted: false };
  const paint = (s: Setting): void => fader.set(s.muted ? 0 : dbFrac(s.db, -40), s.muted ? 'muted' : dbText(s.db));

  return stage.run({
    build: async () => {
      const src = await source('riff');
      const vol = new Tone.Volume(0).toDestination();
      src.out.connect(vol);
      return { src, vol };
    },
    play: (g: { src: Source; vol: Tone.Volume }, time) => {
      g.vol.volume.value = setting.db;
      g.vol.mute = setting.muted;
      g.src.start(time);
      const s = { ...setting };
      stage.show(time, () => paint(s));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'volume 0 dB', db: 0, muted: false },
      { label: 'volume -12 dB', db: -12, muted: false },
      { label: 'volume -24 dB', db: -24, muted: false },
      { label: 'mute = true', db: -12, muted: true },
    ].map(({ label, ...s }) => ({
      label,
      apply: () => {
        setting = s;
      },
    })),
    controls: (g, box) => {
      slider(box, 'volume', -40, 6, 1, 0, (v) => { setting.db = v; if (!setting.muted) g.vol.volume.value = v; paint(setting); }, dbText);
      // Unmuting restores the level the fader was at before the mute.
      checkbox(box, 'mute', false, (m) => { setting.muted = m; g.vol.mute = m; paint(setting); });
    },
    frame: () => {
      const db = dbOf(rms(stage.samples()));
      heard.set(dbFrac(db, -40), dbText(db));
    },
  });
};

export default mount;
