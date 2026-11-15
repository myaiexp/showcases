// isActive switches a subtree off, as isActiveInHierarchy reports
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Switch the group and the middle cube; the child follows its parent.' });
  const { engine, root } = stage;
  lit(stage, [0, 2, 8]);
  const group = root.createChild('group');
  const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const kids = ([-2.4, 0, 2.4] as const).map((x, i) => solid(group, mesh, phong(engine, [PALETTE.red, PALETTE.green, PALETTE.blue][i]!), [x, 0, 0], `cube ${i + 1}`));
  const info = panel(stage);
  const auto = { on: true };
  const boxes: HTMLInputElement[] = [];
  if (!stage.preview) {
    boxes.push(checkbox(stage.bar, 'group.isActive', true, (v) => ((auto.on = false), (group.isActive = v))));
    boxes.push(checkbox(stage.bar, 'cube 2.isActive', true, (v) => ((auto.on = false), (kids[1]!.isActive = v))));
  }
  tick(root, (_dt, t) => {
    if (auto.on) {
      const phase = Math.floor(t / 1.6) % 3;
      group.isActive = phase !== 1;
      kids[1]!.isActive = phase !== 2;
      if (boxes[0]) boxes[0].checked = group.isActive;
      if (boxes[1]) boxes[1].checked = kids[1]!.isActive;
    }
    kids.forEach((k, i) => k.transform.setRotation(t * 30 + i * 40, t * 45, 0));
    info.text([group, ...kids].map((e) => `${e.name.padEnd(8)} isActive ${String(e.isActive).padEnd(5)} inHierarchy ${e.isActiveInHierarchy}`).join('\n'));
  });
  return stage.dispose;
};

export default mount;
