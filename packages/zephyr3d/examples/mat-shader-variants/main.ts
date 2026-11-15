// Shader variants: defineFeature and useFeature give a Lambert material one program with a texture, one without
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, PBFunctionScope, Texture2D } from '@zephyr3d/device';
import {
  Application,
  applyMaterialMixins,
  DirectionalLight,
  getEngine,
  Mesh,
  MeshMaterial,
  mixinLambert,
  Scene,
  ShaderHelper,
  TorusShape,
  type DrawContext,
} from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';
import { checker, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

// Whether diffuseTexture is set or not is a variant of the shader
class MyLambertMaterial extends applyMaterialMixins(MeshMaterial, mixinLambert) {
  static featureDiffuseTexture = this.defineFeature();
  color = new Vector4(1, 1, 1, 1);
  diffuseTexture: Texture2D | null = null;
  // Settle the variant right before the material is applied
  override apply(ctx: DrawContext): boolean {
    this.useFeature(MyLambertMaterial.featureDiffuseTexture, !!this.diffuseTexture);
    return super.apply(ctx);
  }
  override supportLighting(): boolean {
    return true;
  }
  override vertexShader(scope: PBFunctionScope): void {
    super.vertexShader(scope);
    const pb = scope.$builder;
    scope.$inputs.pos = pb.vec3().attrib('position');
    scope.$inputs.normal = pb.vec3().attrib('normal');
    scope.$l.oPos = ShaderHelper.resolveVertexPosition(scope);
    scope.$l.oNorm = ShaderHelper.resolveVertexNormal(scope);
    scope.$outputs.worldPos = pb.mul(ShaderHelper.getWorldMatrix(scope), pb.vec4(scope.oPos, 1)).xyz;
    ShaderHelper.setClipSpacePosition(scope, pb.mul(ShaderHelper.getViewProjectionMatrix(scope), pb.vec4(scope.$outputs.worldPos, 1)));
    scope.$outputs.worldNorm = pb.mul(ShaderHelper.getNormalMatrix(scope), pb.vec4(scope.oNorm, 0)).xyz;
    // Only the textured variant reads texture coordinates
    if (this.diffuseTexture) {
      scope.$inputs.texcoord = pb.vec2().attrib('texCoord0');
      scope.$outputs.texcoord = scope.$inputs.texcoord;
    }
  }
  override fragmentShader(scope: PBFunctionScope): void {
    super.fragmentShader(scope);
    const pb = scope.$builder;
    if (this.needFragmentColor()) {
      scope.diffuseColor = pb.vec4().uniform(2);
      if (this.diffuseTexture) {
        scope.diffuseTexture = pb.tex2D().uniform(2);
      }
      scope.$l.normal = this.calculateNormal(scope, scope.$inputs.worldPos, scope.$inputs.worldNorm);
      if (this.diffuseTexture) {
        scope.$l.diffuse = pb.mul(pb.textureSample(scope.diffuseTexture, scope.$inputs.texcoord), scope.diffuseColor);
      } else {
        scope.$l.diffuse = scope.diffuseColor;
      }
      scope.$l.litColor = this.lambertLight(scope, scope.$inputs.worldPos, scope.normal, scope.diffuse);
      this.outputFragmentColor(scope, scope.$inputs.worldPos, pb.vec4(scope.litColor, scope.diffuse.a));
    } else {
      this.outputFragmentColor(scope, scope.$inputs.worldPos, null);
    }
  }
  override applyUniformValues(bindGroup: BindGroup, ctx: DrawContext, pass: number): void {
    super.applyUniformValues(bindGroup, ctx, pass);
    if (this.needFragmentColor(ctx)) {
      bindGroup.setValue('diffuseColor', this.color);
      if (this.diffuseTexture) {
        bindGroup.setTexture('diffuseTexture', this.diffuseTexture);
      }
    }
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/checker.png': png(256, 256, checker(8, [240, 220, 160], [70, 90, 140])) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.3;
  new DirectionalLight(scene).lookAt(new Vector3(4, 5, 6), Vector3.zero(), Vector3.axisPY());

  const texture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/checker.png');
  const material = new MyLambertMaterial();
  material.color.setXYZW(1, 0.8, 0.5, 1);
  material.diffuseTexture = texture;
  material.uniformChanged();
  const torus = new Mesh(scene, new TorusShape(), material);

  orbitCamera(scene, new Vector3(0, 2, 6), Vector3.zero(), false);
  const flip = (): void => {
    material.diffuseTexture = material.diffuseTexture ? null : texture;
    material.uniformChanged();
  };
  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromEulerAngle(ms * 0.0004, ms * 0.0007, 0);
  });
  if (stage.bar) {
    const out = stage.readout()!;
    const show = (): void => {
      out.textContent = `diffuseTexture: ${material.diffuseTexture ? 'set' : 'null'}   featureUsed(featureDiffuseTexture): ${String(material.featureUsed(MyLambertMaterial.featureDiffuseTexture))}`;
    };
    button(stage.bar, 'toggle diffuseTexture', () => {
      flip();
      show();
    });
    myApp.on('tick', show);
  } else {
    stage.caption('diffuseTexture set, then null: two variants');
    stage.every(1500, flip);
  }
  myApp.run();
});
