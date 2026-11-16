// Appearance: a dashed Rect stroke with a moving dashOffset
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Change the dash and gap lengths." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.set({ stroke: '#32cd79', strokeWidth: 3 });
  const dash = { on: 6, off: 6 };
  const apply = (): void => void (rect.dashPattern = [dash.on, dash.off]);
  drive(stage, 'dash', [2, 30, 1], 6, (v) => ((dash.on = v), apply()), 6);
  drive(stage, 'gap', [2, 30, 1], 6, (v) => ((dash.off = v), apply()), 8);
  stage.loop((_dt, t) => (rect.dashOffset = -t * 20));

  return stage.dispose;
};

export default mount;
