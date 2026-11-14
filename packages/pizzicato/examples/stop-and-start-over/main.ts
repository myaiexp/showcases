// stop() forgets the place in the recording; play() starts from the beginning again
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { SCALE_SECONDS, scaleNote, scaleSound } from '../../shared/scale.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: ctx.preview ? 7 : 10 });
  const title = bigText(stage.visual, 17);
  const note = smallText(stage.visual, 'press play');
  const lamps = lights(stage.visual, ['playing', 'stopped']);
  const wave = await strip(stage.visual, 'scale', stage.signal, ctx.preview ? 44 : 64);

  const settings = { stopAt: 1.25, stopFor: 1.25 };
  let plan = { ...settings };
  // Playhead: runs, vanishes while stopped, then starts again from 0.
  const where = (time: number): number | null => {
    const { stopAt, stopFor } = plan;
    if (time < stopAt) return time;
    if (time < stopAt + stopFor) return null;
    const p = time - stopAt - stopFor;
    return p < SCALE_SECONDS ? p : null;
  };
  const state = (text: string, playing: boolean, detail: string): void => {
    title.textContent = text;
    note.textContent = detail;
    lamps.set('playing', playing);
    lamps.set('stopped', !playing);
  };

  return stage.run({
    build: () => scaleSound(),
    play: (scale, at) => {
      const { stopAt, stopFor } = settings;
      const heard = scaleNote(stopAt);
      stage.show(() => {
        plan = { stopAt, stopFor };
        state('play()', true, 'from the start');
      });
      scale.play();
      at(stopAt, () => {
        scale.stop();
        stage.show(() => state('stop()', false, `was on ${heard}, now forgotten`));
      });
      at(stopAt + stopFor, () => {
        scale.play();
        stage.show(() => state('play()', true, 'back to C4: the start'));
      });
    },
    controls: (_scale, bar) => {
      slider(bar, 'stop after', 0.5, 3.5, 0.25, settings.stopAt, (v) => (settings.stopAt = v), (v) => `${v} s`);
      slider(bar, 'stopped for', 0.5, 3, 0.25, settings.stopFor, (v) => (settings.stopFor = v), (v) => `${v} s`);
    },
    frame: (time) => wave.head(where(time)),
  });
};

export default mount;
