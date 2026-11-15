// One text typed live, checked by sixteen format schemas at once
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FORMATS: { name: string; schema: z.ZodType }[] = [
  { name: 'email', schema: z.email() },
  { name: 'uuid', schema: z.uuid() },
  { name: 'url', schema: z.url() },
  { name: 'ipv4', schema: z.ipv4() },
  { name: 'e164', schema: z.e164() },
  { name: 'iso.date', schema: z.iso.date() },
  { name: 'emoji', schema: z.emoji() },
  { name: 'hex', schema: z.hex() },
  { name: 'base64', schema: z.base64() },
  { name: 'base64url', schema: z.base64url() },
  { name: 'nanoid', schema: z.nanoid() },
  { name: 'cuid2', schema: z.cuid2() },
  { name: 'ulid', schema: z.ulid() },
  { name: 'jwt', schema: z.jwt() },
  { name: 'ipv6', schema: z.ipv6() },
  { name: 'hostname', schema: z.hostname() },
];

const SAMPLES = ['ada@example.com', '192.168.0.1', '+358401234567', '2024-03-09', 'deadBEEF', '01ARZ3NDEKTSV4RRFFQ69G5FAV', '😀', 'V1StGXR8_Z5jdHi6B-myT', 'https://example.com'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type anything: every format schema checks it at once.' });
  const field = textField(stage.root, stage, { label: 'Text', placeholder: 'ada@example.com', tries: SAMPLES, quiet: true });
  const grid = document.createElement('div');
  grid.className = 'fo-grid';
  const chips = FORMATS.map((f) => {
    const chip = document.createElement('span');
    chip.className = 'fo-chip';
    chip.textContent = f.name;
    grid.append(chip);
    return chip;
  });
  stage.root.append(grid);

  field.onInput((text) => {
    const hits = FORMATS.map((f) => text !== '' && f.schema.safeParse(text).success);
    chips.forEach((chip, i) => {
      const was = chip.dataset['on'] === 'true';
      chip.dataset['on'] = String(hits[i]);
      if (hits[i] && !was && !stage.disposed) chip.animate([{ transform: 'scale(1.25)' }, { transform: 'none' }], { duration: 220 });
    });
    const names = FORMATS.filter((_, i) => hits[i]).map((f) => f.name);
    if (!text) stage.say('Type something to see which formats accept it');
    else if (!names.length) stage.say('✗ none of these formats accept it', 'warn');
    else stage.say(`✓ accepted as ${names.join(' and ')}`, 'ok');
  });
  field.set('');
  typeLoop(stage, field, SAMPLES.slice(0, 5), 1500);
  return stage.dispose;
};

export default mount;
