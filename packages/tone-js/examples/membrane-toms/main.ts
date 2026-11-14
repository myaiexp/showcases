// MembraneSynth toms: the octaves option sets how far each hit falls in pitch
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const TOMS = ['G2', 'E2', 'C2', 'A1'];
const FILL = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
const OCTAVES = [0.5, 2, 6];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const drums = pads(stage.visual, ['high tom', 'mid tom', 'low tom', 'floor tom']);
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 2, envelope: { decay: 0.35, release: 0.3 } }).toDestination(),

    // A fill walking down the toms: indexes 0-3, then back up.
    play: (tom, time) => {
      const text = `octaves ${tom.octaves}`;
      stage.show(time, () => (label.textContent = text));
      FILL.forEach((offset, i) => {
        const pad = i < 4 ? i : 7 - i;
        const at = time + offset;
        tom.triggerAttackRelease(TOMS[pad]!, '16n', at);
        stage.show(at, () => drums.hit(pad, 0.3));
      });
    },

    variants: OCTAVES.map((o) => ({
      label: o < 1 ? 'octaves 0.5: a dull thud' : o > 4 ? 'octaves 6: a big swoop' : 'octaves 2',
      apply: (tom: Tone.MembraneSynth) => (tom.octaves = o),
    })),

    controls: (tom, bar) => {
      drums.onHit(async (i) => {
        await Tone.start();
        tom.triggerAttackRelease(TOMS[i]!, '16n');
      });
      slider(bar, 'octaves', 0.5, 8, 0.5, 2, (v) => (tom.octaves = v));
      slider(bar, 'pitchDecay', 0.01, 0.5, 0.01, 0.08, (v) => (tom.pitchDecay = v), (v) => `${v}s`);
    },
  });
};

export default mount;
