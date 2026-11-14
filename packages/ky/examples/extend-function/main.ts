// extend(options => ...) builds on the parent's prefix
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { ledgerScene, runner } from '../../shared/inst-kit.ts';

const mount: Mount = (el, ctx) => {
  let part = 'users';
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'One client for the whole shop, and smaller clients for each part of it, built from it.',
    ledger: { host: true },
  });

  const shop = api.extend({ prefix: 'https://shop.example/v2' });

  const run = async (): Promise<void> => {
    log.clear();
    // The Ky call: a function receives the parent's options, so the child can add to its prefix.
    const section = shop.extend((options) => ({ prefix: `${options.prefix}/${part}` }));
    stage.say('The shop client reaches the whole shop…');
    await send("shop 'version'", () => shop.get('version'));
    stage.say(`The ${part} client was built from it and already knows where to look.`);
    await send(`${part} '7'`, () => section.get('7'));
    await send(`${part} '12'`, () => section.get('12'));
    stage.say(`Its prefix is the parent's prefix plus /${part}: nothing written twice.`, 'ok');
  };

  if (stage.bar) textInput(stage.bar, 'Section:', part, (v) => ((part = v.replace(/[^\w-]/g, '') || 'users'), again()), 8);
  const again = runner(stage, run);
  return stage.dispose;
};

export default mount;
