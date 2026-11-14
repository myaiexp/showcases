// A basic arpeggiator: a Pattern plays the next pentatonic note on every beat
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { playable } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'D4', 'E4', 'G4', 'A4'];
const SYNTHS = ['Synth', 'AMSynth', 'FMSynth'] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const keys = keyboard(stage.visual, 'C4', 'A4');
  let pick = 0;

  return stage.run({
    build: () => {
      // Any instrument has the same triggerAttackRelease, so they swap without other changes.
      const synths = [new Tone.Synth(), new Tone.AMSynth(), new Tone.FMSynth()];
      for (const s of synths) s.toDestination().volume.value = -6;
      const pattern = new Tone.Pattern((time, note) => {
        synths[pick]!.triggerAttackRelease(note!, 0.25, time);
        stage.show(time, () => keys.press(note!, 0.25));
      }, NOTES);
      pattern.start(0);
      return { synths, pattern };
    },
    play: (_, time) => {
      const label = `new Tone.${SYNTHS[pick]}()`;
      stage.show(time, () => (caption.textContent = label));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: SYNTHS.map((s, i) => ({ label: s, apply: () => void (pick = i) })),
    controls: ({ synths }, bar) => {
      playable(keys, synths[0]!);
      select(bar, 'instrument', SYNTHS, (s) => {
        pick = SYNTHS.indexOf(s);
        caption.textContent = `new Tone.${s}()`;
      });
    },
    dispose: ({ synths, pattern }) => {
      pattern.dispose();
      for (const s of synths) s.dispose();
    },
  });
};

export default mount;
