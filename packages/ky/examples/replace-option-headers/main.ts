// replaceOption(headers): a public client without the login header
import { replaceOption } from 'ky';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/req-kit.ts';
import { ledgerScene } from '../../shared/inst-kit.ts';

const MODES = [
  { label: 'Merged (default)', replace: false },
  { label: 'replaceOption(headers)', replace: true },
];

const mount: Mount = (el, ctx) => {
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'The app client carries the login. A public client for a third-party site must not.',
    ledger: { headers: ['authorization', 'x-custom', 'accept'] },
  });

  // The app client: every call carries the login.
  const app = api.extend({ headers: { authorization: 'Bearer secret-8f2c', 'x-custom': 'value' } });

  cycle(stage, MODES, async (item) => {
    log.clear();
    // The Ky call: new headers merged into the parent's, or put in place of them.
    const publicApi = app.extend({ headers: item.replace ? replaceOption({ accept: 'application/json' }) : { accept: 'application/json' } });
    stage.say('The app client sends its login…');
    await send('app client', () => app.get('https://partner.example/prices'));
    await send('public client', () => publicApi.get('https://partner.example/prices'));
    stage.say(item.replace ? 'Replaced: the public client sends only its own header, no login.' : 'Merged: the public client still sent the login to a third party.', item.replace ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
