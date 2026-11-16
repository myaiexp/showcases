// Subclassing: patch a subclass prototype, so FabricObject and Rect stay untouched
import { Canvas, FabricObject, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'prototypes'],
    scene: [160, 200],
    hint: 'core-concepts shows FabricObject.prototype.someMethod = ... : that changes every object on the page, in every example. Patching a class made for this example reaches only its instances.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);

  // A class per mount, so two open copies of this example never patch each other.
  class Tile extends Rect {
    static override type = 'ShowcaseTile';
  }
  const proto = Tile.prototype as Tile & { describe?: () => string; _render: (ctx: CanvasRenderingContext2D) => void };
  const original = proto._render;
  const plain = new Rect({ left: 80, top: 145, width: 90, height: 50, fill: '#ffd0c7', stroke: '#b55', strokeWidth: 2 });
  const tile = new Tile({ left: 80, top: 55, width: 90, height: 50, fill: '#b9e3b0', stroke: '#2e9e5b', strokeWidth: 2 });
  canvas.add(tile, plain);

  proto.describe = function (this: Tile) {
    return `a Tile at ${Math.round(this.left)}, ${Math.round(this.top)}`;
  };
  const patchRender = (on: boolean): void => {
    // Wrap the inherited drawing: the original runs first, then a corner mark is added.
    proto._render = on
      ? function (this: Tile, c: CanvasRenderingContext2D) {
          original.call(this, c);
          c.fillStyle = '#e94b3c';
          c.fillRect(this.width / 2 - 14, -this.height / 2, 14, 14);
        }
      : original;
    tile.dirty = true; // the cached bitmap still shows the old drawing
    canvas.requestRenderAll();
    refresh();
  };
  const refresh = (): void => {
    const has = (o: object): string => typeof (o as { describe?: unknown }).describe;
    show(
      [
        `Tile.prototype.describe        ${has(Tile.prototype)}`,
        `Rect.prototype.describe        ${has(Rect.prototype)}`,
        `FabricObject.prototype.describe ${has(FabricObject.prototype)}`,
        '',
        `tile.describe()   ${proto.describe!.call(tile)}`,
        `plain rect        ${typeof (plain as { describe?: unknown }).describe}`,
        '',
        `Tile.prototype._render patched: ${proto._render !== original}`,
        `Rect.prototype._render untouched: ${Rect.prototype._render === original}`,
      ].join('\n'),
    );
    say(`corner mark ${proto._render !== original ? 'on' : 'off'}`);
  };
  stage.onDispose(() => (proto._render = original));
  refresh();

  if (stage.bar) checkbox(stage.bar, 'patch Tile.prototype._render (corner mark)', false, patchRender);
  else {
    let on = false;
    stage.every(1500, () => patchRender((on = !on)));
  }

  return stage.dispose;
};

export default mount;
