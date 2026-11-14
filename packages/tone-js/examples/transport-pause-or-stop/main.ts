// Transport pause vs stop: pausing resumes where it left off, stopping starts over
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane, phrasePart, posText } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 5 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 16);
  view.layout(16, 4);
  let how: 'pause' | 'stop' = 'pause';

  return stage.run({
    build: () => {
      const synth = blip();
      const part = phrasePart(stage, synth, view).start(0);
      follow(stage, Tone.getTransport(), (beat) => {
        view.head(Math.min(beat, 15.99));
        caption.textContent = posText(beat);
      });
      return { synth, part };
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.bpm.value = 240;
      t.start(time);
      if (stage.preview) {
        // Halt at 1.5 s, then start() again at 2.5 s: with pause it resumes, after stop it restarts.
        t[how](time + 1.5);
        t.start(time + 2.5);
        const label = how === 'pause' ? 'paused: resumes at 1:2' : 'stopped: back to 0:0';
        stage.show(time + 1.5, () => (caption.textContent = label));
      }
      return (end) => t.stop(end);
    },
    variants: (['pause', 'stop'] as const).map((h) => ({ label: `${h}, then start`, apply: () => void (how = h) })),
    controls: (_, bar) => {
      const t = (): ReturnType<typeof Tone.getTransport> => Tone.getTransport();
      button(bar, 'pause', () => void t().pause());
      button(bar, 'start', () => void t().start());
      button(bar, 'stop', () => void t().stop());
    },
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
