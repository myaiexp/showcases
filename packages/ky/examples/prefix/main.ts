// prefix: put in front of the input as text, slashes at the join tidied
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const PREFIX = 'https://api.example/shop';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: `Every call sets prefix: '${PREFIX}'. A leading / on the input does not matter.` });
  urlLab(
    d,
    [
      {
        title: `prefix: ${PREFIX.replace('https://api.example', '…')}`,
        // The calls this example is about: one prefix, inputs with and without slashes.
        rows: [
          { label: "'users'", send: (api) => api('users', { prefix: PREFIX }) },
          { label: "'/users'", say: 'a leading slash is ignored', send: (api) => api('/users', { prefix: PREFIX }) },
          { label: "'///users'", say: 'any number of them', send: (api) => api('///users', { prefix: PREFIX }) },
          { label: "'users' + prefix '…/shop/'", say: 'a slash on the prefix is optional', send: (api) => api('users', { prefix: `${PREFIX}/` }) },
          { label: "'orders/7'", send: (api) => api('orders/7', { prefix: PREFIX }) },
        ],
      },
    ],
    {
      done: 'The prefix is simply put in front: slashes at the join never double up.',
      custom: { label: 'input', initial: '/orders/7', send: (api, input) => api(input, { prefix: PREFIX }) },
    },
  );
  return d.stage.dispose;
};

export default mount;
