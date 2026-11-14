// Input source properties: handedness, ray mode, profiles, grip, gamepad
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

/** The fields of XrInputSource this example reads; the simulation fills the same shape. */
interface SourceInfo {
  readonly handedness: string;
  readonly targetRayMode: string;
  readonly profiles: readonly string[];
  readonly grip: boolean;
  readonly gamepad: { readonly buttons: readonly { value: number }[]; readonly axes: readonly number[] } | null;
}
interface SimPad {
  buttons: { value: number }[];
  axes: number[];
}

interface Model {
  info: SourceInfo;
  root: pc.Entity;
  trigger: pc.Entity;
  stick: pc.Entity;
  line: HTMLElement | null;
  /** Set for a real input source: the model follows its grip pose. */
  source?: pc.XrInputSource;
}

const simSource = (handedness: string, pad: SimPad): SourceInfo => ({
  handedness,
  targetRayMode: pc.XRTARGETRAY_POINTER,
  profiles: ['oculus-touch-v2', 'generic-trigger-squeeze-thumbstick'],
  grip: true,
  gamepad: pad,
});

const describe = (s: SourceInfo): string => {
  const pad = s.gamepad ? `trigger ${s.gamepad.buttons[0]?.value.toFixed(2)}, squeeze ${s.gamepad.buttons[1]?.value.toFixed(2) ?? 'n/a'}` : 'no gamepad';
  const touch = s.profiles.includes('oculus-touch-v2') ? ' (Oculus Touch)' : '';
  return `${s.handedness || 'none'} | ray: ${s.targetRayMode} | grip: ${s.grip} | profile: ${s.profiles[0] ?? '-'}${touch} | ${pad}`;
};

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 1, -0.8), distance: 1.8, pitch: -20 });
  const { app } = scene;
  const panel = ctx.preview ? null : createPanel(el);
  let models: Model[] = [];

  const build = (info: SourceInfo, x: number): Model => {
    const root = new pc.Entity('controller');
    app.root.addChild(root);
    root.setPosition(x, 1, -0.8);
    xrShape(root, 'box', xrMaterial(info.handedness === 'left' ? '#4ab3e8' : '#f2a14e'), [0, 0, 0], [0.05, 0.04, 0.16]);
    const trigger = xrShape(root, 'box', xrMaterial('#e8ebf2'), [0, -0.03, -0.03], [0.02, 0.03, 0.04]);
    const stick = xrShape(root, 'sphere', xrMaterial('#161820'), [0, 0.03, 0.03], 0.025);
    panel?.row();
    return { info, root, trigger, stick, line: panel ? panel.readout('') : null };
  };
  const drop = (m: Model): void => {
    m.root.destroy();
    m.line?.remove();
  };

  // The simulated pair a headset with Touch controllers would report.
  const pads: SimPad[] = [0, 1].map(() => ({ buttons: [{ value: 0 }, { value: 0 }], axes: [0, 0, 0, 0] }));
  let simulated = true;
  models = [build(simSource('left', pads[0]!), -0.2), build(simSource('right', pads[1]!), 0.2)];

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (simulated) {
      // A trigger and squeeze that pulse, a thumbstick that circles.
      pads.forEach((g, i) => {
        g.buttons[0]!.value = Math.max(0, Math.sin(t * 2 + i * 2));
        g.buttons[1]!.value = Math.max(0, Math.sin(t * 1.3 + i));
        g.axes[2] = Math.cos(t + i) * 0.8;
        g.axes[3] = Math.sin(t + i) * 0.8;
      });
    }
    for (const m of models) {
      const pos = m.source?.getPosition();
      if (pos) {
        m.root.setPosition(pos);
        m.root.setRotation(m.source!.getRotation()!);
      }
      const g = m.info.gamepad;
      if (g) {
        m.trigger.setLocalEulerAngles((g.buttons[0]?.value ?? 0) * 35, 0, 0);
        m.stick.setLocalPosition((g.axes[2] ?? 0) * 0.015, 0.03, 0.03 + (g.axes[3] ?? 0) * 0.015);
        m.root.setLocalScale(1 + (g.buttons[1]?.value ?? 0) * 0.15, 1, 1);
      }
      if (m.line) m.line.textContent = describe(m.info);
    }
  });

  // The real path: a model per input source as it is added, read live from the source.
  const onAdd = (source: pc.XrInputSource): void => {
    if (simulated) {
      simulated = false;
      models.forEach(drop);
      models = [];
    }
    const live = build(source, models.length * 0.4 - 0.2);
    live.source = source;
    models.push(live);
    source.once('remove', () => {
      drop(live);
      models = models.filter((m) => m !== live);
    });
  };
  app.xr?.input.on('add', onAdd);

  let entry: XrEntryHandle | null = null;
  if (panel) {
    panel.row();
    panel.readout('Simulated: a left and a right Touch controller. A real session lists whatever the platform reports.');
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_VR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter VR' }]);
  }
  return () => {
    app.xr?.input.off('add', onAdd);
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
