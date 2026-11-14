// A transform that turns one comma-separated line into a list of trimmed items
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { liveText } from '../../shared/live-text.ts';

const TagList = z.string().transform((line) =>
  line
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part !== ''),
);

const mount: Mount = (el, ctx) =>
  liveText(el, ctx, {
    code: 'z.string().transform(line => line.split(",").map(trim)…)',
    schema: TagList,
    samples: ['tea, mug ,cup', 'red,,blue,', 'single'],
    types: true,
    placeholder: 'tags, separated, by commas',
    say: (text, r) => (!text ? 'Type some comma-separated tags, or click a sample' : r.success ? `✓ One line of text became a list of ${r.data.length}` : '✗ Rejected'),
  });

export default mount;
