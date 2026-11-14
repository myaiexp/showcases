// Transport.progress: how far through the loop you are, as a number from 0 to 1
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, follow, hatAt, kickAt, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const LOOP_BEATS = 8;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 6 });
  const caption = bigLabel(stage.visual, '0%');
  const track = document.createElement('div');
  track.style.cssText = 'height:18px;border-radius:9px;border:1px solid var(--border);background:var(--bg-surface);overflow:hidden;margin:6px 8px';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0;background:#7aa2ff';
  track.append(fill);
  stage.visual.append(track);
  const view = lane(stage.visual, 1, LOOP_BEATS);
  view.layout(LOOP_BEATS, 4);
  const show = (p: number): void => {
    fill.style.width = `${p * 100}%`;
    caption.textContent = `progress ${p.toFixed(2)}`;
  };

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      t.scheduleRepeat((time) => kickAt(d, time), '4n', 0);
      t.scheduleRepeat((time) => hatAt(d, time), '8n', '0:0:2');
      // A card has no running clock to ask, so it works the same number out from the beat.
      follow(stage, t, (beat) => {
        view.head(beat);
        show((beat % LOOP_BEATS) / LOOP_BEATS);
      });
      return d;
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.setLoopPoints(0, '2m');
      t.loop = true;
      t.start(time);
      return (end) => t.stop(end);
    },
    // Live, the number comes straight from the Transport on every frame.
    frame: () => {
      if (!stage.preview) show(Tone.getTransport().progress);
    },
  });
};

export default mount;
