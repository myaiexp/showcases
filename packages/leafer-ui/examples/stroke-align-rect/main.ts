// Appearance: strokeAlign inside, center and outside on a Rect
import { Leafer, Rect, type IStrokeAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch strokeAlign and watch the dashed edge." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.set({ fill: '#FEB02755', stroke: '#32cd79', strokeWidth: stage.preview ? 16 : 30 });
  const guide = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12, stroke: '#333', strokeWidth: 1, dashPattern: [4, 4], strokeAlign: 'center', hittable: false });
  leafer.add(guide);
  pick(stage, 'strokeAlign', ['inside', 'center', 'outside'] as IStrokeAlign[], (v) => (rect.strokeAlign = v), 1700);

  return stage.dispose;
};

export default mount;
