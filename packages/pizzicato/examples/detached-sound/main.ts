// A detached sound is silent until its output is connected to the master gain by hand
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz, keys } from '../../shared/widgets.ts';

const TUNE = [57, 60, 64, 60, 57, 60, 64, 69];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const picture = flow(stage.visual, 'sound', ['wire'], 'ears');
  const piano = keys(stage.visual, 57, 69);
  piano.el.style.height = ctx.preview ? '34px' : '56px';
  piano.el.style.minHeight = ctx.preview ? '30px' : '56px';
  const wired = (on: boolean): void => {
    picture.active(0, on);
    picture.caption(on ? 'connected: you hear it' : 'detached: playing, silent');
  };

  return stage.run({
    build: () => ({
      sound: new Pizzicato.Sound({
        source: 'wave',
        options: { type: 'triangle', frequency: hz(TUNE[0]!), volume: 0.5, detached: true },
      }),
    }),
    play: ({ sound }, at) => {
      if (stage.preview) stage.show(() => wired(false));
      sound.frequency = hz(TUNE[0]!);
      sound.play();
      // The tune plays all the way through; only the wire comes and goes.
      TUNE.forEach((midi, i) => {
        at(i * 0.5, () => {
          sound.frequency = hz(midi);
          stage.show(() => {
            piano.set(TUNE[(i + TUNE.length - 1) % TUNE.length]!, false);
            piano.set(midi, true);
          });
        });
      });
      if (stage.preview) {
        at(1.0, () => {
          sound.connect(Pizzicato.masterGainNode);
          stage.show(() => wired(true));
        });
        at(2.6, () => {
          sound.disconnect(Pizzicato.masterGainNode);
          stage.show(() => wired(false));
        });
      }
      at(3.9, () => {
        sound.stop();
        stage.show(() => TUNE.forEach((m) => piano.set(m, false)));
      });
    },
    stop: ({ sound }) => {
      sound.stop();
      TUNE.forEach((m) => piano.set(m, false));
    },
    controls: ({ sound }, bar) => {
      wired(false);
      checkbox(bar, 'connect(Pizzicato.masterGainNode)', false, (on) => {
        if (on) sound.connect(Pizzicato.masterGainNode);
        else sound.disconnect(Pizzicato.masterGainNode);
        wired(on);
      });
    },
  });
};

export default mount;
