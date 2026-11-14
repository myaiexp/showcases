// Ky retries reads but not writes: repeating an order could charge you twice
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

type Method = 'get' | 'put' | 'post';
const DEFAULT_METHODS = ['get', 'put', 'head', 'delete', 'options', 'trace', 'query'];

const mount: Mount = (el, ctx) => {
  const orders: string[] = [];
  let showOrders = (): void => {};
  const lab = retryLab(el, ctx, {
    hint: 'The shop server saves your request, then fails to answer the first time. Pick the kind of request.',
    span: 3000,
    routes: {
      '*': (req) => {
        // The shop saves a write before it answers, so a lost answer means a saved order.
        if (req.method === 'POST') orders.push(`order #${orders.length + 1}: 1 coffee`);
        if (req.method === 'PUT') orders[0] = 'order #1: 2 coffees';
        showOrders();
        return req.n === 1 ? { status: 503 } : { json: { orders: orders.length } };
      },
    },
  });
  const saved = lab.facts('Orders saved at the shop');
  showOrders = () => {
    saved.clear();
    for (const o of orders) saved.add(o);
  };
  let method: Method = 'get';
  let allowPost = false;

  const send = (): Promise<boolean> => {
    orders.length = 0;
    saved.clear();
    const url = method === 'post' ? 'https://shop.example/orders' : 'https://shop.example/orders/1';
    return lab.attempt({
      say: `Sending ${method.toUpperCase()}; the first answer will be "busy"…`,
      // `retry.methods` lists the methods Ky may repeat. Writes such as POST are left out
      // by default; adding 'post' is how you opt in to repeating them.
      call: () =>
        lab.api(url, {
          method,
          ...(method === 'get' ? {} : { json: { item: 'coffee' } }),
          retry: { limit: 2, methods: allowPost ? [...DEFAULT_METHODS, 'post'] : DEFAULT_METHODS },
        }).json(),
      ok: () => ({
        say:
          method === 'post'
            ? `Retried, and the shop now holds ${orders.length} orders: the first one was saved after all.`
            : 'Retried and it worked. Asking twice does no harm for this kind of request.',
      }),
      bad: () => 'Not retried: if the first POST had gone through, a second would have placed a second order.',
      badTone: 'warn',
    });
  };

  if (lab.stage.preview) {
    const steps: Method[] = ['get', 'post'];
    let i = 0;
    lab.start(async () => {
      method = steps[i++ % steps.length]!;
      await send();
    }, 1400);
  } else {
    select<Method>(lab.stage.bar!, 'request:', [['get', 'GET: read an order'], ['put', 'PUT: set order 1'], ['post', 'POST: place a new order']], (v) => (method = v));
    checkbox(lab.stage.bar!, 'also retry POST', false, (v) => (allowPost = v));
    lab.start(async () => void (await send()), 1500, 'Send');
  }
  return lab.dispose;
};

export default mount;
