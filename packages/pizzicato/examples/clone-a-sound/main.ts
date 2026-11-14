// clone() copies a sound and its effects; the copy is retuned a fifth up
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { box } from '../../shared/box.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz, keys, noteName } from '../../shared/widgets.ts';

const LEAD = 60; // C4
const FIFTH = 7; // semitones

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 5 });
  const picture = flow(stage.visual, 'sound', ['Delay']);
  const piano = keys(box(stage.visual, ctx.preview ? 44 : 80), 60, 72);

  return stage.run({
    build: () => {
      const lead = new Pizzicato.Sound({
        source: 'wave',
        options: { type: 'triangle', frequency: hz(LEAD), volume: 0.4, attack: 0.02, release: 0.1 },
      });
      const delay = new Pizzicato.Effects.Delay({ time: 0.22, feedback: 0.4, mix: 0.4 });
      lead.addEffect(delay);
      // Same type, volume, attack, release and the same Delay object, as a new sound.
      const harmony = lead.clone();
      // In 0.6.4 a clone of a wave comes without the gain stage that its first play() looks for
      // (src/Sound.js: initializeWithSoundObject); give it the one the wave constructor makes.
      Object.assign(harmony.sourceNode!, { gainSuccessor: Pizzicato.context.createGain() });
      harmony.frequency = hz(LEAD + FIFTH);
      return { lead, harmony, delay };
    },
    play: ({ lead, harmony }, at) => {
      const top = Math.round(12 * Math.log2(harmony.frequency! / 440) + 69);
      const light = (midis: number[], caption: string): void =>
        stage.show(() => {
          for (let m = 60; m <= 72; m++) piano.set(m, midis.includes(m));
          picture.caption(caption);
        });
      lead.play();
      light([LEAD], `lead: ${noteName(LEAD)} with echo`);
      at(0.9, () => {
        lead.stop();
        light([], 'the echo rings on');
      });
      at(1.5, () => {
        harmony.play();
        light([top], `clone(): ${noteName(top)}, same echo`);
      });
      at(2.4, () => {
        harmony.stop();
        light([], 'the echo rings on');
      });
      at(3, () => {
        lead.play();
        harmony.play();
        light([LEAD, top], 'both: a harmony');
      });
      at(4, () => {
        lead.stop();
        harmony.stop();
        light([], 'echoes fade out');
      });
    },
    controls: ({ lead, harmony, delay }, bar) => {
      slider(bar, 'clone interval', 0, 12, 1, FIFTH, (v) => (harmony.frequency = lead.frequency! * 2 ** (v / 12)), (v) => `+${v} semitones`);
      slider(bar, 'lead volume', 0, 1, 0.05, lead.volume, (v) => (lead.volume = v));
      slider(bar, 'clone volume', 0, 1, 0.05, harmony.volume, (v) => (harmony.volume = v));
      slider(bar, 'echo feedback (shared)', 0, 0.9, 0.05, delay.feedback, (v) => (delay.feedback = v));
    },
  });
};

export default mount;
