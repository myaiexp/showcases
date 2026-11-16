// Subclassing: the guide's LabeledRect, written as a v7 class that extends Rect
import { Canvas, classRegistry, Rect, type RectProps } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty, textField } from '../../shared/code-panel.ts';
import { color } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface LabeledRectProps extends RectProps {
  label: string;
  labelColor: string;
}

class LabeledRect extends Rect {
  // `declare` keeps TypeScript from adding a field that would reset the value after super().
  declare label: string;
  declare labelColor: string;

  // The registry key. v7 reads `static type`, not an instance property; keep it unique.
  static override type = 'ShowcaseLabeledRect';
  // A changed label or colour must repaint the cached bitmap.
  static override cacheProperties = [...Rect.cacheProperties, 'label', 'labelColor'];
  // The new defaults. Not named ownDefaults: that static is typed to Rect's own properties.
  static labelDefaults = { label: '', labelColor: '#2b2a33' };

  // getDefaults() is what includeDefaultValues: false compares against.
  static override getDefaults(): Record<string, any> {
    return { ...super.getDefaults(), ...LabeledRect.labelDefaults };
  }

  constructor(options?: Partial<LabeledRectProps>) {
    // Defaults go in before the options: the Rect constructor applies the options itself.
    super({ ...LabeledRect.labelDefaults, ...options });
  }

  // Everything is drawn in the object's own space: (0, 0) is its centre.
  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    ctx.font = '20px sans-serif';
    ctx.fillStyle = this.labelColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, 0, 0, this.width - 8);
  }

  // Adds the new properties to the saved object (see the JSON round trip example).
  // The argument and result are loosely typed, as in the base class.
  override toObject(propertiesToInclude: any[] = []): any {
    return super.toObject([...propertiesToInclude, 'label', 'labelColor']);
  }
}
classRegistry.setClass(LabeledRect);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'toObject()'],
    scene: [160, 200],
    hint: 'A Rect subclass with a label property drawn by an overridden _render. Edit the label, or change the fill, radius and label colour with set().',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);

  const box = new LabeledRect({ left: 80, top: 100, width: 120, height: 60, label: 'test', fill: '#ffb3a7', rx: 6, ry: 6, stroke: '#7a1f17', strokeWidth: 2 });
  canvas.add(box);
  const refresh = (): void => {
    canvas.requestRenderAll();
    const { label, labelColor, fill, rx } = box.toObject();
    show(pretty({ type: 'ShowcaseLabeledRect', label, labelColor, fill, rx }, stage.preview));
    say(`label "${box.label}"`);
  };
  refresh();

  if (stage.bar) {
    textField(stage.bar, 'label', box.label, (v) => (box.set('label', v), refresh()));
    color(stage.bar, 'fill', '#ffb3a7', (v) => (box.set('fill', v), refresh()));
    color(stage.bar, 'label colour', '#2b2a33', (v) => (box.set('labelColor', v), refresh()));
  } else {
    const looks = [['test', '#ffb3a7', 0], ['trololo', '#aab6ff', 20], ['Fabric', '#b9e3b0', 6]] as const;
    let i = 0;
    stage.every(1300, () => {
      const [label, fill, rx] = looks[++i % 3]!;
      box.set({ label, fill, rx, ry: rx });
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
