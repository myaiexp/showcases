// Image tracking: a registered marker, its pose and tracked/emulated states
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { transparentInAr } from '../../shared/xr-ar.ts';
import { canvasTexture } from '../../shared/textures.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

const WIDTH = 0.2; // the printed marker is 20 cm wide

/** The members of XrTrackedImage the visual reads; SimTracked provides the same. */
interface TrackedLike {
  readonly trackable: boolean;
  readonly tracking: boolean;
  readonly emulated: boolean;
  getPosition(): pc.Vec3;
  getRotation(): pc.Quat;
  on(event: string, fn: () => void): unknown;
}

/** Tracked for a few seconds while the card moves, then lost: the pose stays at its last value. */
class SimTracked extends pc.EventHandler implements TrackedLike {
  readonly trackable = true;
  tracking = true;
  private position = new pc.Vec3(0, 0.01, -1.2);
  private rotation = new pc.Quat();
  private t = 0;
  get emulated(): boolean {
    return !this.tracking;
  }
  getPosition(): pc.Vec3 {
    return this.position;
  }
  getRotation(): pc.Quat {
    return this.rotation;
  }
  step(dt: number): void {
    this.t += dt;
    const cycle = this.t % 7;
    const tracking = cycle < 4.5;
    if (tracking !== this.tracking) {
      this.tracking = tracking;
      this.fire(tracking ? 'tracked' : 'untracked');
    }
    if (tracking) {
      this.position.set(Math.sin(this.t * 0.7) * 0.5, 0.01, -1.2 + Math.cos(this.t * 0.5) * 0.25);
      this.rotation.setFromEulerAngles(0, Math.sin(this.t * 0.6) * 40, 0);
    }
  }
}

/** A marker made of shapes the vision system can latch on to: no repeating pattern. */
const drawMarker = (g: CanvasRenderingContext2D, size: number): void => {
  g.fillStyle = '#f4efe4';
  g.fillRect(0, 0, size, size);
  g.fillStyle = '#22252e';
  g.fillRect(size * 0.08, size * 0.08, size * 0.4, size * 0.25);
  g.beginPath();
  g.arc(size * 0.7, size * 0.3, size * 0.16, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.moveTo(size * 0.1, size * 0.9);
  g.lineTo(size * 0.45, size * 0.45);
  g.lineTo(size * 0.62, size * 0.9);
  g.fill();
  g.fillStyle = '#c4452d';
  g.fillRect(size * 0.68, size * 0.62, size * 0.22, size * 0.3);
};

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.3, -1.2), distance: 2.6, pitch: -32, autoRotate: 0, interactive: false, yaw: 15 });
  const { app, camera } = scene;
  const marker = canvasTexture(app.graphicsDevice, drawMarker, { size: 256, name: 'marker' });
  const material = xrMaterial('#ffffff', { diffuseMap: marker });
  material.update();

  const card = xrShape(app.root, 'box', material, [0, 0, 0], [WIDTH * 2, 0.004, WIDTH * 2]);
  const cube = xrShape(app.root, 'box', xrMaterial('#4ab3e8'), [0, 0, 0], 0.1);
  const glow = xrMaterial('#4ab3e8');
  cube.render!.material = glow;

  // The real registration, before any session: the image and its width in metres.
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 300;
  drawMarker(canvas.getContext('2d')!, 300);
  const registered = app.xr?.imageTracking.supported && !app.xr.active ? app.xr.imageTracking.add(canvas, WIDTH) : null;

  const sim = new SimTracked();
  let events = 0;
  const count = (): void => void events++;
  sim.on('tracked', count);
  sim.on('untracked', count);
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => new pc.Vec3(x! * WIDTH, 0, z! * WIDTH));
  const a = new pc.Vec3();
  const b = new pc.Vec3();
  const quat = new pc.Quat();
  const follow = (tracked: TrackedLike): void => {
    const p = tracked.getPosition();
    quat.copy(tracked.getRotation());
    cube.setPosition(p.x, p.y + 0.12, p.z);
    cube.setRotation(quat);
    glow.emissive = tracked.tracking ? new pc.Color(0.1, 0.5, 0.7) : new pc.Color(0, 0, 0);
    glow.update();
    for (let i = 0; i < 4; i++) {
      quat.transformVector(corners[i]!, a).add(p);
      quat.transformVector(corners[(i + 1) % 4]!, b).add(p);
      app.drawLine(a, b, tracked.tracking ? new pc.Color(0.3, 1, 0.5) : new pc.Color(1, 0.8, 0.2));
    }
  };

  let live: TrackedLike | null = registered;
  app.on('update', (dt: number) => {
    const real = !!live && !!app.xr?.active && live.trackable;
    if (!real) {
      sim.step(dt);
      card.setPosition(sim.getPosition());
      card.setRotation(sim.getRotation());
      follow(sim);
    } else {
      card.enabled = false;
      follow(live!);
    }
  });

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      const t = live && app.xr?.active ? live : sim;
      info.textContent = `${t === sim ? 'simulated' : 'real'}: tracking ${t.tracking}, emulated ${t.emulated}, trackable ${t.trackable}, tracked/untracked events ${events}; imageTracking.supported ${!!app.xr?.imageTracking.supported}`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR', options: { imageTracking: true } }]);
  }
  return () => {
    undoClear();
    if (registered && app.xr?.imageTracking.images.includes(registered as pc.XrTrackedImage)) app.xr.imageTracking.remove(registered as pc.XrTrackedImage);
    live = null;
    entry?.dispose();
    marker.destroy();
    scene.dispose();
  };
};

export default mount;
