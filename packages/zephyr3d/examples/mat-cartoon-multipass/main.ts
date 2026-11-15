// A two-pass cartoon material: an inflated back-face outline, then banded Lambert shading
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, PBFunctionScope, RenderStateSet } from '@zephyr3d/device';
import {
  Application,
  applyMaterialMixins,
  DirectionalLight,
  Mesh,
  MeshMaterial,
  mixinLambert,
  QUEUE_TRANSPARENT,
  Scene,
  ShaderHelper,
  SphereShape,
  TorusShape,
  type DrawContext,
} from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';

// Use the lambert lighting model
class CartoonMaterial extends applyMaterialMixins(MeshMaterial, mixinLambert) {
  bands = 3;
  edgeThickness = 0.08;
  color = new Vector4(1, 0.35, 0.1, 1);
  edgeColor = new Vector4(0, 0, 0, 1);
  constructor() {
    super();
    // Two passes: pass 0 is the outline, pass 1 the object
    this.numPasses = 2;
  }
  // Opaque objects are depth-tested 'equal' against the depth prepass, which the inflated outline can never match.
  // The transparent queue tests normally (the blend mode stays 'none', so nothing is actually blended)
  override getQueueType(): number {
    return QUEUE_TRANSPARENT;
  }
  // Pass 0 culls the front faces, so only the inflated back of the object shows
  protected override updateRenderStates(pass: number, stateSet: RenderStateSet, ctx: DrawContext): void {
    super.updateRenderStates(pass, stateSet, ctx);
    stateSet.useRasterizerState().cullMode = pass === 0 ? 'front' : 'back';
  }
  override applyUniformValues(bindGroup: BindGroup, ctx: DrawContext, pass: number): void {
    super.applyUniformValues(bindGroup, ctx, pass);
    if (this.needFragmentColor(ctx)) {
      if (pass > 0) {
        bindGroup.setValue('cartoonColor', this.color);
        bindGroup.setValue('bands', this.bands);
      } else {
        bindGroup.setValue('edge', this.edgeThickness);
        bindGroup.setValue('edgeColor', this.edgeColor);
      }
    }
  }
  override vertexShader(scope: PBFunctionScope): void {
    super.vertexShader(scope);
    const pb = scope.$builder;
    scope.$l.oPos = ShaderHelper.resolveVertexPosition(scope);
    scope.$l.oNorm = ShaderHelper.resolveVertexNormal(scope);
    // this.pass says which pass the shader is being built for
    if (this.pass === 0) {
      scope.edge = pb.float().uniform(2);
      // Push every vertex out along its normal
      scope.oPos = pb.add(scope.oPos, pb.mul(scope.oNorm, scope.edge));
    }
    scope.$outputs.worldPos = pb.mul(ShaderHelper.getWorldMatrix(scope), pb.vec4(scope.oPos, 1)).xyz;
    ShaderHelper.setClipSpacePosition(scope, pb.mul(ShaderHelper.getViewProjectionMatrix(scope), pb.vec4(scope.$outputs.worldPos, 1)));
    scope.$outputs.wNorm = pb.mul(ShaderHelper.getNormalMatrix(scope), pb.vec4(scope.oNorm, 0)).xyz;
  }
  override fragmentShader(scope: PBFunctionScope): void {
    super.fragmentShader(scope);
    const pb = scope.$builder;
    if (this.needFragmentColor()) {
      if (this.pass === 0) {
        scope.edgeColor = pb.vec4().uniform(2);
        this.outputFragmentColor(scope, scope.$inputs.worldPos, scope.edgeColor);
      } else {
        scope.cartoonColor = pb.vec4().uniform(2);
        scope.bands = pb.float().uniform(2);
        scope.$l.normal = this.calculateNormal(scope, scope.$inputs.worldPos, scope.$inputs.wNorm);
        // Light first, with every light source, and quantize afterwards
        scope.$l.litColor = this.lambertLight(scope, scope.$inputs.worldPos, scope.normal, scope.cartoonColor);
        scope.$l.litIntensity = pb.add(scope.litColor.r, scope.litColor.g, scope.litColor.b, 0.00001);
        scope.$l.albedoIntensity = pb.add(scope.cartoonColor.r, scope.cartoonColor.g, scope.cartoonColor.b, 0.00001);
        scope.$l.intensity = pb.clamp(pb.div(scope.litIntensity, scope.albedoIntensity), 0, 1);
        scope.intensity = pb.div(pb.ceil(pb.mul(scope.intensity, scope.bands)), scope.bands);
        scope.litColor = pb.mul(pb.vec3(scope.intensity), scope.cartoonColor.rgb);
        this.outputFragmentColor(scope, scope.$inputs.worldPos, pb.vec4(scope.litColor, scope.cartoonColor.a));
      }
    } else {
      this.outputFragmentColor(scope, scope.$inputs.worldPos, null);
    }
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.1;
  new DirectionalLight(scene).lookAt(new Vector3(4, 6, 5), Vector3.zero(), Vector3.axisPY());

  const material = new CartoonMaterial();
  material.uniformChanged();
  const ball = new Mesh(scene, new SphereShape({ radius: 1.1 }), material);
  ball.position.setXYZ(-1.6, 0, 0);
  const torus = new Mesh(scene, new TorusShape({ outerRadius: 1.2, innerRadius: 0.45 }), material);
  torus.position.setXYZ(1.8, 0, 0);

  orbitCamera(scene, new Vector3(0, 1.5, 7), Vector3.zero(), false);
  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromEulerAngle(ms * 0.0005, ms * 0.0008, 0);
    if (!stage.bar) {
      material.bands = 2 + Math.floor((ms / 1200) % 4);
      material.uniformChanged();
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'bands', [1, 8, 1], 3, (v) => {
      material.bands = v;
      material.uniformChanged();
    });
    slider(stage.bar, 'edgeThickness', [0, 0.25, 0.01], material.edgeThickness, (v) => {
      material.edgeThickness = v;
      material.uniformChanged();
    });
  } else {
    stage.caption('numPasses = 2: outline, then banded light');
  }
  myApp.run();
});
