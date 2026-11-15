// getItem(type): the definition, whose composites are the datum fields it draws
import { getItem, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SAMPLE: Record<string, string | number> = { icon: 'rocket', label: 'Launch', desc: 'Go live', value: 80, time: 'Friday', illus: 'rocket' };
const LOOKUPS = ['simple', 'badge-card', 'horizontal-icon-arrow', 'circular-progress', 'item-with-no-name'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('getItem(type)');
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, theme: 'dark' }));

  stage.cycle(
    LOOKUPS.map((type) => ({
      run: () => {
        const found = getItem(type);
        stage.say(found ? `getItem('${type}').composites = ${JSON.stringify(found.composites)}` : `getItem('${type}') -> undefined`, found ? 'ok' : 'warn');
        if (side) side.textContent = found ? JSON.stringify({ composites: found.composites, options: found.options }, null, 2) : 'undefined';
        if (!found) {
          stage.box.replaceChildren();
          return;
        }
        // One datum with only the fields this item says it draws.
        const datum = Object.fromEntries(found.composites.map((field) => [field, SAMPLE[field]]));
        infographic.render({ design: { structure: 'list-row', item: { type } }, data: { lists: [datum, { ...datum, label: 'Next' }] } });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
