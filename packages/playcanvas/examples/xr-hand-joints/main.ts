// XrHand joints: a cube per joint sized by radius, bones, pinch, tracking loss
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';
import { SimHand, type JointLike } from './hand.ts';

const FINGER_COLOURS = ['#f472b6', '#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8'];

/** One entity per joint, as the hand-tracking page builds it, plus bones between neighbours. */
class HandView {
  readonly entities: pc.Entity[] = [];
  readonly root: pc.Entity;
  private app: pc.AppBase;
  private joints: readonly JointLike[];
  constructor(app: pc.AppBase, joints: readonly JointLike[]) {
    this.app = app;
    this.joints = joints;
    this.root = new pc.Entity('hand-view');
    app.root.addChild(this.root);
    for (const j of joints) {
      const colour = j.wrist ? '#e8ebf2' : FINGER_COLOURS[j.finger] ?? '#fff';
      const e = xrShape(this.root, 'box', xrMaterial(colour, j.tip ? { emissive: new pc.Color().fromString(colour) } : {}), [0, 0, 0]);
      this.entities.push(e);
    }
  }
  update(): void {
    this.joints.forEach((joint, i) => {
      const e = this.entities[i]!;
      const r = joint.radius * 2;
      e.setLocalScale(r, r, r);
      e.setPosition(joint.getPosition());
      if (i > 0) {
        const prev = this.joints[joint.finger === this.joints[i - 1]!.finger ? i - 1 : 0]!;
        this.app.drawLine(prev.getPosition(), joint.getPosition(), new pc.Color(0.85, 0.88, 0.95));
      }
    });
  }
  set visible(on: boolean) {
    this.root.enabled = on;
  }
  destroy(): void {
    this.root.destroy();
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 1.1, -0.5), distance: 0.9, pitch: -25, yaw: 15 });
  const { app } = scene;
  const state = { animate: true, curl: 0, pinch: 0, tracking: true };

  // The simulated hand hangs off an entity, so it can sway like a raised hand.
  const handRoot = new pc.Entity('hand');
  app.root.addChild(handRoot);
  handRoot.setPosition(0, 1.1, -0.5);
  const sim = new SimHand(handRoot);
  const view = new HandView(app, sim.joints);
  let live: pc.XrHand | null = null;
  let liveView: HandView | null = null;

  const readout = ctx.preview ? null : createPanel(el);
  const info = readout?.readout('');
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (liveView && live) {
      liveView.visible = live.tracking;
      liveView.update();
    } else {
      if (state.animate) {
        state.curl = 0.5 - 0.5 * Math.cos(t * 0.9);
        state.pinch = Math.max(0, Math.sin(t * 0.9 - 2.4)) * (state.curl < 0.35 ? 1 : 0.2);
        if (state.pinch > 0.01) state.curl = Math.min(state.curl, 0.3);
      }
      handRoot.setLocalEulerAngles(-70, Math.sin(t * 0.4) * 30, 0);
      sim.pose(state.curl, state.pinch);
      view.visible = state.tracking;
      view.update();
    }
    if (info) {
      const d = sim.pinchDistance();
      info.textContent = live
        ? `real hand: tracking ${live.tracking}, ${live.joints.length} joints`
        : `simulated hand: ${sim.joints.length} joints, thumb to index ${(d * 100).toFixed(1)} cm${d < 0.02 ? ' (pinch = select)' : ''}`;
    }
  });

  // The real path: when an input source brings a hand, build the same view from its joints.
  const onAdd = (source: pc.XrInputSource): void => {
    if (!source.hand) return;
    const hand = source.hand;
    live = hand;
    view.visible = false;
    const adapted: JointLike[] = hand.joints.map((j) => ({
      id: j.id,
      radius: j.radius,
      tip: j.isTip,
      wrist: j.isWrist,
      finger: j.finger?.index ?? -1,
      getPosition: () => j.getPosition(),
    }));
    liveView = new HandView(app, adapted);
    source.once('remove', () => {
      liveView?.destroy();
      liveView = null;
      live = null;
      view.visible = true;
    });
  };
  app.xr?.input.on('add', onAdd);

  let entry: XrEntryHandle | null = null;
  if (readout) {
    readout.check('animate', true, (on) => (state.animate = on));
    readout.slider('curl', 0, 1, 0.01, 0, (v) => ((state.animate = false), (state.curl = v)));
    readout.slider('pinch', 0, 1, 0.01, 0, (v) => ((state.animate = false), (state.pinch = v)));
    readout.check('tracking', true, (on) => (state.tracking = on));
    entry = addXrEntry(el, readout, scene, [{ type: pc.XRTYPE_VR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter VR'  }]);
  }
  return () => {
    app.xr?.input.off('add', onAdd);
    entry?.dispose();
    liveView?.destroy();
    view.destroy();
    scene.dispose();
  };
};

export default mount;
