// Search params add up across extend layers; same name: later wins
import { replaceOption } from 'ky';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/req-kit.ts';
import { ledgerScene } from '../../shared/inst-kit.ts';

const MODES = [
  { label: 'Add a new param', mode: 'add' },
  { label: 'Same name: the later wins', mode: 'same' },
  { label: 'replaceOption(searchParams)', mode: 'replace' },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'The weather client always asks in Finnish and metric. A child client adds its own query.',
    ledger: { host: false },
  });

  // The parent: query parameters every call should carry.
  const weather = api.extend({ prefix: 'https://weather.example', searchParams: { lang: 'fi', units: 'metric' } });

  cycle(stage, MODES, async (item) => {
    log.clear();
    // The Ky call: the child's searchParams, merged over the parent's or put in place of them.
    const child =
      item.mode === 'add'
        ? weather.extend({ searchParams: { days: '3' } })
        : item.mode === 'same'
          ? weather.extend({ searchParams: { units: 'imperial' } })
          : weather.extend({ searchParams: replaceOption({ days: '3' }) });
    stage.say('The parent client asks with its own query…');
    await send('parent', () => weather.get('forecast'));
    stage.say(`The child client: ${item.label}`);
    await send('child', () => child.get('forecast'));
    stage.say(
      item.mode === 'add' ? 'Accumulated: the child\'s query has all three.' : item.mode === 'same' ? 'Same name: the child\'s imperial replaced metric.' : 'Replaced: lang and units are gone, only days is left.',
      'ok',
    );
  });
  return stage.dispose;
};

export default mount;
