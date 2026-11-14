// Clips that animate light colour, intensity and rotation, cross-faded
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const spots = ['spotL', 'spotR'];

function quat(x: number, y: number, z: number): number[] {
  const q = new pc.Quat().setFromEulerAngles(x, y, z);
  return [q.x, q.y, q.z, q.w];
}

/** Builds the two clips by hand, so the property paths are visible. */
function buildClips(): { steady: pc.AnimTrack; flash: pc.AnimTrack } {
  const make = (name: string, duration: number, colour: number[], intensity: number[], sway: number, step: boolean): pc.AnimTrack => {
    const times = [0, duration / 2, duration];
    const inputs = [new pc.AnimData(1, times)];
    const outputs: pc.AnimData[] = [];
    const curves: pc.AnimCurve[] = [];
    const interp = step ? pc.INTERPOLATION_STEP : pc.INTERPOLATION_LINEAR;
    spots.forEach((spot, i) => {
      const dir = i === 0 ? 1 : -1;
      const base = outputs.length;
      outputs.push(
        // A Color property has four components: r, g, b and a.
        new pc.AnimData(4, [...colour, 1, ...colour, 1, ...colour, 1]),
        new pc.AnimData(1, intensity),
        new pc.AnimData(4, [...quat(sway * dir, 0, 0), ...quat(-sway * dir, 0, sway), ...quat(sway * dir, 0, 0)]),
      );
      curves.push(
        new pc.AnimCurve([{ entityPath: ['rig', spot], component: 'light', propertyPath: ['color'] }], 0, base, interp),
        new pc.AnimCurve([{ entityPath: ['rig', spot], component: 'light', propertyPath: ['intensity'] }], 0, base + 1, interp),
        new pc.AnimCurve([{ entityPath: ['rig', spot], component: 'graph', propertyPath: ['localRotation'] }], 0, base + 2, pc.INTERPOLATION_LINEAR),
      );
    });
    return new pc.AnimTrack(name, duration, inputs, outputs, curves);
  };
  return {
    steady: make('steady', 4, [0.2, 1, 0.4], [2, 2, 2], 18, false),
    flash: make('flash', 0.8, [1, 0.15, 0.1], [4, 0, 4], 30, true),
  };
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, sun: false, ambient: '#101218', orbit: { distance: 10, pitch: -35, target: new pc.Vec3(0, 1, 0) } });
  const { app } = scene;

  const rig = new pc.Entity('rig');
  app.root.addChild(rig);
  spots.forEach((name, i) => {
    const e = new pc.Entity(name);
    e.addComponent('light', { type: 'spot', range: 14, innerConeAngle: 18, outerConeAngle: 34, intensity: 2, color: new pc.Color(0.2, 1, 0.4) });
    e.setLocalPosition(i ? 2.2 : -2.2, 5, 0);
    rig.addChild(e);
    addShape(e, 'cone', material('#5a6070'), [0, 0, 0], [0.5, 0.5, 0.5], `${name} housing`).setLocalEulerAngles(180, 0, 0);
  });
  // Something to light.
  for (const x of [-3, 0, 3]) addShape(app.root, 'cylinder', material('#c9ccd6'), [x, 0.6, 0], [0.9, 1.2, 0.9], 'post');

  const clips = buildClips();
  rig.addComponent('anim', { activate: true });
  rig.anim!.assignAnimation('steady', clips.steady);
  rig.anim!.assignAnimation('flash', clips.flash);

  const layer = rig.anim!.baseLayer!;
  const to = (name: string): void => layer.transition(name, 0.6);
  if (ctx.preview) {
    let t = 0;
    let on = false;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2.8) {
        t = 0;
        on = !on;
        to(on ? 'flash' : 'steady');
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => {
      out.textContent = `active state: ${layer.activeState} | transitioning: ${layer.transitioning}`;
    });
    panel.row();
    panel.button("transition('flash', 0.6)", () => to('flash'));
    panel.button("transition('steady', 0.6)", () => to('steady'));
    panel.button("play('flash') (cut)", () => layer.play('flash'));
  }
  return () => scene.dispose();
};

export default mount;
