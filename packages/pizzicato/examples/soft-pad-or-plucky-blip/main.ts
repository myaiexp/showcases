// The volume, attack and release options: the same note as a blip or as a pad
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4.2 });
  const setting = bigText(stage.visual, 15);
  const picture = flow(stage.visual, 'note', []);
  const describe = (s: Sound): void => {
    setting.textContent = `attack ${s.attack} s · release ${s.release} s`;
  };

  return stage.run({
    build: () =>
      new Pizzicato.Sound({
        source: 'wave',
        options: { type: 'triangle', frequency: 330, volume: 0.6, attack: 0.8, release: 1.5 },
      }),
    play: (note, at) => {
      note.play();
      stage.show(() => {
        describe(note);
        picture.caption(note.attack > 0.3 ? 'play(): fades in slowly' : 'play(): instant');
      });
      at(1.5, () => {
        note.stop();
        stage.show(() => picture.caption(note.release > 0.5 ? 'stop(): fades away' : 'stop(): cut short'));
      });
    },
    variants: [
      { label: 'plucky blip', apply: (n) => ((n.attack = 0), (n.release = 0.1)) },
      { label: 'soft pad', apply: (n) => ((n.attack = 0.8), (n.release = 1.5)) },
    ],
    controls: (note, bar) => {
      const unit = (v: number): string => `${v.toFixed(2)} s`;
      slider(bar, 'attack', 0, 1.5, 0.05, note.attack, (v) => ((note.attack = v), describe(note)), unit);
      slider(bar, 'release', 0, 2, 0.05, note.release, (v) => ((note.release = v), describe(note)), unit);
      slider(bar, 'volume', 0, 1, 0.05, note.volume, (v) => (note.volume = v));
      describe(note);
    },
  });
};

export default mount;
