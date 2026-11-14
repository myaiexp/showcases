// The FAQ's table, live: baseUrl and prefix treat a leading slash differently
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: 'The shop lives under /api. Same two inputs, two options.' });
  urlLab(
    d,
    [
      {
        title: "baseUrl '…/api/'",
        // baseUrl follows the web's rules: a leading slash means "the root of the site".
        rows: [
          { label: "'users'", send: (api) => api('users', { baseUrl: 'https://api.example/api/' }) },
          { label: "'/users'", say: 'baseUrl: the leading slash wins, /api is lost', send: (api) => api('/users', { baseUrl: 'https://api.example/api/' }) },
        ],
      },
      {
        title: "prefix '…/api'",
        // prefix is plain gluing: a leading slash on the input is dropped.
        rows: [
          { label: "'users'", send: (api) => api('users', { prefix: 'https://api.example/api' }) },
          { label: "'/users'", say: 'prefix: the leading slash is ignored', send: (api) => api('/users', { prefix: 'https://api.example/api' }) },
        ],
      },
    ],
    {
      exists: (url) => url.pathname === '/api/users',
      done: 'Use baseUrl normally; prefix when /users should mean "inside /api".',
    },
  );
  return d.stage.dispose;
};

export default mount;
