// pause() remembers the place in the recording; play() resumes from it
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { SCALE_SECONDS, scaleNote, scaleSound } from '../../shared/scale.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: ctx.preview ? 6 : 8 });
  const title = bigText(stage.visual, 17);
  const note = smallText(stage.visual, 'press play');
  const lamps = lights(stage.visual, ['playing', 'paused']);
  const wave = await strip(stage.visual, 'scale', stage.signal, ctx.preview ? 44 : 64);

  const settings = { pauseAt: 1.25, pauseFor: 1.25 };
  let plan = { ...settings };
  // Playhead: runs, holds still while paused, then runs on from the same place.
  const where = (time: number): number | null => {
    const { pauseAt, pauseFor } = plan;
    if (time < pauseAt) return time;
    if (time < pauseAt + pauseFor) return pauseAt;
    const p = pauseAt + (time - pauseAt - pauseFor);
    return p < SCALE_SECONDS ? p : null;
  };
  const state = (text: string, playing: boolean, detail: string): void => {
    title.textContent = text;
    note.textContent = detail;
    lamps.set('playing', playing);
    lamps.set('paused', !playing);
  };

  return stage.run({
    build: () => scaleSound(),
    play: (scale, at) => {
      const { pauseAt, pauseFor } = settings;
      const heard = scaleNote(pauseAt);
      stage.show(() => {
        plan = { pauseAt, pauseFor };
        state('play()', true, 'from the start');
      });
      scale.play();
      at(pauseAt, () => {
        scale.pause();
        stage.show(() => state('pause()', false, `stopped on ${heard}`));
      });
      at(pauseAt + pauseFor, () => {
        // No arguments: play() picks up from where pause() left it.
        scale.play();
        stage.show(() => state('play()', true, `carries on from ${heard}`));
      });
    },
    controls: (_scale, bar) => {
      slider(bar, 'pause after', 0.5, 3.5, 0.25, settings.pauseAt, (v) => (settings.pauseAt = v), (v) => `${v} s`);
      slider(bar, 'pause for', 0.5, 3, 0.25, settings.pauseFor, (v) => (settings.pauseFor = v), (v) => `${v} s`);
    },
    frame: (time) => wave.head(where(time)),
  });
};

export default mount;
