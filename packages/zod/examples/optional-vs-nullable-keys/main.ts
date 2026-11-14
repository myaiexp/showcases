// An object with an optional and a nullable field, fed missing, undefined and null
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Profile = z.object({
  name: z.string(),
  nickname: z.string().optional(),
  phone: z.string().nullable(),
});

const SAMPLES = [
  { label: 'nickname left out', value: { name: 'Ada', phone: null } },
  { label: 'nickname: undefined', value: { name: 'Ada', nickname: undefined, phone: '555 0100' } },
  { label: 'nickname: null', value: { name: 'Ada', nickname: null, phone: '555 0100' } },
  { label: 'phone left out', value: { name: 'Ada', nickname: 'Countess' } },
  { label: 'phone: null', value: { name: 'Ada', nickname: 'Countess', phone: null } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'nickname: z.string().optional(), phone: z.string().nullable()');
  const cp = checkpoint(stage.root, stage, { inTitle: 'Form data', outTitle: 'Profile', types: true, messages: true });
  drive(stage, SAMPLES, (value) => {
    const result = Profile.safeParse(value);
    cp.show(value, result);
    if (result.success) stage.say('✓ accepted', 'ok');
    else stage.say(`✗ ${result.error.issues.map((i) => i.path.join('.')).join(', ')}: ${result.error.issues[0]!.message.replace('Invalid input: ', '')}`, 'bad');
  }, { editor: stage.preview ? undefined : stage.root });
  return stage.dispose;
};

export default mount;
