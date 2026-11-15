// Hair strands (HairStrandData + HairStrandMaterial) next to hair cards: strands are not drawn on WebGL2
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoundingBox,
  DirectionalLight,
  getDevice,
  HairMaterial,
  HairStrandData,
  HairStrandMaterial,
  isHairSimulationSupported,
  Mesh,
  Primitive,
  Scene,
  SceneNode,
  SphereShape,
} from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { hairCards } from '../../shared/char-kit.ts';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(0, 1.2, 3.6), target: new Vector3(0, 0.65, 0), floorSize: 5, shadows: false });
  const lamp = new DirectionalLight(scene);
  lamp.intensity = 4;
  lamp.lookAt(new Vector3(1.5, 2, 2.5), Vector3.zero(), Vector3.axisPY());
  lamp.castShadow = true;

  const skin = flat(0.78, 0.55, 0.45);
  const headGroup = new SceneNode(scene);
  headGroup.position.setXYZ(0, 0.55, 0);
  // Left: hair cards, a regular Mesh with HairMaterial
  const left = new Mesh(scene, new SphereShape({ radius: 0.5 }), skin);
  left.position.setXYZ(-0.8, 0, 0);
  left.parent = headGroup;
  const cardMat = new HairMaterial();
  cardMat.vertexColor = true;
  cardMat.cullMode = 'none';
  cardMat.alphaCutoff = 0.35;
  const cards = new Mesh(scene, hairCards(), cardMat);
  cards.position.setXYZ(-0.8, 0, 0);
  cards.parent = headGroup;

  // Right: the same hair as strands. Control points go in a flat array, a count per strand
  const right = new Mesh(scene, new SphereShape({ radius: 0.5 }), skin);
  right.position.setXYZ(0.8, 0, 0);
  right.parent = headGroup;
  const STRANDS = stage.preview ? 120 : 400;
  const POINTS = 8;
  const positions = new Float32Array(STRANDS * POINTS * 3);
  const pointCounts = new Int32Array(STRANDS).fill(POINTS);
  const widths = new Float32Array(STRANDS * POINTS).fill(0.004);
  const uv = new Float32Array(STRANDS * 2);
  for (let s = 0; s < STRANDS; s++) {
    // Fibonacci spiral over the upper-back of the head
    const t = (s + 0.5) / STRANDS;
    const alpha = 0.15 + t * 1.5;
    const theta = s * 2.39996;
    for (let p = 0; p < POINTS; p++) {
      const a = alpha + (p / (POINTS - 1)) * 0.8;
      const r = 0.52 + 0.1 * (p / (POINTS - 1)) ** 1.5;
      positions.set([0.8 + r * Math.sin(a) * Math.cos(theta), r * Math.cos(a), r * Math.sin(a) * Math.sin(theta)], (s * POINTS + p) * 3);
    }
    uv.set([t, 0], s * 2);
  }
  const strandMat = new HairStrandMaterial();
  strandMat.strands = new HairStrandData({ positions, pointCounts, widths, uv, scale: 1 });
  // Strand geometry is expanded on the GPU, but a Primitive is still needed to issue the draw
  const primitive = new Primitive();
  primitive.createAndSetVertexBuffer('position_f32x3', new Float32Array(3));
  primitive.indexCount = strandMat.vertexCount;
  primitive.primitiveType = 'triangle-list';
  // Without a bounding volume the strands would be culled even where they are drawn
  primitive.setBoundingVolume(new BoundingBox(new Vector3(0, -0.8, -0.8), new Vector3(1.6, 0.8, 0.8)));
  const strands = new Mesh(scene, primitive, strandMat);
  strands.parent = headGroup;

  const out = stage.readout();
  const show = (): void => {
    if (out) {
      out.textContent = `backend: ${getDevice().type}   isHairSimulationSupported(): ${isHairSimulationSupported()}   light.shadow.mode: '${lamp.shadow.mode}'\nleft: hair cards (drawn)   right: ${strandMat.strands?.strandCount ?? 0} strands (not drawn on WebGL2; the node and its data are kept)`;
    }
    stage.caption(`cards drawn, strands not drawn (${getDevice().type})`);
  };
  show();
  void strands;
  if (stage.bar) {
    // Asking for the WebGPU-only deep opacity map: the engine logs a warning and uses pcf
    select(stage.bar, 'light.shadow.mode', ['pcf', 'dom'] as const, 'pcf', (v) => {
      lamp.shadow.mode = v;
      show();
    });
  }
  myApp.run();
});
