// Appearance: per-shadow blendMode and visible over striped paper
import { Leafer, Rect, type IBlendMode } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, toggle } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a blendMode for the shadow, or hide it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage) * 0.7;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.2, fill: '#FEB027' });
  leafer.add(rect);
  let blendMode: IBlendMode = 'normal';
  let visible = true;
  const paint = (): void => {
    rect.shadow = { x: S * 0.25, y: S * 0.25, blur: 8, color: '#ff2bd6', blendMode, visible };
  };
  pick(stage, 'blendMode', ['normal', 'multiply', 'screen', 'difference', 'overlay'] as IBlendMode[], (v) => ((blendMode = v), paint()), 1800);
  toggle(stage, 'visible', true, (v) => ((visible = v), paint()), 6000);

  return stage.dispose;
};

export default mount;
