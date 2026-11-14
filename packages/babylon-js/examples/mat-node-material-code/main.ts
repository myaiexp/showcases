// A NodeMaterial graph built block by block in code, uniform at runtime
import {
  ArcRotateCamera,
  Color4,
  FragmentOutputBlock,
  HemisphericLight,
  InputBlock,
  LerpBlock,
  MeshBuilder,
  NodeMaterial,
  NodeMaterialSystemValues,
  TransformBlock,
  Vector3,
  VertexOutputBlock,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 6, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  const nodeMaterial = new NodeMaterial('node material', scene, { emitComments: true });

  // Vertex: position attribute × world × viewProjection → VertexOutput.
  const positionInput = new InputBlock('position');
  positionInput.setAsAttribute('position');
  const worldInput = new InputBlock('world');
  worldInput.setAsSystemValue(NodeMaterialSystemValues.World);
  const worldPos = new TransformBlock('worldPos');
  positionInput.connectTo(worldPos);
  worldInput.connectTo(worldPos);
  const viewProjectionInput = new InputBlock('viewProjection');
  viewProjectionInput.setAsSystemValue(NodeMaterialSystemValues.ViewProjection);
  const clipPos = new TransformBlock('worldPos * viewProjectionTransform');
  worldPos.connectTo(clipPos);
  viewProjectionInput.connectTo(clipPos);
  const vertexOutput = new VertexOutputBlock('vertexOutput');
  clipPos.connectTo(vertexOutput);

  // Fragment: two colour inputs mixed by a "mix" uniform through a Lerp block.
  const colorA = new InputBlock('colorA');
  colorA.value = new Color4(1, 0.45, 0.2, 1);
  const colorB = new InputBlock('colorB');
  colorB.value = new Color4(0.2, 0.5, 1, 1);
  const mix = new InputBlock('mix');
  mix.value = 0.5;
  const lerp = new LerpBlock('lerp');
  // Named connection points instead of connectTo's automatic pick.
  colorA.output.connectTo(lerp.left);
  colorB.output.connectTo(lerp.right);
  mix.output.connectTo(lerp.gradient);
  const fragmentOutput = new FragmentOutputBlock('fragmentOutput');
  lerp.output.connectTo(fragmentOutput.rgba);

  nodeMaterial.addOutputNode(vertexOutput);
  nodeMaterial.addOutputNode(fragmentOutput);
  // build() throws if the shaders don't compile; pass true to log the generated code.
  try {
    nodeMaterial.build(false);
  } catch (err) {
    console.error('Unable to compile because', err);
  }

  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1, tube: 0.35, radialSegments: 128 }, scene);
  knot.material = nodeMaterial;

  // Find an input by predicate and change its value: it is a uniform, so no rebuild.
  const mixInput = nodeMaterial.getInputBlockByPredicate((b) => b.name === 'mix')!;
  let auto = true;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const slider = panel.slider('mix.value', 0, 1, 0.01, 0.5, (v) => {
      auto = false;
      mixInput.value = v;
    });
    panel.button('animate', () => (auto = true));
    panel.readout(`${nodeMaterial.getInputBlocks().length} input blocks, ${nodeMaterial.attachedBlocks.length} blocks in the graph`);
    stage.scene.onBeforeRenderObservable.add(() => auto && (slider.value = String(mixInput.value)));
  }

  let t = 0;
  stage.run(() => {
    knot.rotation.y += 0.006;
    if (auto) mixInput.value = 0.5 + Math.sin((t += 0.02)) * 0.5;
  });

  return () => stage.dispose();
};

export default mount;
