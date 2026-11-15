// Mutually recursive schemas: User has posts, Post has an author who is a User
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { pathText } from '../../shared/paths.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const User = z.object({
  email: z.email(),
  get posts() {
    return z.array(Post);
  },
});

const Post = z.object({
  title: z.string(),
  get author() {
    return User;
  },
});

const author = (email: string, posts: unknown[] = []) => ({ email, posts });

const SAMPLES = [
  { label: 'valid thread', value: author('ada@example.com', [{ title: 'Tea notes', author: author('ada@example.com') }]) },
  { label: 'bad nested email', value: author('ada@example.com', [{ title: 'Tea notes', author: author('ada@') }]) },
  { label: 'bad nested title', value: author('ada@example.com', [{ title: 7, author: author('ada@example.com') }]) },
];

const VARIANTS: ObjectVariant[] = [
  {
    label: 'User',
    code: 'User = { email, get posts() → z.array(Post) }',
    schema: User,
    say: (r) => (r.success ? '✓ User, their posts and each post\'s author all check out' : `✗ ${pathText(r.error.issues[0]!.path)}: ${r.error.issues[0]!.message}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Break the email or title one hop away from the root." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
  });
  return stage.dispose;
};

export default mount;
