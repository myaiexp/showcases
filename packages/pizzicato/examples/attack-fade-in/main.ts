// The attack property: how long a note takes to swell up to full volume
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { meter } from '../../shared/fx-pictures.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.5 });
  const title = bigText(stage.visual, 20);
  const note = smallText(stage.visual);
  const level = meter(stage.visual, () => stage.samples());
  const describe = (attack: number): void => {
    title.textContent = `attack = ${attack}`;
    note.textContent = attack === 0 ? 'starts at full volume' : attack < 0.5 ? 'a quick swell' : 'a slow, bowed swell';
  };
  describe(0);

  return stage.run({
    build: () =>
      new Pizzicato.Sound({ source: 'wave', options: { type: 'sawtooth', frequency: 196, volume: 0.35, attack: 0, release: 0.1 } }),
    play: (sound, at) => {
      const attack = sound.attack;
      stage.show(() => describe(attack));
      sound.play();
      at(2.8, () => sound.stop());
    },
    variants: [0, 0.25, 0.8].map((v) => ({
      label: `attack: ${v}`,
      // The property is read on every play(), so set it before the note starts.
      apply: (sound: Sound) => (sound.attack = v),
    })),
    controls: (sound, bar) => {
      slider(bar, 'attack', 0, 3, 0.05, sound.attack, (v) => {
        sound.attack = v;
        describe(v);
      }, (v) => `${v} (next play)`);
    },
    frame: level,
  });
};

export default mount;
