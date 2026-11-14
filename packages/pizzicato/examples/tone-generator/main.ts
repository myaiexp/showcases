// The four wave types at a pitch you choose
import Pizzicato, { type Sound, type Wave } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const TYPES: readonly Wave[] = ['sine', 'triangle', 'square', 'sawtooth'];
const SOUNDS_LIKE: Record<Wave, string> = {
  sine: 'pure, like a whistle',
  triangle: 'soft, like a flute',
  square: 'hollow, like an old game console',
  sawtooth: 'bright and buzzy, like a brass synth',
};

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 1.5 });
  const title = bigText(stage.visual);
  const note = smallText(stage.visual);
  let type: Wave = 'sine';
  let frequency = 220;
  const describe = (t: Wave): void => {
    title.textContent = `type: '${t}'`;
    note.textContent = SOUNDS_LIKE[t];
  };
  describe(type);

  // The type is fixed when a sound is made, so changing it makes a new sound.
  const make = (): Sound =>
    new Pizzicato.Sound({ source: 'wave', options: { type, frequency, volume: type === 'sine' ? 0.6 : 0.35 } });

  return stage.run({
    build: () => ({ sound: make(), retired: [] as Sound[] }),
    play: (g, at) => {
      const t = type;
      stage.show(() => describe(t));
      g.sound.play();
      at(1.1, () => g.sound.stop());
    },
    variants: TYPES.map((t) => ({
      label: t,
      apply: (g: { sound: Sound; retired: Sound[] }) => {
        type = t;
        g.sound = make();
      },
    })),
    controls: (g, bar) => {
      select(bar, 'type', TYPES, (t) => {
        const wasPlaying = g.sound.playing;
        g.sound.stop();
        // Kept so the default dispose disconnects it once the example closes.
        g.retired.push(g.sound);
        type = t;
        g.sound = make();
        describe(t);
        if (wasPlaying) g.sound.play();
      });
      slider(bar, 'frequency', 55, 880, 1, frequency, (v) => {
        frequency = v;
        g.sound.frequency = v;
      }, (v) => `${v} Hz`);
    },
  });
};

export default mount;
