// prefix and baseUrl together: join the prefix first, then resolve
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const BASE = 'https://api.example/shop/';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: `baseUrl is '${BASE}' in every call. Watch what the prefix does to /shop.` });
  urlLab(
    d,
    [
      {
        title: `baseUrl ${BASE.replace('https://api.example', '…')} + a prefix`,
        // Step 1: prefix + input are glued together. Step 2: baseUrl resolves the result.
        rows: [
          { label: "prefix 'v2'", say: 'no leading slash: lands inside the base', send: (api) => api('users', { prefix: 'v2', baseUrl: BASE }) },
          { label: "prefix './v2'", say: 'a dot-slash works the same', send: (api) => api('users', { prefix: './v2', baseUrl: BASE }) },
          { label: "prefix '/v2'", say: 'a leading slash on the prefix jumps to the root', send: (api) => api('users', { prefix: '/v2', baseUrl: BASE }) },
          { label: "prefix 'https://b.example/v2'", say: 'a full prefix leaves the base behind', send: (api) => api('users', { prefix: 'https://b.example/v2', baseUrl: BASE }) },
        ],
      },
    ],
    {
      done: 'The prefix is glued on first, then baseUrl resolves the joined text.',
      custom: { label: 'prefix', initial: 'v3', send: (api, prefix) => api('users', { prefix, baseUrl: BASE }) },
    },
  );
  return d.stage.dispose;
};

export default mount;
