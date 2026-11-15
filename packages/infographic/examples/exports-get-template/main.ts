// getTemplate(id): the design and themeConfig behind an id, used as plain options
import { getTemplate, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = { lists: [{ label: 'Plan', desc: 'Scope it', icon: 'list-check' }, { label: 'Build', desc: 'Make it', icon: 'hammer' }, { label: 'Ship', desc: 'Release it', icon: 'rocket' }] };
const IDS = ['list-row-simple-horizontal-arrow', 'list-grid-compact-card', 'list-column-done-list', 'list-no-such-template'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const make = () => {
    const d = document.createElement('div');
    d.style.cssText = 'flex:1;position:relative;min-width:0';
    return d;
  };
  const [byId, byOptions] = [make(), make()];
  const json = document.createElement('pre');
  json.style.cssText = `flex:1;min-width:0;margin:0;overflow:hidden;font:${ctx.preview ? 8 : 12}px monospace;color:#9cdcfe;white-space:pre-wrap;background:#111;padding:6px;border-radius:6px`;
  stage.box.append(byId, byOptions, json);
  const common = { width: '100%', height: '100%', padding: ctx.preview ? 3 : 12, theme: 'dark' };
  const a = stage.own(new Infographic({ container: byId, ...common }));
  const b = stage.own(new Infographic({ container: byOptions, ...common }));

  stage.cycle(
    IDS.map((id) => ({
      run: () => {
        const template = getTemplate(id);
        json.textContent = template ? JSON.stringify(template, null, 1) : 'undefined';
        stage.say(template ? `getTemplate('${id}'): left by id, right by its design` : `getTemplate('${id}') -> undefined`, template ? 'info' : 'warn');
        if (!template) return;
        a.render({ template: id, data: DATA });
        b.render({ design: template.design, themeConfig: template.themeConfig, data: DATA });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
