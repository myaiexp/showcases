// Tone.Midi: a scale as MIDI numbers, read as names, hertz or shifted
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { keyboard } from '../../shared/widgets.ts';

const SECONDS = 3;
const SCALE = [60, 62, 64, 65, 67, 69, 71, 72];

const make = (label: string, caption: string, say: (m: number) => string, move = 0): HitCase => ({
  label,
  hits: () => ({
    caption,
    hits: SCALE.map((m, i) => ({ at: i * 0.375, note: Tone.Midi(m).transpose(move).toNote(), text: say(m), accent: i === 0 })),
  }),
});

const cases: HitCase[] = [
  make('toNote', 'MIDI 60 is middle C, and each number is a semitone', (m) => `Midi(${m}).toNote() = "${Tone.Midi(m).toNote()}"`),
  make('toFrequency', 'the same numbers as hertz', (m) => `Midi(${m}).toFrequency() = ${num(Tone.Midi(m).toFrequency(), 1)} Hz`),
  make('transpose', 'adding to a MIDI number moves the pitch', (m) => `Midi(${m}).transpose(7).toMidi() = ${Tone.Midi(m).transpose(7).toMidi()}`, 7),
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const keys = keyboard(stage.visual, 'C4', 'G5');
  return stage.run(hitSpec(stage, SECONDS, cases, undefined, keys));
};

export default mount;
