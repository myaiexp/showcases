// A tag list refine (one issue for the whole list) vs superRefine (one issue per repeated tag)
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Tags = z.array(z.string().min(1));

const oneIssue = Tags.refine((tags) => new Set(tags).size === tags.length, { error: 'Tags must be unique' });

const perDuplicate = Tags.superRefine((tags, ctx) => {
  const seen = new Set<string>();
  tags.forEach((tag, i) => {
    if (seen.has(tag)) {
      ctx.addIssue({ code: 'custom', message: `"${tag}" is already in the list`, path: [i], input: tag });
    }
    seen.add(tag);
  });
});

const SAMPLES = [
  { label: 'two repeats', value: ['tea', 'mug', 'tea', 'cup', 'mug'] },
  { label: 'one repeat', value: ['tea', 'mug', 'tea'] },
  { label: 'all unique', value: ['tea', 'mug', 'cup'] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the list: each repeat gets its own issue only in the superRefine version.' });
  objectLab(
    stage,
    [
      { label: 'refine', code: 'z.array(z.string()).refine(isUnique)', schema: oneIssue },
      { label: 'superRefine', code: 'z.array(z.string()).superRefine((tags, ctx) => ctx.addIssue(…))', schema: perDuplicate },
    ],
    SAMPLES,
    { plan: [[0, 0], [1, 0], [1, 1]], messages: true },
  );
  return stage.dispose;
};

export default mount;
