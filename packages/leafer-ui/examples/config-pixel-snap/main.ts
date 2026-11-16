// App & engine config: rendering 1 px lines on pixel boundaries
import { Leafer, Rect, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the soft lines on the left with the crisp ones on the right.', paper: '#fff', panes: ['pixelSnap: false', 'pixelSnap: true'] });

  const zoom = stage.preview ? 2 : 4;
  const make = (pane: (typeof stage.panes)[number], snap: boolean): void => {
    pane.view.style.cssText += ';display:flex;align-items:center;justify-content:center;background:#fff';
    const view = document.createElement('div');
    pane.view.append(view);
    const engine = stage.own(new Leafer({ view, width: 60, height: 36, pixelRatio: 1, fill: '#fff', pixelSnap: snap }), pane);
    engine.add(new Rect({ x: 10.5, y: 6.5, width: 30, height: 20, stroke: '#000', strokeWidth: 1 })); // a 1 px outline
    engine.add(new Line({ x: 14, y: 30.5, width: 36, stroke: '#c00', strokeWidth: 1 }));
    const canvas = engine.canvas.view as HTMLCanvasElement;
    canvas.style.cssText += `;image-rendering:pixelated;transform:scale(${zoom});transform-origin:center`;
    view.style.cssText = `width:60px;height:36px;margin:${(36 * (zoom - 1)) / 2}px ${(60 * (zoom - 1)) / 2}px`;
  };
  make(stage.panes[0]!, false);
  make(stage.panes[1]!, true);

  return stage.dispose;
};

export default mount;
