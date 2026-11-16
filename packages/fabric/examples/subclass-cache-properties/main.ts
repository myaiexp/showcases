// A custom property left out of cacheProperties draws from a stale cache
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

type Opts = ConstructorParameters<typeof Rect>[0];

// The same shape twice: a rect with a dot whose size is the `dot` property.
class Cached extends Rect {
  declare dot: number;
  static override type = 'ShowcaseCachedDot';
  static override cacheProperties = [...Rect.cacheProperties, 'dot']; // set('dot') marks the object dirty
  constructor(options?: object) {
    super({ dot: 10, ...options } as Opts);
  }
  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    ctx.fillStyle = '#e94b3c';
    ctx.beginPath();
    ctx.arc(0, 0, this.dot, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Stale extends Cached {
  static override type = 'ShowcaseStaleDot';
  static override cacheProperties = [...Rect.cacheProperties]; // 'dot' is missing
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['listed', 'not listed'],
    scene: [160, 160],
    hint: 'Both rects get set("dot", n). Fabric redraws from a cached bitmap unless something marks the object dirty: for the right one only a property in cacheProperties does that, or you set dirty yourself.',
  });
  const [pa, pb] = stage.panes as [typeof stage.panes[0], typeof stage.panes[0]];
  const left = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const right = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);
  const say = briefStatus(stage);
  const look = { left: 80, top: 80, width: 120, height: 120, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3 };
  const good = new Cached(look);
  const stale = new Stale(look);
  left.add(good);
  right.add(stale);

  const setDot = (v: number): void => {
    good.set('dot', v);
    stale.set('dot', v);
    left.requestRenderAll();
    right.requestRenderAll();
    say(`dot ${Math.round(v)}, stale dirty: ${stale.dirty}`);
  };
  const refreshStale = (): void => {
    stale.dirty = true;
    right.requestRenderAll();
    say('stale.dirty = true');
  };

  if (stage.bar) {
    slider(stage.bar, 'dot', 4, 55, 1, 10, setDot);
    button(stage.bar, 'mark the right one dirty', refreshStale);
  } else {
    stage.every(1000, () => setDot(8 + Math.random() * 45));
    stage.every(6000, refreshStale);
  }

  return stage.dispose;
};

export default mount;
