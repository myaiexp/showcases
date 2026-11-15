// Hair card edges: an alphaCutoff + alphaDither core and a blendMode 'blend' flyaway layer
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, HairMaterial, Mesh, Scene, SceneNode, SphereShape } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { hairCards } from '../../shared/char-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const camera = animScene(scene, { eye: new Vector3(0.9, 1.1, 2.1), target: new Vector3(0, 0.65, 0), floorSize: 3, shadows: false });
  const lamp = new DirectionalLight(scene);
  lamp.intensity = 4;
  const headGroup = new SceneNode(scene);
  headGroup.position.setXYZ(0, 0.55, 0);
  const scalp = new Mesh(scene, new SphereShape({ radius: 0.5 }), flat(0.78, 0.55, 0.45));
  scalp.parent = headGroup;

  // The opaque core: pixels under the cutoff are discarded, and dither turns the edge into a
  // pattern that TAA averages into soft edges
  const coreMat = new HairMaterial();
  coreMat.vertexColor = true;
  coreMat.cullMode = 'none';
  coreMat.alphaCutoff = 0.4;
  coreMat.alphaDither = true;
  const core = new Mesh(scene, hairCards({ color: [0.5, 0.28, 0.12] }), coreMat);

  // The outer flyaway layer: wider, longer, standing off the scalp, alpha blended
  const flyMat = new HairMaterial();
  flyMat.vertexColor = true;
  flyMat.cullMode = 'none';
  flyMat.blendMode = 'blend';
  const fly = new Mesh(scene, hairCards({ color: [0.62, 0.38, 0.18], width: 0.28, puff: 0.45, sweep: 1.15, twist: 0.12, perRing: 16 }), flyMat);

  core.parent = headGroup;
  fly.parent = headGroup;
  camera.TAA = true;
  const describe = (): void => {
    stage.caption(`core: alphaCutoff ${coreMat.alphaCutoff.toFixed(2)}, alphaDither ${coreMat.alphaDither}; flyaway: blendMode '${flyMat.blendMode}'`);
  };
  describe();
  if (stage.bar) {
    slider(stage.bar, 'core alphaCutoff', [0, 0.95, 0.01], coreMat.alphaCutoff, (v) => ((coreMat.alphaCutoff = v), describe()));
    toggle(stage.bar, 'core alphaDither', true, (v) => ((coreMat.alphaDither = v), describe()));
    toggle(stage.bar, 'camera.TAA', true, (v) => (camera.TAA = v));
    toggle(stage.bar, 'core visible', true, (v) => (core.showState = v ? 'visible' : 'hidden'));
    toggle(stage.bar, "flyaway layer ('blend')", true, (v) => (fly.showState = v ? 'visible' : 'hidden'));
  } else {
    stage.every(2500, (i) => {
      fly.showState = i % 2 ? 'hidden' : 'visible';
      coreMat.alphaDither = i % 4 < 2;
      describe();
    });
  }
  myApp.on('tick', (_dt: number, elapsed: number) => {
    const a = elapsed / 1800;
    lamp.lookAt(new Vector3(2 * Math.cos(a), 1.2, 2 * Math.sin(a)), Vector3.zero(), Vector3.axisPY());
  });
  myApp.run();
});
