// on('warning'): a non-fatal syntax slip, reported as SyntaxError[]
import { Infographic } from '@antv/infographic';
import type { SyntaxError } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const BASE = `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Ship
      desc Release it`;

const CASES = [
  { name: 'explicit "infographic" line', syntax: BASE },
  { name: 'a bare first line', syntax: BASE.replace('infographic ', '') },
  { name: 'another bare first line', syntax: BASE.replace('infographic list-row-simple-horizontal-arrow', 'list-column-simple-vertical-arrow') },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('warning payload');
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  let heard: SyntaxError[] = [];
  infographic.on('warning', (warnings: SyntaxError[]) => {
    heard = warnings;
  });

  stage.cycle(
    CASES.map(({ name, syntax }) => ({
      run: () => {
        heard = [];
        infographic.render(syntax);
        const text = heard.length ? heard.map((w) => `line ${w.line} ${w.code}: ${w.message}`).join(' | ') : 'no warning';
        stage.say(`${name}: ${text}`, heard.length ? 'warn' : 'ok');
        if (side) side.textContent = JSON.stringify(heard, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
