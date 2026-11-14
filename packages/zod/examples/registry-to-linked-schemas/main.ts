// A whole registry becomes linked schemas: each id is a file name, $ref points across
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const User = z.object({
  name: z.string(),
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

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every schema in the registry needs an id: the id names the output.' });
  // A registry of our own, filled on each mount.
  const reg = z.registry<{ id: string }>();
  reg.add(User, { id: 'User' });
  reg.add(Post, { id: 'Post' });
  const pick = (r: ReturnType<typeof z.toJSONSchema>): unknown => (stage.preview ? (r['schemas'] as Record<string, unknown>)['User'] : r['schemas']);
  jsonTour(
    stage,
    [
      { label: 'Relative ids (default)', call: 'z.toJSONSchema(reg)', make: () => pick(z.toJSONSchema(reg)), say: 'Posts and authors refer to each other by id: "$ref": "Post"' },
      {
        label: 'With uri',
        call: "z.toJSONSchema(reg, { uri: (id) => `https://example.com/${id}.json` })",
        make: () => pick(z.toJSONSchema(reg, { uri: (id) => `https://example.com/${id}.json` })),
        say: 'uri turns each id into a full address, for files you can serve',
        tone: 'ok',
      },
    ],
    {
      code: `const User = z.object({
  name: z.string(),
  get posts() { return z.array(Post) },
})
const Post = z.object({
  title: z.string(),
  get author() { return User },
})

const reg = z.registry<{ id: string }>()
reg.add(User, { id: 'User' })
reg.add(Post, { id: 'Post' })`,
      short: "reg.add(User, { id: 'User' }); reg.add(Post, { id: 'Post' })",
      menu: 'uri',
    },
  );
  return stage.dispose;
};

export default mount;
