// A custom material that mixes in mixinBlinnPhong and calls blinnPhongLight with a diffuse texture
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, PBFunctionScope, Texture2D } from '@zephyr3d/device';
import {
  Application,
  applyMaterialMixins,
  DirectionalLight,
  getEngine,
  mixinBlinnPhong,
  Mesh,
  MeshMaterial,
  Scene,
  ShaderHelper,
  TorusShape,
  type DrawContext,
} from '@zephyr3d/scene';
import { color, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';
import { checker, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

// Customizing a Blinn-Phong material: the mixin brings lights, shadows and blinnPhongLight()
class MyBlinnMaterial extends applyMaterialMixins(MeshMaterial, mixinBlinnPhong) {
  color = new Vector4(1, 1, 1, 1);
  diffuseTexture: Texture2D | null = null;
  override supportLighting(): boolean {
    return true;
  }
  override vertexShader(scope: PBFunctionScope): void {
    super.vertexShader(scope);
    const pb = scope.$builder;
    scope.$l.oPos = ShaderHelper.resolveVertexPosition(scope);
    scope.$l.oNorm = ShaderHelper.resolveVertexNormal(scope);
    scope.$inputs.texcoord = pb.vec2().attrib('texCoord0');
    scope.$outputs.worldPos = pb.mul(ShaderHelper.getWorldMatrix(scope), pb.vec4(scope.oPos, 1)).xyz;
    scope.$outputs.worldNorm = pb.mul(ShaderHelper.getNormalMatrix(scope), pb.vec4(scope.oNorm, 0)).xyz;
    scope.$outputs.texcoord = scope.$inputs.texcoord;
    ShaderHelper.setClipSpacePosition(scope, pb.mul(ShaderHelper.getViewProjectionMatrix(scope), pb.vec4(scope.$outputs.worldPos, 1)));
  }
  override fragmentShader(scope: PBFunctionScope): void {
    super.fragmentShader(scope);
    const pb = scope.$builder;
    if (this.needFragmentColor()) {
      scope.diffuseColor = pb.vec4().uniform(2);
      scope.diffuseTexture = pb.tex2D().uniform(2);
      // calculateNormal comes from mixinLight and honours a normal map when one is set
      scope.$l.normal = this.calculateNormal(scope, scope.$inputs.worldPos, scope.$inputs.worldNorm);
      scope.$l.viewVec = pb.normalize(pb.sub(ShaderHelper.getCameraPosition(scope), scope.$inputs.worldPos));
      scope.$l.diffuseColor = pb.mul(pb.textureSample(scope.diffuseTexture, scope.$inputs.texcoord), scope.diffuseColor);
      // The lit colour of the fragment, from every light and the environment
      scope.$l.litColor = this.blinnPhongLight(scope, scope.$inputs.worldPos, scope.normal, scope.viewVec, scope.diffuseColor);
      this.outputFragmentColor(scope, scope.$inputs.worldPos, pb.vec4(scope.litColor, scope.diffuseColor.a));
    } else {
      this.outputFragmentColor(scope, scope.$inputs.worldPos, null);
    }
  }
  override applyUniformValues(bindGroup: BindGroup, ctx: DrawContext, pass: number): void {
    super.applyUniformValues(bindGroup, ctx, pass);
    if (this.needFragmentColor(ctx)) {
      bindGroup.setValue('diffuseColor', this.color);
      bindGroup.setTexture('diffuseTexture', this.diffuseTexture!);
    }
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/checker.png': png(256, 256, checker(8, [235, 200, 120], [90, 50, 40])) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.3;
  new DirectionalLight(scene).lookAt(new Vector3(4, 5, 6), Vector3.zero(), Vector3.axisPY());

  const material = new MyBlinnMaterial();
  material.color.setXYZW(1, 1, 0.9, 1);
  material.diffuseTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/checker.png');
  // Notify the material that its uniforms must be uploaded again
  material.uniformChanged();
  const torus = new Mesh(scene, new TorusShape(), material);

  orbitCamera(scene, new Vector3(0, 2, 6), Vector3.zero(), false);
  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromEulerAngle(ms * 0.0004, ms * 0.0007, 0);
  });
  if (stage.bar) {
    color(stage.bar, 'diffuse colour', '#ffffe6', (r, g, b) => {
      material.color.setXYZW(r, g, b, 1);
      material.uniformChanged();
    });
    slider(stage.bar, 'shininess', [1, 200, 1], material.shininess, (v) => (material.shininess = v));
  } else {
    stage.caption('mixinBlinnPhong + a diffuse texture');
  }
  myApp.run();
});
