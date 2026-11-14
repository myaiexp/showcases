// A voice through an effect: robot, cave or telephone, switched on the same sound
import Pizzicato, { type Effect, type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { closeMic, openMic } from '../../shared/mic.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';

const MODES = ['robot', 'cave', 'telephone'] as const;
type Mode = (typeof MODES)[number];
// The four boxes of the picture, and which of them each voice uses.
const BOXES = ['Ring', 'Reverb', 'High', 'Low'];
const USES: Record<Mode, readonly boolean[]> = {
  robot: [true, false, false, false],
  cave: [false, true, false, false],
  telephone: [false, false, true, true],
};
const SAYS: Record<Mode, string> = {
  robot: 'RingModulator: metal buzz',
  cave: 'Reverb: long, wet echo',
  telephone: 'HighPass + LowPass: thin',
};

interface Rig {
  source: Sound | null;
  mode: Mode;
  effects: Record<Mode, Effect[]>;
}

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.2, playLabel: ctx.preview ? 'Play' : 'Open the microphone' });
  const title = bigText(stage.visual, 16);
  const picture = flow(stage.visual, ctx.preview ? 'voice' : 'you', BOXES);
  const show = (mode: Mode): void => {
    title.textContent = mode;
    USES[mode].forEach((on, i) => picture.active(i, on));
    picture.caption(SAYS[mode]);
  };
  show('robot');

  /** Takes the old voice's effects off the source and puts the new voice's on. */
  const useMode = (rig: Rig, mode: Mode): void => {
    if (rig.source) {
      for (const e of [...rig.source.effects]) rig.source.removeEffect(e);
      for (const e of rig.effects[mode]) rig.source.addEffect(e);
    }
    rig.mode = mode;
  };

  return stage.run<Rig>({
    build: async () => ({
      // The microphone is opened on the first Play in the full view; a card uses a recording.
      source: ctx.preview ? await fileSound('voice', { attack: 0.05 }) : null,
      mode: 'robot',
      effects: {
        robot: [new Pizzicato.Effects.RingModulator({ speed: 30, distortion: 1, mix: 1 })],
        cave: [new Pizzicato.Effects.Reverb({ time: 2.5, decay: 2, mix: 0.6 })],
        telephone: [
          new Pizzicato.Effects.HighPassFilter({ frequency: 900 }),
          new Pizzicato.Effects.LowPassFilter({ frequency: 2600 }),
        ],
      },
    }),
    play: (rig, at) => {
      const mode = rig.mode;
      if (ctx.preview) {
        useMode(rig, mode);
        rig.source?.play();
        stage.show(() => show(mode));
        at(2, () => rig.source?.stop());
        return;
      }
      let stopped = false;
      title.textContent = 'asking for the microphone…';
      picture.caption('Wear headphones.');
      openMic(0.8, (sound, problem) => {
        if (stopped) return closeMic(sound);
        if (!sound) {
          title.textContent = 'no microphone';
          picture.caption(problem ?? '');
          return;
        }
        rig.source = sound;
        useMode(rig, rig.mode);
        sound.play();
        show(rig.mode);
      });
      return () => {
        stopped = true;
        closeMic(rig.source);
        rig.source = null;
        show(rig.mode);
      };
    },
    variants: MODES.map((m) => ({ label: `${m} (stand-in voice)`, apply: (rig: Rig) => (rig.mode = m) })),
    controls: (rig, bar) => {
      select(bar, 'voice', MODES, (m) => {
        useMode(rig, m);
        show(m);
      });
    },
    dispose: (rig) => {
      closeMic(rig.source);
      for (const list of Object.values(rig.effects))
        for (const e of list) {
          // The ring modulator's oscillator would otherwise run for the page's life.
          for (const v of Object.values(e)) {
            if (v instanceof OscillatorNode) {
              try {
                v.stop();
              } catch {
                // Already stopped (a card's offline graph is finished): nothing to do.
              }
            }
          }
          e.disconnect();
        }
    },
  });
};

export default mount;
