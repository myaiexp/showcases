// Resources owned through DRef: swapping with set() frees the old one on the next frame
import { Disposable, DRef, DWeakRef, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, BoxShape, getDevice, DirectionalLight, getEngine, LambertMaterial, Mesh, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

const log: string[] = [];
let frame = 0;
function note(line: string): void {
  log.push(`frame ${frame}: ${line}`);
  if (log.length > 12) log.shift();
}

/** A resource of our own: a striped texture. Its cleanup lives in onDispose, never called directly. */
class Swatch extends Disposable {
  readonly texture: DRef<Texture2D>;
  readonly name: string;
  constructor(name: string, rgb: [number, number, number]) {
    super();
    this.name = name;
    const device = getDevice();
    const tex = device.createTexture2D('rgba8unorm', 64, 64)!;
    const px = new Uint8Array(64 * 64 * 4);
    for (let i = 0; i < 64 * 64; i++) {
      const stripe = ((i % 64) + Math.floor(i / 64)) % 16 < 8 ? 1 : 0.35;
      px.set([rgb[0] * stripe, rgb[1] * stripe, rgb[2] * stripe, 255], i * 4);
    }
    tex.update(px, 0, 0, 64, 64);
    // The swatch owns its texture through a strong reference of its own
    this.texture = new DRef(tex);
    note(`${name} created`);
  }
  protected override onDispose(): void {
    // Runs when the last DRef lets go, on the following frame. Release what we own.
    this.texture.dispose();
    note(`${this.name}.onDispose(): texture released`);
  }
}

const COLORS: [string, [number, number, number]][] = [
  ['red', [230, 70, 60]],
  ['green', [70, 200, 90]],
  ['blue', [70, 120, 240]],
  ['gold', [240, 190, 60]],
];

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());
  const material = new LambertMaterial();
  const cube = new Mesh(scene, new BoxShape({ size: 1.6 }), material);
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 1.8, 4), Vector3.zero(), Vector3.axisPY());
  getEngine().setRenderable(scene, 0);

  // One strong reference holds the current swatch; a weak one watches the previous swatch
  const current = new DRef<Swatch>();
  let previous = new DWeakRef<Swatch>();
  const out = stage.readout();
  const show = (): void => {
    const p = previous.get();
    const lines = [...log, '', `previous (DWeakRef).get(): ${p ? p.name : 'null'}`];
    if (out) out.textContent = lines.join('\n');
    stage.caption(log[log.length - 1] ?? '');
  };
  const swap = (i: number): void => {
    const [name, rgb] = COLORS[i % COLORS.length]!;
    previous = new DWeakRef(current.get());
    // set() takes a count on the new swatch and drops one on the old: it is freed next frame
    current.set(new Swatch(name, rgb));
    material.albedoTexture = current.get()!.texture.get();
    note(`current.set(${name})`);
  };
  swap(0);
  myApp.on('tick', (dt) => {
    frame++;
    cube.rotation.fromEulerAngle(0.4, frame * 0.01, 0);
    show();
  });
  stage.every(2200, swap);
  stage.own(() => current.dispose());
  myApp.run();
});
