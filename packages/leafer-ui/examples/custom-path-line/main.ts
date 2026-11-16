// Custom: __updatePath draws an open line
import { Leafer, PathBounds, PathCommandDataHelper, UI, UIData, affectStrokeBoundsType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const { moveTo, lineTo, closePath } = PathCommandDataHelper;
class DiagonalLine extends UI {
  override get __tag(): string {
    return 'DiagonalLine';
  }
  // Drawing a custom path: the data is a flat command array
  override __updatePath(): void {
    const { width, height } = this.__;
    const path: number[] = (this.__.path = []); // like beginPath
    moveTo(path, 0, 0);
    lineTo(path, width as number, height as number);
    closePath(path);
  }
  // Take the bounds from the path itself
  override __updateBoxBounds(): void {
    PathBounds.toBounds(this.__.path as number[], this.__layout.boxBounds);
  }
}
class DiagonalLineData extends UIData {}
DiagonalLine.registerUI();
DiagonalLine.registerData(DiagonalLineData as never);
// An open line is stroked on its centre (UI's default is the inside)
affectStrokeBoundsType('center')(DiagonalLine.prototype, 'strokeAlign');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width and height: the diagonal line follows.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const custom = new DiagonalLine({ stroke: '#FF4B4B', strokeWidth: 6, draggable: true });
  leafer.add(custom);
  const S = size(stage);
  const state = { w: S, h: S * 0.7 };
  const apply = (): void => {
    custom.set({ width: state.w, height: state.h, ...mid(stage, state.w, state.h) });
  };
  drive(stage, 'width', [20, 380, 2], S, (v) => ((state.w = v), apply()), 5);
  drive(stage, 'height', [20, 300, 2], S * 0.7, (v) => ((state.h = v), apply()), 7);

  return stage.dispose;
};

export default mount;
