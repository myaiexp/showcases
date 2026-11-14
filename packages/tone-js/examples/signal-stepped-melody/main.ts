// setValueAtTime: one frequency signal plays a melody by jumping
import type { Mount } from '@/types.ts';
import { automation, type AutoCase } from '../../shared/signal-auto.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const STEP = 0.375;

const tune = (label: string, notes: readonly string[]): AutoCase => ({
  label,
  caption: notes.join('  '),
  schedule: (f, t) => notes.forEach((n, i) => void f.setValueAtTime(n, t + i * STEP)),
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(
    automation(stage, {
      seconds: SECONDS,
      yMin: 200,
      yMax: 600,
      guides: [261.63, 329.63, 392, 523.25],
      cases: [
        tune('major', ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'G4', 'C4']),
        tune('minor', ['C4', 'Eb4', 'G4', 'C5', 'Bb4', 'G4', 'Eb4', 'C4']),
      ],
    }),
  );
};

export default mount;
