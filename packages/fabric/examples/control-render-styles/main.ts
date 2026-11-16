// Controls: renderCircleControl vs renderSquareControl, set for all handlers or per Control
import { Canvas, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, color, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const MODES = ['rect', 'circle', 'mixed'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'cornerStyle picks the renderer for every handler of an object. A Control with its own render() overrides it, as the "mixed" option does.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 120, width: 160, height: 100, fill: '#2e9e5b', cornerColor: '#e94b3c', cornerStrokeColor: '#7a1f17', cornerSize: 14 });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const mode = (m: (typeof MODES)[number]): void => {
    rect.cornerStyle = m === 'circle' ? 'circle' : 'rect';
    for (const [key, c] of Object.entries(rect.controls)) {
      // renderCircleControl / renderSquareControl are plain functions that expect `this` to be the Control
      if (m === 'mixed') c.render = key[0] !== 'm' || key === 'mtr' ? controlsUtils.renderCircleControl : controlsUtils.renderSquareControl;
      else delete (c as { render?: unknown }).render; // back to Control.prototype.render, which follows cornerStyle
    }
    say(`cornerStyle = ${rect.cornerStyle}${m === 'mixed' ? ', corners circle / sides square via Control.render' : ''}`);
    canvas.requestRenderAll();
  };
  mode('circle');

  if (stage.bar) {
    select(stage.bar, 'renderer', MODES, mode, 'circle');
    slider(stage.bar, 'cornerSize', 6, 30, 1, 14, (v) => { rect.cornerSize = v; rect.setCoords(); canvas.requestRenderAll(); });
    checkbox(stage.bar, 'transparentCorners', false, (v) => { rect.transparentCorners = v; canvas.requestRenderAll(); });
    color(stage.bar, 'cornerColor', '#e94b3c', (v) => { rect.cornerColor = v; canvas.requestRenderAll(); });
  } else {
    let i = 1;
    stage.every(1400, () => mode(MODES[++i % 3]!));
    stage.loop((_dt, t) => { rect.cornerSize = 14 + Math.sin(t * 2) * 4; rect.setCoords(); canvas.requestRenderAll(); });
  }
  return stage.dispose;
};

export default mount;
