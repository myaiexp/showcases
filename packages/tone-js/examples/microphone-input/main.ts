// Microphone input: UserMedia opens the mic on a click; cards show a stand-in
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button, checkbox, readout } from '../../shared/controls.ts';
import { rms } from '../../shared/fx-kit.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const label = bigLabel(stage.visual);
  const track = document.createElement('div');
  track.style.cssText = 'height:12px;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border);overflow:hidden;margin:6px 0';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0;background:#7aa2ff';
  track.append(fill);
  stage.visual.append(track);
  let level = 0;
  let micOpen = false;
  let liveMeter: Tone.Meter | undefined;
  label.textContent = ctx.preview
    ? 'Stand-in: a recorded voice, not your microphone\n(the full view asks permission first)'
    : 'Press "Open microphone" and allow access.\nPlay runs a recorded voice instead.';

  return stage.run({
    build: async () => {
      const out = new Tone.Volume(-4).toDestination();
      const voice = new Tone.Player(await sample('voice')).connect(out);
      // The microphone only exists in the full view: no permission prompt from a card.
      const mic = ctx.preview ? undefined : new Tone.UserMedia().connect(out);
      const meter = mic ? new Tone.Meter() : undefined;
      if (mic && meter) {
        mic.mute = true;
        mic.connect(meter);
      }
      liveMeter = meter;
      return { out, voice, mic, meter };
    },

    play: ({ voice }, time) => {
      voice.start(time);
    },
    stop: ({ voice }, time) => voice.stop(time),

    // Closing the mic ends the browser's recording indicator.
    dispose: ({ out, voice, mic, meter }) => {
      mic?.close();
      mic?.dispose();
      meter?.dispose();
      liveMeter = undefined;
      voice.dispose();
      out.dispose();
    },

    controls: ({ mic }, bar) => {
      if (!mic) return;
      const status = readout(bar.parentElement ?? bar, 'Microphone closed. Use headphones if you tick "hear myself".');
      button(bar, 'Open microphone', async () => {
        try {
          await Tone.start();
          await mic.open();
          micOpen = true;
          label.textContent = 'Microphone open: talk, and watch the level bar';
          status.textContent = `Open: ${mic.label ?? 'default input'}`;
        } catch (e) {
          status.textContent = `Could not open the microphone: ${e instanceof Error ? e.message : String(e)}`;
        }
      });
      button(bar, 'Close microphone', () => {
        mic.close();
        micOpen = false;
        label.textContent = 'Microphone closed';
        status.textContent = 'Microphone closed.';
      });
      checkbox(bar, 'hear myself (use headphones)', false, (on) => (mic.mute = !on));
    },

    frame: () => {
      level = micOpen && liveMeter ? Math.max(0, (Number(liveMeter.getValue()) + 60) / 60) : Math.min(1, rms(stage.samples()) * 3);
      fill.style.width = `${Math.round(level * 100)}%`;
    },
  });
};

export default mount;
