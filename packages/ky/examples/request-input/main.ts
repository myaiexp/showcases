// A Request as input: prefix and baseUrl ignored, searchParams applies
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const OPTIONS = { prefix: 'https://api.example/shop', baseUrl: 'https://api.example/v2/' } as const;

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: 'Every call sets a prefix and a baseUrl. Which input pays attention?' });
  urlLab(
    d,
    [
      {
        title: 'same options, different input',
        rows: [
          { label: "'users'", say: 'a string: prefix and baseUrl are used', send: (api) => api('users', OPTIONS) },
          {
            label: 'Request(…/users)',
            say: 'a ready-made Request: its own address wins',
            send: (api) => api(new Request('https://api.example/users'), OPTIONS),
          },
          {
            label: 'Request + searchParams',
            say: 'but searchParams still gets added',
            send: (api) => api(new Request('https://api.example/users'), { ...OPTIONS, searchParams: { page: 2 } }),
          },
        ],
      },
    ],
    { done: 'A Request already knows where it goes; only the query is added to it.' },
  );
  return d.stage.dispose;
};

export default mount;
