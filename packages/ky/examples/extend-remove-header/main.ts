// extend with undefined removes an inherited header, and clears inherited hooks
import type { Mount } from '@/types.ts';
import { ledgerScene, runner } from '../../shared/inst-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'The testing client adds debug extras. The live client is built from it but must not send them.',
    ledger: { headers: ['x-app', 'x-debug', 'x-stamp'] },
  });

  // The testing client: two headers and a hook that stamps every request.
  const testing = api.extend({
    headers: { 'x-app': 'shop-web', 'x-debug': 'on' },
    hooks: { beforeRequest: [({ request }) => request.headers.set('x-stamp', 'added by hook')] },
  });
  // The live client inherits all of it, then takes two things away with undefined.
  const live = testing.extend({
    headers: { 'x-debug': undefined },
    hooks: { beforeRequest: undefined },
  });

  runner(stage, async () => {
    log.clear();
    stage.say('The testing client sends its debug extras…');
    await send('testing', () => testing.get('https://shop.example/products'));
    stage.say('The live client was built from it. What is missing?');
    await send('live', () => live.get('https://shop.example/products'));
    stage.say('x-debug and the hook are gone; x-app stayed.', 'ok');
  });
  return stage.dispose;
};

export default mount;
