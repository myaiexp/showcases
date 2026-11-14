// play(when, offset): wait a while, and start partway into a recording
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { SCALE_SECONDS, scaleNote, scaleSound } from '../../shared/scale.ts';
import { pzStage } from '../../shared/stage.ts';
import { strip } from '../../shared/strip.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: ctx.preview ? 4 : 8 });
  const title = bigText(stage.visual, 17);
  const note = smallText(stage.visual, 'press play');
  const wave = await strip(stage.visual, 'scale', stage.signal, ctx.preview ? 44 : 64);

  // Where the playhead is at a given second of the pass, for the settings of the current pass.
  let plan = { when: 0, offset: 0 };
  const where = (time: number): number | null => {
    const p = plan.offset + time - plan.when;
    return time < plan.when || p >= SCALE_SECONDS ? null : p;
  };
  const settings = { when: 1, offset: 2 };

  return stage.run({
    build: () => scaleSound(),
    play: (scale, at) => {
      const { when, offset } = settings;
      stage.show(() => {
        plan = { when, offset };
        title.textContent = `play(${when}, ${offset})`;
        note.textContent = when > 0 ? `waits ${when} s…` : 'starts at once';
        wave.mark(offset > 0 ? offset : undefined);
      });
      // The two arguments: seconds to wait, and where in the recording to start from.
      scale.play(when, offset);
      at(when, () => stage.show(() => (note.textContent = `from ${offset} s: ${scaleNote(offset)} first`)));
    },
    variants: [
      { label: 'play()', apply: () => Object.assign(settings, { when: 0, offset: 0 }) },
      { label: 'play(1): waits a second', apply: () => Object.assign(settings, { when: 1, offset: 0 }) },
      { label: 'play(0, 2): from the middle', apply: () => Object.assign(settings, { when: 0, offset: 2 }) },
    ],
    controls: (_scale, bar) => {
      slider(bar, 'when', 0, 3, 0.5, settings.when, (v) => (settings.when = v), (v) => `${v} s`);
      slider(bar, 'offset', 0, 3.5, 0.5, settings.offset, (v) => (settings.offset = v), (v) => `${v} s`);
    },
    frame: (time) => wave.head(where(time)),
  });
};

export default mount;
