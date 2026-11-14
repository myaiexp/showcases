// The release property: how long a note takes to fade away after stop()
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { meter } from '../../shared/fx-pictures.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.4 });
  const title = bigText(stage.visual, 20);
  const note = smallText(stage.visual);
  const level = meter(stage.visual, () => stage.samples());
  const describe = (release: number, stopped: boolean): void => {
    title.textContent = `release = ${release}`;
    note.textContent = !stopped ? 'playing…' : release === 0 ? 'stop(): cut off at once' : `stop(): fades over ${release} s`;
  };
  describe(0, false);

  return stage.run({
    build: () =>
      new Pizzicato.Sound({ source: 'wave', options: { type: 'triangle', frequency: 330, volume: 0.5, attack: 0.01, release: 0 } }),
    play: (sound, at) => {
      const release = sound.release;
      stage.show(() => describe(release, false));
      sound.play();
      at(0.9, () => {
        sound.stop();
        stage.show(() => describe(release, true));
      });
    },
    variants: [0, 0.5, 1.5].map((v) => ({
      label: `release: ${v}`,
      apply: (sound: Sound) => (sound.release = v),
    })),
    controls: (sound, bar) => {
      slider(bar, 'release', 0, 3, 0.1, sound.release, (v) => {
        sound.release = v;
        describe(v, false);
      }, (v) => `${v} s`);
    },
    frame: level,
  });
};

export default mount;
