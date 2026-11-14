// extend inherits the parent's settings; create starts from nothing
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { ledgerScene, runner } from '../../shared/inst-kit.ts';

const GIVEN = [
  ['nothing', 'only its own header'],
  ['prefix', 'the prefix as well'],
] as const;

const mount: Mount = (el, ctx) => {
  let given: (typeof GIVEN)[number][0] = 'nothing';
  const { stage, server, api, log, send } = ledgerScene(el, ctx, {
    hint: 'Both new clients ask for a team header. Only one of them remembers the shop and its address.',
    ledger: { headers: ['x-app', 'x-team'] },
  });

  // The parent client: an address start, a header and (inherited from `api`) the pretend fetch.
  const shop = api.extend({ prefix: 'https://shop.example/v2', headers: { 'x-app': 'shop-web' } });

  const run = async (): Promise<void> => {
    log.clear();
    // extend: everything the parent has, plus the new header.
    const extended = shop.extend({ headers: { 'x-team': 'web' } });
    // create: only what is written here. Even `fetch` has to be given again.
    const created = shop.create({
      fetch: server.fetch,
      headers: { 'x-team': 'web' },
      ...(given === 'prefix' ? { prefix: 'https://shop.example/v2' } : {}),
    });
    stage.say('extend: built from the shop client.');
    await send("extend 'products'", () => extended.get('products'));
    stage.say('create: built from nothing, so it knows nothing of the shop.');
    await send("create 'products'", () => created.get('products'));
    if (given === 'nothing') await send('create, full address', () => created.get('https://shop.example/v2/products'));
    stage.say(given === 'nothing' ? 'create kept only its own header: no prefix, no x-app.' : 'create needed the prefix again, and still has no x-app.', 'warn');
  };

  if (stage.bar) select(stage.bar, 'create is also given:', GIVEN.map((g) => [g[0], g[1]] as const), (g) => ((given = g), again()));
  const again = runner(stage, run);
  return stage.dispose;
};

export default mount;
