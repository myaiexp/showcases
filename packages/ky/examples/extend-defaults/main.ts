// ky.extend(): set prefix, headers and query once for every call
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { ledgerScene, runner } from '../../shared/inst-kit.ts';

const LANGS = ['fi', 'en', 'sv'] as const;

const mount: Mount = (el, ctx) => {
  let lang: string = LANGS[0];
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'A shop talks to the same server all day. Write its settings once, on a client, instead of on every call.',
    ledger: { headers: ['x-app', 'authorization'] },
  });

  const run = async (): Promise<void> => {
    log.clear();
    // The Ky call this example is about: a client with defaults for everything that never changes.
    const shop = api.extend({
      prefix: 'https://shop.example/v2',
      headers: { 'x-app': 'shop-web', authorization: 'Bearer 8f2c' },
      searchParams: { lang },
    });
    stage.say('The long way: every setting written out on the call…');
    await send('plain', () => api.get('https://shop.example/v2/products'));
    stage.say('With the client: just the part that changes.');
    await send("shop 'products'", () => shop.get('products'));
    await send("shop 'orders/7'", () => shop.get('orders/7'));
    stage.say('Both calls through the client carry the address, header, login and language.', 'ok');
  };

  if (stage.bar) select(stage.bar, 'Language default:', LANGS.map((l) => [l, l] as const), (l) => ((lang = l), again()));
  const again = runner(stage, run);
  return stage.dispose;
};

export default mount;
