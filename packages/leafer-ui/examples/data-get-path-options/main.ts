// Data: getPath with the curve and pathForRender flags
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'curve turns every command into M, L, C or Z. pathForRender includes the corner radius, which the plain path leaves out.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.6;
  const rect = new Rect({ ...mid(stage, S, S), y: 14, fill: '#32cd79', cornerRadius: S * 0.3 });
  leafer.add(rect);
  const show = label(stage, '', true);
  let curve = false, forRender = false;
  const refresh = (): void => {
    const path = rect.getPath(curve, forRender);
    const text = JSON.stringify(path);
    show(`rect.getPath(${curve}, ${forRender})\n${path.length} numbers: ${text.length > 90 ? text.slice(0, 90) + '…' : text}`);
  };
  toggle(stage, 'curve', curve, (v) => ((curve = v), refresh()), 2400);
  toggle(stage, 'pathForRender', forRender, (v) => ((forRender = v), refresh()), 1200);
  refresh();

  return stage.dispose;
};

export default mount;
