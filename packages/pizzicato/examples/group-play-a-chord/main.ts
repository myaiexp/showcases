// Three sounds in a Group, played as one chord
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz, keys } from '../../shared/widgets.ts';

const CHORD = [60, 64, 67]; // C4, E4, G4

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const piano = keys(stage.visual, 60, 72);
  const light = (down: boolean): void => CHORD.forEach((m) => piano.set(m, down));

  return stage.run({
    build: () => {
      const notes = CHORD.map(
        (m) => new Pizzicato.Sound({ source: 'wave', options: { type: 'triangle', frequency: hz(m), volume: 0.4 } }),
      );
      return new Pizzicato.Group(notes);
    },
    play: (group, at) => {
      group.play();
      stage.show(() => light(true));
      at(1.2, () => {
        group.stop();
        stage.show(() => light(false));
      });
    },
    stop: (group) => {
      group.stop();
      light(false);
    },
  });
};

export default mount;
