// extend appends hooks to the parent's; replaceOption swaps them instead
import { replaceOption } from 'ky';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/req-kit.ts';
import { ledgerScene } from '../../shared/inst-kit.ts';

const MODES = [
  { label: 'Add a hook (default)', mode: 'append' },
  { label: 'replaceOption(hooks)', mode: 'replace' },
  { label: 'hooks: undefined', mode: 'clear' },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, api, log, send } = ledgerScene(el, ctx, {
    hint: 'The parent client has a hook that signs each request. The child brings a hook of its own.',
    ledger: { headers: ['x-signed', 'x-child'] },
  });

  // The parent: a hook that adds a header to every request.
  const parent = api.extend({ hooks: { beforeRequest: [({ request }) => request.headers.set('x-signed', 'by parent hook')] } });
  const childHook = ({ request }: { request: Request }): void => request.headers.set('x-child', 'by child hook');

  cycle(stage, MODES, async (item) => {
    log.clear();
    // The Ky calls: the same new hook, handed to extend in three ways.
    const child =
      item.mode === 'append'
        ? parent.extend({ hooks: { beforeRequest: [childHook] } })
        : item.mode === 'replace'
          ? parent.extend({ hooks: replaceOption({ beforeRequest: [childHook] }) })
          : parent.extend({ hooks: { beforeRequest: undefined } });
    stage.say('The parent client sends with its one hook…');
    await send('parent', () => parent.get('https://shop.example/products'));
    stage.say(`The child client is extended with: ${item.label}`);
    await send('child', () => child.get('https://shop.example/products'));
    stage.say(
      item.mode === 'append' ? 'Appended: both hooks ran, the parent\'s and the child\'s.' : item.mode === 'replace' ? 'Replaced: only the child\'s hook ran.' : 'Cleared: no hook ran at all.',
      'ok',
    );
  });
  return stage.dispose;
};

export default mount;
