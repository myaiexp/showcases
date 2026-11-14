// Message, success, error and reminder chimes, each a few notes on one wave
import Pizzicato, { type Sound, type Wave } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, smallText } from '../../shared/widgets.ts';

interface Chime {
  text: string;
  type: Wave;
  /** [seconds from the start, MIDI note] for each note. */
  notes: [number, number][];
  echo: boolean;
}

const CHIMES = {
  message: { text: '✉ New message', type: 'sine', notes: [[0, 76], [0.12, 81]], echo: true },
  success: { text: '✓ Saved', type: 'triangle', notes: [[0, 72], [0.1, 76], [0.2, 79]], echo: true },
  error: { text: '✕ Could not send', type: 'square', notes: [[0, 52], [0.18, 48]], echo: false },
  reminder: { text: '◷ Meeting in 5 min', type: 'sine', notes: [[0, 84], [0.25, 84], [0.5, 79]], echo: true },
} satisfies Record<string, Chime>;
type Name = keyof typeof CHIMES;
const NAMES = Object.keys(CHIMES) as Name[];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const toast = bigText(stage.visual, stage.preview ? 16 : 20);
  const which = smallText(stage.visual);
  let chosen: Name = 'message';
  const show = (name: Name, on: boolean): void => {
    toast.textContent = on ? CHIMES[name].text : '';
    toast.style.opacity = on ? '1' : '0.2';
    which.textContent = `${name}: ${CHIMES[name].type} wave`;
  };
  show(chosen, false);

  return stage.run({
    build: () => {
      const sounds = {} as Record<Name, Sound>;
      for (const name of NAMES) {
        const c: Chime = CHIMES[name];
        sounds[name] = new Pizzicato.Sound({
          source: 'wave',
          options: { type: c.type, volume: c.type === 'square' ? 0.2 : 0.45, attack: 0, release: 0.35 },
        });
        if (c.echo) sounds[name].addEffect(new Pizzicato.Effects.Delay({ feedback: 0.3, time: 0.15, mix: 0.3 }));
      }
      return sounds;
    },
    play: (sounds, at) => {
      const name = chosen;
      const s = sounds[name];
      stage.show(() => show(name, true));
      for (const [t, midi] of (CHIMES[name] as Chime).notes) {
        // Each note: retune, start, and stop shortly after so the release rings out.
        at(t, () => {
          s.stop();
          s.frequency = hz(midi);
          s.play();
        });
        at(t + 0.06, () => s.stop());
      }
      at(1.4, () => stage.show(() => show(name, false)));
    },
    variants: NAMES.map((name) => ({ label: name, apply: () => (chosen = name) })),
    controls: (_sounds, bar) => {
      select(bar, 'chime', NAMES, (name) => {
        chosen = name;
        show(name, false);
      });
    },
  });
};

export default mount;
