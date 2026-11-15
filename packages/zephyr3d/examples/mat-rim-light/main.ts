// An unlit custom material: a rim light from the view vector and the world normal
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, PBFunctionScope } from '@zephyr3d/device';
import { Application, getEngine, getInput, Mesh, MeshMaterial, OrbitCameraController, PerspectiveCamera, Scene, ShaderHelper, TorusShape, type DrawContext } from '@zephyr3d/scene';
import { color } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

// Edge light material
class RimColorMaterial extends MeshMaterial {
  // The colour of the edge light
  color = new Vector3(1, 1, 1);
  // Unaffected by illumination
  override supportLighting(): boolean {
    return false;
  }
  override vertexShader(scope: PBFunctionScope): void {
    // The parent's vertex shader sets up the global uniforms and the skinning inputs
    super.vertexShader(scope);
    const pb = scope.$builder;
    scope.$inputs.pos = pb.vec3().attrib('position');
    scope.$inputs.normal = pb.vec3().attrib('normal');
    // Local-space position and normal (after skinning, when there is any)
    scope.$l.oPos = ShaderHelper.resolveVertexPosition(scope);
    scope.$l.oNorm = ShaderHelper.resolveVertexNormal(scope);
    // World-space position and normal go to the fragment shader as varyings
    scope.$outputs.worldPos = pb.mul(ShaderHelper.getWorldMatrix(scope), pb.vec4(scope.oPos, 1)).xyz;
    scope.$outputs.worldNorm = pb.mul(ShaderHelper.getNormalMatrix(scope), pb.vec4(scope.oNorm, 0)).xyz;
    ShaderHelper.setClipSpacePosition(scope, pb.mul(ShaderHelper.getViewProjectionMatrix(scope), pb.vec4(scope.$outputs.worldPos, 1)));
  }
  override fragmentShader(scope: PBFunctionScope): void {
    super.fragmentShader(scope);
    const pb = scope.$builder;
    // Depth and shadow passes without alpha test need no colour
    if (this.needFragmentColor()) {
      // Material uniforms live in bind group 2
      scope.rimColor = pb.vec3().uniform(2);
      scope.$l.viewVec = pb.normalize(pb.sub(ShaderHelper.getCameraPosition(scope), scope.$inputs.worldPos));
      // The smaller NdotV, the nearer the edge of the silhouette
      scope.$l.NdotV = pb.clamp(pb.dot(pb.normalize(scope.$inputs.worldNorm), scope.viewVec), 0, 1);
      scope.$l.finalColor = pb.mul(scope.rimColor, pb.pow(pb.sub(1, scope.NdotV), 4));
      this.outputFragmentColor(scope, scope.$inputs.worldPos, pb.vec4(scope.finalColor, 1));
    } else {
      this.outputFragmentColor(scope, scope.$inputs.worldPos, null);
    }
  }
  override applyUniformValues(bindGroup: BindGroup, ctx: DrawContext, pass: number): void {
    super.applyUniformValues(bindGroup, ctx, pass);
    if (this.needFragmentColor(ctx)) {
      bindGroup.setValue('rimColor', this.color);
    }
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.sky.skyType = 'none';

  const material = new RimColorMaterial();
  material.color.setXYZ(1, 1, 0);
  // Uniforms are cached: tell the material when one changed
  material.uniformChanged();
  const torus = new Mesh(scene, new TorusShape(), material);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 2, 6), Vector3.zero(), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromEulerAngle(ms * 0.0005, ms * 0.0008, 0);
    if (!stage.bar) {
      const h = ms * 0.0006;
      material.color.setXYZ(0.6 + 0.4 * Math.sin(h), 0.6 + 0.4 * Math.sin(h + 2.1), 0.6 + 0.4 * Math.sin(h + 4.2));
      material.uniformChanged();
    }
  });
  if (stage.bar) {
    color(stage.bar, 'rim colour', '#ffff00', (r, g, b) => {
      material.color.setXYZ(r, g, b);
      material.uniformChanged();
    });
  } else {
    stage.caption('pow(1 - N.V, 4) as the colour, no lighting');
  }
  myApp.run();
});
