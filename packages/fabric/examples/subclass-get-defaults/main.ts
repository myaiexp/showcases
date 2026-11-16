// getDefaults() says what counts as a default when includeDefaultValues is false
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

const CHIP = { width: 90, height: 36, fill: '#2e9e5b', rx: 12, ry: 12, stroke: '#14532d', strokeWidth: 2 };
const asRect = (o: object): ConstructorParameters<typeof Rect>[0] => o as ConstructorParameters<typeof Rect>[0];

// Both classes look the same; only the first one tells fabric about its defaults.
class Chip extends Rect {
  static override type = 'ShowcaseChip';
  static override getDefaults(): Record<string, any> {
    return { ...super.getDefaults(), ...CHIP };
  }
  constructor(options?: object) {
    super(asRect({ ...CHIP, ...options }));
  }
}
class SilentChip extends Rect {
  static override type = 'ShowcaseSilentChip';
  constructor(options?: object) {
    super(asRect({ ...CHIP, ...options }));
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'toObject of each'],
    scene: [160, 200],
    hint: 'Both chips get the same look from the constructor. With includeDefaultValues off, the one whose class overrides getDefaults() is written as a short object; the other lists every value that differs from Rect.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.includeDefaultValues = false;

  const a = new Chip({ left: 80, top: 55 });
  const b = new SilentChip({ left: 80, top: 145 });
  canvas.add(a, b);

  const refresh = (): void => {
    const [oa, ob] = canvas.toObject().objects as Record<string, unknown>[];
    show(`Chip (getDefaults)\n${pretty(oa, stage.preview)}\n\nSilentChip\n${pretty(ob, stage.preview)}`);
    say(`${Object.keys(oa!).length} keys against ${Object.keys(ob!).length}`);
  };
  refresh();

  const fills = ['#2e9e5b', '#e94b3c', '#3b7dd8'];
  let i = 0;
  stage.every(stage.preview ? 1500 : 1800, () => {
    const fill = fills[++i % 3]!;
    a.set('fill', fill);
    b.set('fill', fill);
    canvas.requestRenderAll();
    refresh();
  });

  return stage.dispose;
};

export default mount;
