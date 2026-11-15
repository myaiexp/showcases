// Font.createFromOS: system fonts by name, one TextRenderer each
import { Font, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const FAMILIES = ['Arial', 'Georgia', 'Courier New', 'Times New Roman', 'Verdana', 'Impact', 'monospace', 'serif'];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  FAMILIES.forEach((name, i) => {
    const t = root.createChild(name).addComponent(TextRenderer);
    t.entity.transform.setPosition(i % 2 ? 1.7 : -1.7, 1.4 - Math.floor(i / 2) * 0.85, 0);
    t.font = Font.createFromOS(engine, name);
    t.text = name;
    t.fontSize = 40;
  });
  if (!stage.preview) {
    const big = root.createChild('big').addComponent(TextRenderer);
    big.entity.transform.setPosition(0, -1.75, 0);
    big.font = Font.createFromOS(engine, 'Arial');
    big.text = 'Pick a family: Sphinx of black quartz';
    big.fontSize = 28;
    select(stage.bar, 'bottom line font', FAMILIES, (v) => (big.font = Font.createFromOS(engine, v)));
  }
  return stage.dispose;
};

export default mount;
