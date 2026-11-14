// Frequency.transpose: shift a melody by semitones, names change
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { hitSpec, type HitCase } from '../../shared/time-kit.ts';
import { keyboard } from '../../shared/widgets.ts';

const SECONDS = 3;
const MELODY = ['C4', 'E4', 'G4', 'E4', 'C4', 'D4', 'G4', 'C4'];

const shift = (semitones: number): HitCase => ({
  label: semitones === 0 ? 'original' : `${semitones > 0 ? '+' : ''}${semitones}`,
  hits: () => ({
    caption: `every note moved ${semitones} semitone${Math.abs(semitones) === 1 ? '' : 's'}`,
    hits: MELODY.map((n, i) => {
      const moved = Tone.Frequency(n).transpose(semitones).toNote();
      return { at: i * 0.375, note: moved, text: `Frequency("${n}").transpose(${semitones}) = "${moved}"`, accent: i === 0 };
    }),
  }),
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const keys = keyboard(stage.visual, 'C3', 'C6');
  return stage.run(hitSpec(stage, SECONDS, [0, 3, 7, -5, 12].map(shift), undefined, keys));
};

export default mount;
