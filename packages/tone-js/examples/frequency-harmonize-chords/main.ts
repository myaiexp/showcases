// Frequency.harmonize: a root plus intervals becomes a chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const SECONDS = 3;
const ROOTS = ['C4', 'F4', 'G4', 'C4'];
const KINDS: Record<string, number[]> = { major: [0, 4, 7], minor: [0, 3, 7], 'dominant 7th': [0, 4, 7, 10], sus4: [0, 5, 7] };
const NAMES = Object.keys(KINDS);

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const label = bigLabel(stage.visual, '');
  if (stage.preview) label.style.fontSize = '13px';
  const keys = keyboard(stage.visual, 'C4', 'F5');
  let kind = NAMES[0]!;

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { volume: -10 }).toDestination(),
    play: (synth, time) => {
      const intervals = KINDS[kind]!;
      ROOTS.forEach((root, i) => {
        const notes = Tone.Frequency(root).harmonize(intervals).map((f) => f.toNote());
        const at = time + i * 0.75;
        synth.triggerAttackRelease(notes, 0.65, at);
        stage.show(at, () => {
          label.textContent = `Frequency("${root}").harmonize([${intervals.join(', ')}])\n${notes.join('  ')}`;
          for (const n of notes) keys.press(n, 0.6);
        });
      });
    },
    stop: (synth) => synth.releaseAll(),
    variants: NAMES.map((k) => ({
      label: k,
      apply: () => {
        kind = k;
      },
    })),
    controls: (synth, bar) => {
      select(bar, 'chord', NAMES, (v) => (kind = v), kind);
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttackRelease(Tone.Frequency(note).harmonize(KINDS[kind]!).map((f) => f.toNote()), 0.6);
      });
    },
  });
};

export default mount;
