// A tag list and its unwrap()ped element schema check the same rule on lists and on one tag
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

// A tag is trimmed text of 2 to 12 characters.
const TagList = z.array(z.string().trim().min(2).max(12));
// unwrap() returns the schema of one element: the Tag rule on its own.
const OneTag = TagList.unwrap();

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    variants: [
      {
        label: 'the whole list',
        code: 'TagList = z.array(z.string().trim().min(2).max(12))',
        schema: TagList,
        inputs: [['travel', ' food '], ['travel', 'x'], ['a', 'b', 'photography-blog'], 'travel'],
        say: (p, n) => `${p} of ${n} lists pass; each bad tag is named by its position`,
      },
      {
        label: 'one tag: TagList.unwrap()',
        code: 'OneTag = TagList.unwrap()  // the element schema',
        schema: OneTag,
        inputs: ['travel', '  food  ', 'x', 'photography-blog', ['travel']],
        say: (p, n) => `${p} of ${n} values pass: the same rule, applied to one tag`,
      },
    ],
    hint: 'Switch between the list and its element schema.',
  });

export default mount;
