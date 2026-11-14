// Tap-to-sound delay: a tap lights first, the note is heard one lookAhead later
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const DEFAULT = 0.1;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const lights = pads(stage.visual, ['tap', 'heard']);

  return stage.run({
    build: () => ({ synth: new Tone.Synth().toDestination(), lookAhead: DEFAULT }),

    // A tap at `time` is heard at time + lookAhead: that is what Tone.now() returns.
    play: (g, time) => {
      [0, 1].forEach((i) => {
        const tapAt = time + i;
        stage.show(tapAt, () => lights.hit(0, 0.2));
        g.synth.triggerAttackRelease('G4', '16n', tapAt + g.lookAhead);
        stage.show(tapAt + g.lookAhead, () => lights.hit(1, 0.2));
      });
    },

    variants: [0, 0.1, 0.3].map((lookAhead) => ({
      label: `lookAhead ${lookAhead} s`,
      apply: (g: { lookAhead: number }) => (g.lookAhead = lookAhead),
    })),

    controls: (g, bar) => {
      const now = readout(bar);
      lights.pads[0]!.addEventListener('pointerdown', async () => {
        await Tone.start();
        // No time given: the note is scheduled at Tone.now(), currentTime plus lookAhead.
        const at = Tone.now();
        g.synth.triggerAttackRelease('G4', '16n', at);
        stage.show(at, () => lights.hit(1, 0.2));
        now.textContent = `Tone.immediate() ${Tone.immediate().toFixed(3)} → heard at ${at.toFixed(3)}`;
      });
      slider(bar, 'lookAhead', 0, 0.5, 0.01, DEFAULT, (s) => (Tone.getContext().lookAhead = s), (s) => `${s} s`);
    },

    dispose: (g) => {
      g.synth.dispose();
      // lookAhead belongs to the page-wide context: put the default back.
      if (!stage.preview) Tone.getContext().lookAhead = DEFAULT;
    },
  });
};

export default mount;
