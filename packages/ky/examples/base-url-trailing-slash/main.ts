// baseUrl '/api' against '/api/': a missing slash misses the endpoint
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: 'The shop only has /api/users. Which baseUrl finds it?' });
  urlLab(
    d,
    [
      {
        title: "baseUrl '…/api'",
        // Without the slash, "api" counts as a file name and 'users' replaces it.
        rows: [{ label: "'users'", say: "baseUrl: 'https://api.example/api'", send: (api) => api('users', { baseUrl: 'https://api.example/api' }) }],
      },
      {
        title: "baseUrl '…/api/'",
        // With the slash, "api/" is a folder and 'users' goes inside it.
        rows: [{ label: "'users'", say: "baseUrl: 'https://api.example/api/'", send: (api) => api('users', { baseUrl: 'https://api.example/api/' }) }],
      },
    ],
    {
      exists: (url) => url.pathname === '/api/users',
      done: 'End the baseUrl with / so inputs go inside the folder.',
      custom: { label: 'baseUrl', initial: 'https://api.example/api', send: (api, base) => api('users', { baseUrl: base }) },
    },
  );
  return d.stage.dispose;
};

export default mount;
