// throwHttpErrors as a function: only server breakdowns throw, "not found" is normal flow
import type { Mount } from '@/types.ts';
import { checklist, kyName } from '../../shared/err-kit.ts';
import { cycle, demo } from '../../shared/req-kit.ts';

const POLICIES = [
  { label: 'status => status >= 500', throwHttpErrors: (status: number) => status >= 500, say: 'Only the broken product throws; "not found" is normal flow.' },
  { label: 'true (the default)', throwHttpErrors: true, say: 'Every error throws, even a harmless "not found".' },
  { label: 'false', throwHttpErrors: false, say: 'Nothing throws: your code must look at the status.' },
] as const;

// A shop with three product pages: one fine, one that does not exist, one that is broken.
const PRODUCTS = [
  { label: 'product 7', id: 7 },
  { label: 'product 99', id: 99 },
  { label: 'product 13', id: 13 },
];

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'Three product pages: 7 works, 99 does not exist (404), 13 has a server bug (500). Pick which errors should throw.',
    server: { latency: 80, delay: 60 },
    routes: {
      '/products/7': { json: { name: 'Teapot', price: 24 } },
      '/products/99': { status: 404, json: { error: 'No such product' } },
      '/products/13': { status: 500, json: { error: 'Database down' } },
    },
  });
  const list = checklist(stage.row(), 'What the shop page does');
  const rows = PRODUCTS.map((p) => list.add(p.label, 'not asked yet'));

  cycle(
    stage,
    POLICIES,
    async (policy) => {
      rows.forEach((r) => r.set('not asked yet'));
      stage.say(`throwHttpErrors: ${policy.label}`);
      for (const [i, product] of PRODUCTS.entries()) {
        rows[i]!.set('asking…', 'info');
        try {
          // The function gets the status and answers "should this throw?".
          const res = await api.get(`https://shop.example/products/${product.id}`, { throwHttpErrors: policy.throwHttpErrors, retry: 0 });
          if (res.ok) rows[i]!.set('shows the product', 'ok');
          else if (res.status === 404) rows[i]!.set('404: shows "no such product"', 'warn');
          else rows[i]!.set(`${res.status} came back as an answer`, 'warn');
        } catch (error) {
          if (stage.disposed) throw error;
          rows[i]!.set(`threw ${kyName(error)}: error banner`, 'bad');
        }
      }
      stage.say(policy.say, 'info');
    },
    { control: 'throwHttpErrors', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
