// One clip binds by node name to three rigs: full, missing a node, rootBone
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addPad, createCreature, jointPath, waveClip } from '../../shared/animation.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, {
    floor: 18,
    orbit: { distance: 11, pitch: -12, yaw: 10, target: new pc.Vec3(0, 1.3, 0), autoRotate: ctx.preview ? 6 : 0 },
  });
  const { app } = scene;

  // One AnimTrack, assigned to every rig below. Its curves name nodes under 'Root'.
  const wave = waveClip();

  // 1. A rig whose nodes all exist: the component sits on the root itself.
  const full = createCreature();
  full.setLocalPosition(-3.4, 0, 0);

  // 2. A rig with no right arm: curves for nodes it cannot find are ignored.
  const missing = createCreature();
  missing.setLocalPosition(0, 0, 0);
  missing.findByName('ArmR')!.destroy();

  // 3. The same rig below a holder: the component is on the holder and rootBone points at the rig.
  const holder = new pc.Entity('Holder');
  holder.setLocalPosition(3.4, 0, 0);
  const nested = createCreature();
  holder.addChild(nested);

  for (const e of [full, missing, holder]) {
    app.root.addChild(e);
    addPad(e);
  }
  full.addComponent('anim', { activate: true });
  missing.addComponent('anim', { activate: true });
  holder.addComponent('anim', { activate: true, rootBone: nested });
  for (const e of [full, missing, holder]) e.anim!.assignAnimation('Wave', wave);

  // Something the missing-arm rig can compare itself with.
  addShape(app.root, 'sphere', material('#e8794a'), [0, 3.3, 0], 0.15, 'marker');

  const addArm = (): void => {
    if (missing.findByName('ArmR')) return;
    const spine = missing.findByName('Spine')!;
    const arm = new pc.Entity('ArmR');
    arm.setLocalPosition(0.38, 0.5, 0);
    addShape(arm, 'box', material('#4ab3e8'), [0, -0.2, 0], [0.14, 0.42, 0.14], 'ArmR mesh');
    const fore = new pc.Entity('ForeR');
    fore.setLocalPosition(0, -0.42, 0);
    addShape(fore, 'box', material('#7fd0f5'), [0, -0.18, 0], [0.12, 0.38, 0.12], 'ForeR mesh');
    arm.addChild(fore);
    spine.addChild(arm);
  };

  if (ctx.preview) {
    let t = 0;
    let added = false;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 3) {
        t = 0;
        if (!added) {
          addArm();
          missing.anim!.rebind();
        } else {
          missing.findByName('ArmR')?.destroy();
          missing.anim!.rebind();
        }
        added = !added;
      }
    });
  } else {
    const panel = createPanel(el);
    panel.readout(`The clip's paths: ${jointPath('ForeR').join('/')} ... all start at the component's own entity`);
    panel.row();
    panel.button('add the missing ArmR node (no rebind yet)', addArm);
    panel.button('anim.rebind()', () => missing.anim!.rebind());
  }
  return () => scene.dispose();
};

export default mount;
