// Symbol keys: a declared one is checked and required, an undeclared one is ignored
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const TAG = Symbol('tag');
const OTHER = Symbol('other');

const Post = z.object({ title: z.string(), [TAG]: z.number() });
const LooseTitle = z.looseObject({ title: z.string() });

const SAMPLES = [
  { label: 'tag is 42', value: { title: 'hello', [TAG]: 42 } },
  { label: 'tag missing', value: { title: 'hello' } },
  { label: 'tag is text', value: { title: 'hello', [TAG]: 'x' } },
  { label: 'undeclared symbol', value: { title: 'hello', [OTHER]: 1 } },
];

const VARIANTS: ObjectVariant[] = [
  {
    label: 'declares [TAG]',
    code: 'z.object({ title: z.string(), [TAG]: z.number() })',
    schema: Post,
    say: (r) => (r.success ? '✓ The symbol key is present and a number' : '✗ The symbol key is checked like any field'),
  },
  {
    label: 'looseObject, no symbol',
    code: 'z.looseObject({ title: z.string() })',
    schema: LooseTitle,
    say: (r, input) => (r.success ? `✓ Passed${droppedPaths(input, r.data).length ? ', but looseObject ignores undeclared symbol keys' : ''}` : '✗ Rejected'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Symbols are keys too: declare one and it is required." });
  objectLab(stage, VARIANTS, SAMPLES, {
    editor: false,
    plan: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 3],
    ],
  });
  return stage.dispose;
};

export default mount;
