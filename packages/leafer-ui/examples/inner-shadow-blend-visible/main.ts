// Appearance: per-effect blendMode and visible on an innerShadow
import { Leafer, Rect, type IBlendMode } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a blendMode, or hide the shadow." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.3, fill: '#32cd79' });
  leafer.add(rect);
  let blendMode: IBlendMode = 'normal';
  let visible = true;
  const paint = (): void => {
    rect.innerShadow = { x: 10, y: 5, blur: 20, color: '#FF0000AA', blendMode, visible };
  };
  pick(stage, 'blendMode', ['normal', 'multiply', 'screen', 'difference', 'overlay'] as IBlendMode[], (v) => ((blendMode = v), paint()), 1800);
  toggle(stage, 'visible', true, (v) => ((visible = v), paint()), 6000);

  return stage.dispose;
};

export default mount;
