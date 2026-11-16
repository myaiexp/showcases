// Data: getPathString with curve and toFixed
import { Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The docs\' ring sector: getPathString(curve, pathForRender, toFixed) as an SVG path. toFixed trims the decimals.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.55;
  const ring = new Ellipse({ ...mid(stage, S, S), y: 10, width: S, height: S, startAngle: -60, endAngle: 180, innerRadius: 0.5, fill: '#32cd79' });
  leafer.add(ring);
  const show = label(stage, '', true);
  let curve = true, fixed = 2;
  const refresh = (): void => {
    const text = ring.getPathString(curve, false, fixed);
    show(`ring.getPathString(${curve}, false, ${fixed})\n${text.length > 150 ? text.slice(0, 150) + '…' : text}`);
  };
  toggle(stage, 'curve', curve, (v) => ((curve = v), refresh()), 3000);
  drive(stage, 'toFixed', [0, 4, 1], fixed, (v) => ((fixed = v), refresh()), 6);

  return stage.dispose;
};

export default mount;
