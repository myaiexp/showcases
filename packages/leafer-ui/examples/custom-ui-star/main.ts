// Custom: a star built from path attributes
import { Leafer, PathCommandDataHelper, UI, UIData, pathType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const { moveTo, lineTo, closePath } = PathCommandDataHelper;
class MiniStar extends UI {
  override get __tag(): string {
    return 'MiniStar';
  }
  declare points: number;
  declare innerRadius: number;
  override __updatePath(): void {
    const { width, height, points, innerRadius } = this.__ as unknown as Record<string, number>;
    const rx = width! / 2, ry = height! / 2;
    const path: number[] = (this.__.path = []);
    moveTo(path, rx, 0);
    for (let i = 1; i < points! * 2; i++) {
      const r = i % 2 === 0 ? 1 : innerRadius!;
      lineTo(path, rx + rx * r * Math.sin((i * Math.PI) / points!), ry - ry * r * Math.cos((i * Math.PI) / points!));
    }
    closePath(path);
  }
}
class MiniStarData extends UIData {}
MiniStar.registerUI();
MiniStar.registerData(MiniStarData as never);
// pathType: a change recomputes the path (JS form of the docs' @pathType)
MiniStar.addAttr('points', 5, pathType);
MiniStar.addAttr('innerRadius', 0.38, pathType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide points and innerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const custom = new MiniStar({ ...mid(stage, S), width: S, height: S, fill: '#FEB027', draggable: true });
  leafer.add(custom);
  drive(stage, 'points', [3, 12, 1], 5, (v) => (custom.points = v), 8);
  drive(stage, 'innerRadius', [0.1, 0.9, 0.01], 0.38, (v) => (custom.innerRadius = v), 5);

  return stage.dispose;
};

export default mount;
