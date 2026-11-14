// A full address as input ignores baseUrl, so server links can be followed
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const BASE = 'https://api.example/v1/';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: `baseUrl is '${BASE}'. Which inputs does it still change?` });
  urlLab(
    d,
    [
      {
        title: `baseUrl: ${BASE}`,
        // Every call carries the same baseUrl; only the input differs.
        rows: [
          { label: "'users'", say: 'a short name: the base is added', send: (api) => api('users', { baseUrl: BASE }) },
          {
            label: "'https://pay.example/a'",
            say: 'a full address on another site: used as it is',
            send: (api) => api('https://pay.example/a', { baseUrl: BASE }),
          },
          {
            label: "'https://api.example/v2/p2'",
            say: 'a "next page" link from a server: followed as it is',
            send: (api) => api('https://api.example/v2/p2', { baseUrl: BASE }),
          },
          {
            label: "'//cdn.example/logo.png'",
            say: 'no https: but a host, so it still counts as relative',
            send: (api) => api('//cdn.example/logo.png', { baseUrl: BASE }),
          },
        ],
      },
    ],
    {
      done: 'A complete address bypasses baseUrl; "//host" borrows https from it.',
      custom: { label: 'input', initial: 'https://other.example/x', send: (api, input) => api(input, { baseUrl: BASE }) },
    },
  );
  return d.stage.dispose;
};

export default mount;
