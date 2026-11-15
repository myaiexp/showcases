// object.and(looseRecord): a fixed name plus open-ended *_phone fields that must be phone numbers
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Contact = z.object({ name: z.string() }).and(z.looseRecord(z.string().regex(/_phone$/), z.e164()));

const SAMPLES = [
  { label: 'two phones', value: { name: 'John', home_phone: '+12345678900', work_phone: '+358401234567' } },
  { label: 'bad work phone', value: { name: 'John', home_phone: '+12345678900', work_phone: '0401234' } },
  { label: 'other fields pass', value: { name: 'John', note: 'call after 5', home_phone: '+12345678900' } },
  { label: 'no name', value: { home_phone: '+12345678900' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Invent a new key ending in _phone and give it a bad number.' });
  objectLab(stage, [{ label: 'contact', code: 'z.object({ name }).and(z.looseRecord(/_phone$/, z.e164()))', schema: Contact }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3]],
    inTitle: 'Contact',
  });
  return stage.dispose;
};

export default mount;
