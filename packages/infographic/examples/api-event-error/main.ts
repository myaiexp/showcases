// on('error'): what the listener receives when nothing can be drawn
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const CASES = [
  {
    name: 'valid syntax',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
    - label Ship`,
  },
  {
    name: 'an unknown top-level key',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
mystery true
data
  lists
    - label Plan
    - label Ship`,
  },
  { name: 'no data', syntax: 'infographic list-row-simple-horizontal-arrow\ntheme dark' },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('error payload');
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  let heard = '';
  infographic.on('error', (payload: unknown) => {
    const list = Array.isArray(payload) ? payload : [payload];
    heard = list.map((e: Error & { message?: string }) => `${e.constructor?.name ?? 'object'}: ${e.message ?? JSON.stringify(e)}`).join(' | ');
  });

  stage.cycle(
    CASES.map(({ name, syntax }) => ({
      run: () => {
        heard = '';
        infographic.render(syntax);
        stage.say(`${name}: ${heard || 'no error, rendered'}`, heard ? 'bad' : 'ok');
        if (side) side.textContent = `${name}\n\n${syntax}\n\n-> ${heard || '(no error event)'}`;
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
