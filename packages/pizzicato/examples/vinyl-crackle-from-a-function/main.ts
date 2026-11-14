// A sound computed in a function: the pops and hiss of a worn record
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.5 });
  const title = bigText(stage.visual, 15);
  const note = smallText(stage.visual);
  const disc = document.createElement('div');
  disc.style.cssText = `align-self:center;flex:0 0 auto;width:${ctx.preview ? 58 : 96}px;aspect-ratio:1;border-radius:50%;margin:4px 0;
    background:radial-gradient(circle,#c9506c 0 16%,#0b0d12 17% 20%,transparent 21%),repeating-radial-gradient(circle,#161a22 0 2px,#0d1017 3px 5px);
    border:1px solid var(--border);position:relative`;
  const hole = document.createElement('div');
  hole.style.cssText = 'position:absolute;left:calc(50% - 3px);top:calc(50% - 3px);width:6px;height:6px;border-radius:50%;background:var(--bg)';
  disc.append(hole);
  stage.visual.append(disc);

  // How many pops a second the record has: audioFunction reads this on every block.
  const wear = { pops: 12 };
  const describe = (pops: number): void => {
    title.textContent = `about ${pops} pops a second`;
    note.textContent = 'a pop = one loud random sample, then a fast fade';
  };
  describe(wear.pops);

  let angle = 0;
  let last = 0;
  return stage.run({
    build: () => {
      let pop = 0; // the loudness of the pop in progress, fading to nothing
      const record = new Pizzicato.Sound({
        source: 'script',
        options: {
          volume: 0.6,
          audioFunction: (e) => {
            const out = e.outputBuffer.getChannelData(0);
            const chance = wear.pops / e.outputBuffer.sampleRate;
            for (let i = 0; i < out.length; i++) {
              if (Math.random() < chance) pop = (Math.random() < 0.5 ? -1 : 1) * (0.3 + Math.random() * 0.7);
              // The pop is noise that dies away, over the faint hiss of the groove.
              out[i] = pop * (Math.random() * 2 - 1) + 0.03 * (Math.random() * 2 - 1);
              pop *= 0.995;
            }
          },
        },
      });
      return { record };
    },
    play: ({ record }, at) => {
      record.play();
      const pops = wear.pops;
      stage.show(() => describe(pops));
      at(2.2, () => record.stop());
    },
    variants: [
      { label: 'barely worn', apply: () => (wear.pops = 6) },
      { label: 'well played', apply: () => (wear.pops = 40) },
    ],
    controls: (_g, bar) => {
      slider(bar, 'pops per second', 1, 120, 1, wear.pops, (v) => {
        wear.pops = v;
        describe(v);
      });
    },
    frame: (time) => {
      angle += (time < last ? 0 : time - last) * 200;
      last = time;
      disc.style.transform = `rotate(${angle}deg)`;
    },
  });
};

export default mount;
