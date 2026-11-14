// Accurate timing: a Transport callback that passes its time versus one that ignores it
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  view.layout(4, 4);
  let pass = true;

  return stage.run({
    build: () => {
      const synth = blip();
      const t = Tone.getTransport();
      t.scheduleRepeat((time) => {
        // Right: synth.triggerAttackRelease('C5', '16n', time). Wrong: leave `time` off.
        if (pass) synth.triggerAttackRelease('C5', '16n', time);
        else synth.triggerAttackRelease('C5', '16n');
      }, '8n', 0);
      follow(stage, t, (beat) => view.head(beat), '8n');
      return synth;
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.setLoopPoints(0, '1m');
      t.loop = true;
      const on = pass;
      const how = stage.preview ? '' : ': notes land loose';
      stage.show(time, () => (caption.textContent = on ? 'time passed: notes on the grid' : `time ignored${how}`));
      t.start(time);
      return (end) => t.stop(end);
    },
    variants: [true, false].map((v) => ({ label: v ? 'time passed on' : 'time left off', apply: () => void (pass = v) })),
    controls: (_, bar) => {
      checkbox(bar, 'pass time to the synth', true, (v) => (pass = v));
      // Block the page for a moment, as a busy page would. Passing time shrugs it off.
      button(bar, 'freeze the page 250 ms', () => {
        const end = performance.now() + 250;
        while (performance.now() < end) continue;
      });
    },
    dispose: (synth) => synth.dispose(),
  });
};

export default mount;
