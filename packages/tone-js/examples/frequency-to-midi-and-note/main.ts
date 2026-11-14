// Frequency conversions: the same pitch as a note name, a MIDI number and hertz
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { keyboard } from '../../shared/widgets.ts';

const SECONDS = 3;
const TUNE = ['A3', 'C4', 'E4', 'A4', 'E4', 'C4'];

const make = (label: string, caption: string, say: (note: string) => string): HitCase => ({
  label,
  hits: () => ({ caption, hits: TUNE.map((note, i) => ({ at: i * 0.5, note, text: say(note), accent: i === 0 })) }),
});

const cases: HitCase[] = [
  make('name to MIDI', 'a note name in, a MIDI number out', (n) => `Frequency("${n}").toMidi() = ${Tone.Frequency(n).toMidi()}`),
  make('name to Hz', 'a note name in, hertz out', (n) => `Frequency("${n}").toFrequency() = ${num(Tone.Frequency(n).toFrequency(), 2)} Hz`),
  make('MIDI to name', 'a MIDI number in, a note name out', (n) => `Frequency(${Tone.Frequency(n).toMidi()}, "midi").toNote() = "${Tone.Frequency(Tone.Frequency(n).toMidi(), 'midi').toNote()}"`),
  make('Hz to name', 'hertz in, the nearest note name out', (n) => {
    const hz = Number(num(Tone.Frequency(n).toFrequency(), 2));
    return `Frequency(${hz}).toNote() = "${Tone.Frequency(hz).toNote()}"`;
  }),
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const keys = keyboard(stage.visual, 'A3', 'A4');
  return stage.run(hitSpec(stage, SECONDS, cases, undefined, keys));
};

export default mount;
