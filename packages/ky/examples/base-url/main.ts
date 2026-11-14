// baseUrl: short inputs are resolved against it, like a browser link
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/req-kit.ts';
import { urlLab } from '../../shared/req-urls.ts';

const BASE = 'https://api.example/shop/v2/';
const INPUTS = ['users', './users', '../health', '/users', 'users?id=3'];

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { hint: `Every call sets baseUrl: '${BASE}'. Try your own input too.` });
  urlLab(
    d,
    [
      {
        title: `baseUrl: ${BASE.replace('https://api.example', '')}`,
        // The calls this example is about: the same baseUrl, a different short input each time.
        rows: INPUTS.map((input) => ({ label: `'${input}'`, send: (api) => api(input, { baseUrl: BASE }) })),
      },
    ],
    {
      done: 'Plain names extend the base; a leading / jumps to the site root.',
      custom: { label: 'input', initial: 'orders/7', send: (api, input) => api(input, { baseUrl: BASE }) },
    },
  );
  return d.stage.dispose;
};

export default mount;
