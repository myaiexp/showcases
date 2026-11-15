// z.deepPartial(): every object in the tree becomes optional, not only the top
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Post = z.object({
  title: z.string(),
  author: z.object({ name: z.string(), email: z.email() }),
  comments: z.array(z.object({ text: z.string(), likes: z.number() })),
});
const Shallow = Post.partial();
const Deep = z.deepPartial(Post);

const SAMPLES = [
  { label: 'empty author', value: { author: {} } },
  { label: 'half a comment', value: { comments: [{ text: 'Nice post' }, {}] } },
  { label: 'a bad email', value: { author: { email: 'nope' } } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'Post', code: 'Post = z.object({ title, author, comments })', schema: Post },
  { label: 'Post.partial()', code: 'Post.partial()', schema: Shallow, say: (r) => (r.success ? '✓ Accepted' : '✗ Only the top level went optional: the nested object is still strict') },
  {
    label: 'z.deepPartial(Post)',
    code: 'z.deepPartial(Post)',
    schema: Deep,
    say: (r) => (r.success ? '✓ Every level is optional, so this passes' : '✗ Optional everywhere, but what is present must still be valid'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Three schemas over the same half-filled posts." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  });
  return stage.dispose;
};

export default mount;
