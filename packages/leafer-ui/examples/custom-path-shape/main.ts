// Custom: __updatePath draws a closed shape
import { Leafer, PathBounds, PathCommandDataHelper, UI, UIData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const { moveTo, lineTo, closePath } = PathCommandDataHelper;
class ArrowShape extends UI {
  override get __tag(): string {
    return 'ArrowShape';
  }
  override __updatePath(): void {
    const { width, height } = this.__;
    const w = width as number, h = height as number;
    const path: number[] = (this.__.path = []);
    moveTo(path, 0, 0);
    lineTo(path, w, h / 2);
    lineTo(path, 0, h);
    closePath(path);
  }
  override __updateBoxBounds(): void {
    PathBounds.toBounds(this.__.path as number[], this.__layout.boxBounds);
  }
}
class ArrowShapeData extends UIData {}
ArrowShape.registerUI();
ArrowShape.registerData(ArrowShapeData as never);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width and height: the arrow stretches.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const custom = new ArrowShape({ fill: '#4B8BFF', draggable: true });
  leafer.add(custom);
  const S = size(stage);
  const state = { w: S, h: S };
  const apply = (): void => {
    custom.set({ width: state.w, height: state.h, ...mid(stage, state.w, state.h) });
  };
  drive(stage, 'width', [20, 380, 2], S, (v) => ((state.w = v), apply()), 5);
  drive(stage, 'height', [20, 300, 2], S, (v) => ((state.h = v), apply()), 7);

  return stage.dispose;
};

export default mount;
