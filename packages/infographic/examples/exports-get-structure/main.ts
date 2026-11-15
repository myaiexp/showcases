// getStructure(type): the registered definition, or undefined for an unknown name
import { getStructure, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  items: [{ label: 'Plan', desc: 'Scope it' }, { label: 'Build', desc: 'Make it' }, { label: 'Ship', desc: 'Release it' }],
};
const LOOKUPS = ['list-row', 'sequence-timeline', 'chart-line', 'list-no-such-thing'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('getStructure(type)');
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    LOOKUPS.map((type) => ({
      run: () => {
        const found = getStructure(type);
        const shape = found ? `{ component: ${typeof found.component}, composites: ${JSON.stringify(found.composites)} }` : 'undefined';
        stage.say(`getStructure('${type}') -> ${shape}`, found ? 'ok' : 'warn');
        if (side) side.textContent = `getStructure('${type}')\n\n${shape}`;
        if (found) {
          infographic.render({ design: { structure: type, item: 'simple' }, data: type === 'chart-line' ? { items: [{ label: 'Q1', value: 12 }, { label: 'Q2', value: 30 }, { label: 'Q3', value: 22 }] } : DATA });
        } else {
          stage.box.replaceChildren();
        }
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
