// getTypes(): the TypeScript definitions of the current structure and items
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TEMPLATES = ['list-row-simple-horizontal-arrow', 'hierarchy-tree-curved-line-rounded-rect-node', 'compare-binary-horizontal-simple-fold'];

const DATA: Record<string, object> = {
  'list-row-simple-horizontal-arrow': { lists: [{ label: 'Plan' }, { label: 'Build' }, { label: 'Ship' }] },
  'hierarchy-tree-curved-line-rounded-rect-node': { root: { label: 'Product', children: [{ label: 'Web' }, { label: 'Mobile' }] } },
  'compare-binary-horizontal-simple-fold': {
    compares: [
      { label: 'Before', children: [{ label: 'Slow' }, { label: 'Manual' }] },
      { label: 'After', children: [{ label: 'Fast' }, { label: 'Automatic' }] },
    ],
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 380 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-width:0';
  const types = document.createElement('pre');
  types.style.cssText = `flex:1;min-width:0;margin:0;overflow:hidden;font:${ctx.preview ? 8 : 12}px monospace;color:#9cdcfe;white-space:pre-wrap;background:#111;padding:6px;border-radius:6px`;
  stage.box.append(drawn, types);

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16, theme: 'dark' }));
  stage.cycle(
    TEMPLATES.map((template) => ({
      say: `template ${template}: getTypes()`,
      run: () => {
        infographic.render({ template, data: DATA[template] as never });
        types.textContent = infographic.getTypes() ?? '(no types)';
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
