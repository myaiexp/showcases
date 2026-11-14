// ToneEvent: one note value that loops every loopEnd and is stopped at a chosen position
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const ENDS = ['8n', '4n', '2n'] as const;
const STOP_BEAT = 6;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 8);
  view.layout(8, 4);
  view.mark(STOP_BEAT, 'stop(1:2)', 0, '#ff8fb1');
  let end: string = '4n';

  return stage.run({
    build: () => {
      const synth = blip();
      const t = Tone.getTransport();
      const ppq = t.PPQ;
      // The second argument is the value handed to every callback.
      const event = new Tone.ToneEvent((time, pitch) => {
        synth.triggerAttackRelease(pitch, '16n', time);
        const beat = t.getTicksAtTime(time) / ppq;
        stage.show(time, () => view.ping(beat, 0));
      }, 'E5');
      follow(stage, t, (beat) => view.head(beat));
      return { synth, event };
    },
    play: ({ event }, time) => {
      const t = Tone.getTransport();
      event.set({ loop: true, loopEnd: end });
      event.start(0).stop('1:2');
      const label = `loopEnd: '${end}'`;
      stage.show(time, () => {
        caption.textContent = label;
        view.region(0, STOP_BEAT);
      });
      t.start(time);
      return (stopAt) => t.stop(stopAt);
    },
    variants: ENDS.map((e) => ({
      label: `loopEnd ${e}`,
      apply: ({ event }: { event: Tone.ToneEvent }) => void ((end = e), (event.loopEnd = e)),
    })),
    controls: ({ event }, bar) =>
      select(bar, 'loopEnd', ENDS, (v) => ((end = v), (event.loopEnd = v)), '4n'),
  });
};

export default mount;
