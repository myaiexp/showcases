// A transform that keeps only the digits of whatever phone format was typed
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { liveText } from '../../shared/live-text.ts';

const Digits = z.string().transform((text) => text.replace(/\D/g, ''));

const mount: Mount = (el, ctx) =>
  liveText(el, ctx, {
    code: 'z.string().transform(t => t.replace(/\\D/g, ""))',
    schema: Digits,
    samples: ['(555) 010-2299', '+1 555 010 2299', '555.010.2299'],
    placeholder: 'a phone number',
    say: (text, r) => (!text ? 'Type a phone number, or click a sample' : r.success ? `✓ ${text.length - r.data.length} characters dropped, ${r.data.length} digits kept` : '✗ Rejected'),
  });

export default mount;
