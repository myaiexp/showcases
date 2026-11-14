// The letter e-acute written two ways, made one form by .normalize()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Plain = z.string();
const Composed = z.string().normalize();

const SAMPLES = [
  { label: 'e + accent', text: 'café', say: 'was 5 code points (e and its accent apart), now 4' },
  { label: 'already one é', text: 'café', say: 'was already in the composed form: nothing changed' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.string().normalize()  // composed form (NFC)');
  const cp = checkpoint(stage.root, stage, { inTitle: 'Text', outTitle: 'Normalised', pass: 'Same text, one form' });
  const show = (s: (typeof SAMPLES)[number]): void => {
    const r = Composed.safeParse(s.text);
    cp.show(s.text, r);
    const same = Plain.parse(s.text) === (r.success ? r.data : '');
    stage.say(`${same ? '✓' : '✓ changed:'} ${s.say}`, 'ok');
  };
  if (stage.preview) stage.cycle(SAMPLES, 3200, show);
  else if (stage.bar) {
    select(stage.bar, 'Typed as', SAMPLES.map((s) => [s, s.label] as const), show);
    show(SAMPLES[0]!);
  }
  return stage.dispose;
};

export default mount;
