// Appearance: blendMode and visible on a single Paint in a fill array
import { Leafer, Rect, type IBlendMode } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Change how the top gradient layer blends with the red below, or hide it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  let blendMode: IBlendMode = 'multiply';
  let visible = true;
  const paint = (): void => {
    rect.fill = [
      { type: 'solid', color: '#FF4B4B' },
      { type: 'linear', from: 'left', to: 'right', stops: ['#ffffff', '#2b8cff'], blendMode, visible },
    ];
  };
  pick(stage, 'blendMode', ['normal', 'multiply', 'screen', 'overlay', 'difference', 'color-dodge'] as IBlendMode[], (v) => ((blendMode = v), paint()), 1500, blendMode);
  toggle(stage, 'visible', true, (v) => ((visible = v), paint()), 5000);

  return stage.dispose;
};

export default mount;
