// Four effects plugged into a playing riff one after another
import Pizzicato, { type Effect } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz } from '../../shared/widgets.ts';

const NAMES = ['Distortion', 'LowPass', 'Tremolo', 'Delay'] as const;
const RIFF = [45, 48, 52, 55, 57, 55, 52, 48]; // an A minor arpeggio

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const picture = flow(stage.visual, 'riff', [...NAMES]);
  const showChain = (on: readonly boolean[]): void => on.forEach((v, i) => picture.active(i, v));

  return stage.run({
    build: () => {
      const riff = new Pizzicato.Sound({ source: 'wave', options: { type: 'sawtooth', frequency: hz(RIFF[0]!), volume: 0.4 } });
      const effects: Effect[] = [
        new Pizzicato.Effects.Distortion({ gain: 0.6 }),
        new Pizzicato.Effects.LowPassFilter({ frequency: 900, peak: 6 }),
        new Pizzicato.Effects.Tremolo({ speed: 7, depth: 0.8, mix: 0.8 }),
        new Pizzicato.Effects.Delay({ feedback: 0.45, time: 0.25, mix: 0.4 }),
      ];
      return { riff, effects };
    },
    play: ({ riff, effects }, at) => {
      // The riff: one oscillator retuned every eighth of a second.
      for (let i = 0; i < 32; i++) at(i * 0.125, () => (riff.frequency = hz(RIFF[i % RIFF.length]!)));
      riff.play();
      at(3.8, () => riff.stop());
      // In the full view you plug effects in with the checkboxes; a card plugs them in on a timeline.
      if (!stage.preview) return;
      const on = [false, false, false, false];
      stage.show(() => {
        showChain(on);
        picture.caption('nothing plugged in');
      });
      effects.forEach((effect, i) => {
        at(0.6 + i * 0.7, () => {
          riff.addEffect(effect);
          on[i] = true;
          const now = [...on];
          stage.show(() => {
            showChain(now);
            picture.caption(`addEffect(${NAMES[i]})`);
          });
        });
      });
      at(3.5, () => {
        for (const effect of [...riff.effects]) riff.removeEffect(effect);
        stage.show(() => {
          showChain([false, false, false, false]);
          picture.caption('removeEffect() × 4');
        });
      });
    },
    controls: ({ riff, effects }, bar) => {
      showChain([false, false, false, false]);
      picture.caption('tick an effect to plug it in');
      NAMES.forEach((name, i) => {
        const effect = effects[i]!;
        checkbox(bar, name, false, (v) => {
          if (v && !riff.effects.includes(effect)) riff.addEffect(effect);
          if (!v && riff.effects.includes(effect)) riff.removeEffect(effect);
          picture.active(i, v);
        });
      });
    },
  });
};

export default mount;
