// Debug: wireframes of element bounds (real flag in the full view)
import { Debug, Ellipse, Group, Leafer, Rect, Star, type IUI } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { select } from '../../shared/controls.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Debug is page-wide, so this page turns it on while open and puts it back when you leave.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = stage.width;
  const h = stage.height;
  const shapes: IUI[] = [
    new Rect({ x: w * 0.1, y: h * 0.2, width: w * 0.25, height: h * 0.3, fill: GREEN, cornerRadius: 10, rotation: 8 }),
    new Ellipse({ x: w * 0.42, y: h * 0.3, width: w * 0.2, height: h * 0.35, fill: '#4B8BFF', stroke: 'black', strokeWidth: 14, shadow: { x: 8, y: 8, blur: 12, color: 'rgba(0,0,0,0.35)' } }),
    new Star({ x: w * 0.68, y: h * 0.18, width: w * 0.24, height: w * 0.24, fill: '#feb027', hitFill: 'all', corners: 5 }),
  ];
  const group = new Group({ children: shapes });
  leafer.add(group);

  if (!stage.preview) {
    const was = Debug.showBounds;
    stage.onDispose(() => {
      Debug.showBounds = was;
    });
    select(stage.bar!, 'Debug.showBounds', ['false', 'true', "'hit'"] as const, (v) => {
      Debug.showBounds = v === 'false' ? false : v === 'true' ? true : 'hit';
      leafer.forceRender();
    }, 'false');
    return stage.dispose;
  }

  // Cards: draw box (green), render (red, includes stroke and shadow) bounds by hand.
  const overlay = new Group({ hittable: false });
  leafer.add(overlay);
  const outline = (b: { x: number; y: number; width: number; height: number }, color: string): Rect => new Rect({ ...b, stroke: color, strokeWidth: 1, hittable: false });
  const draw = (mode: string): void => {
    overlay.clear();
    if (mode === 'off') return;
    for (const s of shapes) {
      overlay.add(outline(s.worldRenderBounds, '#ff4b4b'));
      overlay.add(outline(s.worldBoxBounds, '#0a0'));
    }
  };
  pick(stage, 'showBounds', ['off', 'true'] as const, draw, 1800);
  return stage.dispose;
};

export default mount;
