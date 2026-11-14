// MembraneSynth: a sine whose pitch dives in an instant is a kick drum
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const DECAYS = [0.01, 0.05, 0.25];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const beat = pads(stage.visual, ['1', '2', '3', '4']);
  const label = bigLabel(stage.visual);
  let note = 'C1';

  return stage.run({
    build: () => new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 6 }).toDestination(),

    play: (kick, time) => {
      const text = `pitchDecay ${kick.pitchDecay}s   octaves ${kick.octaves}`;
      stage.show(time, () => (label.textContent = text));
      for (let i = 0; i < 4; i++) {
        const at = time + i * 0.5;
        kick.triggerAttackRelease(note, '8n', at);
        stage.show(at, () => beat.hit(i, 0.4));
      }
    },

    variants: DECAYS.map((d) => ({
      label: d < 0.02 ? 'quick dive: a click' : d > 0.1 ? 'slow dive: a boom' : 'pitchDecay 0.05',
      apply: (kick: Tone.MembraneSynth) => (kick.pitchDecay = d),
    })),

    controls: (kick, bar) => {
      beat.onHit(async () => {
        await Tone.start();
        kick.triggerAttackRelease(note, '8n');
      });
      slider(bar, 'pitchDecay', 0.005, 0.5, 0.005, 0.05, (v) => (kick.pitchDecay = v), (v) => `${v}s`);
      slider(bar, 'octaves', 0.5, 8, 0.5, 6, (v) => (kick.octaves = v));
      select(bar, 'note', ['C1', 'E1', 'G1', 'C2'] as const, (v) => (note = v), 'C1');
    },
  });
};

export default mount;
