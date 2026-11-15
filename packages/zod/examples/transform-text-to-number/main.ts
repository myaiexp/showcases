// A transform that reads a typed price: it converts, and does not reject nonsense
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { liveText } from '../../shared/live-text.ts';

const Price = z.string().transform((text) => Number.parseFloat(text.replace(',', '.')));

const mount: Mount = (el, ctx) =>
  liveText(el, ctx, {
    code: 'z.string().transform(t => parseFloat(t.replace(",", ".")))',
    schema: Price,
    samples: ['12,50', '3.99', '0,5', 'free'],
    types: true,
    placeholder: 'a price, e.g. 12,50',
    say: (text, r) => {
      if (!text) return 'Type a price, or click a sample';
      if (!r.success) return '✗ Not text';
      return Number.isNaN(r.data) ? '✓ It parsed, but the number is NaN: transform does not judge' : `✓ "${text}" became the number ${String(r.data)}`;
    },
  });

export default mount;
