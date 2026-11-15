// Lambert lighting written by hand on mixinLight: forEachLight, attenuation, direction and shadows
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { BindGroup, PBFunctionScope } from '@zephyr3d/device';
import {
  Application,
  applyMaterialMixins,
  BoxShape,
  DirectionalLight,
  Mesh,
  MeshMaterial,
  mixinLight,
  PlaneShape,
  PointLight,
  Scene,
  ShaderHelper,
  SphereShape,
  type DrawContext,
} from '@zephyr3d/scene';
import { color, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';

// Only mixinLight: the lighting model itself is in the fragment shader below
class MyLambertMaterial extends applyMaterialMixins(MeshMaterial, mixinLight) {
  color = new Vector4(1, 1, 1, 1);
  override supportLighting(): boolean {
    return true;
  }
  override vertexShader(scope: PBFunctionScope): void {
    super.vertexShader(scope);
    const pb = scope.$builder;
    scope.$l.oPos = ShaderHelper.resolveVertexPosition(scope);
    scope.$l.oNorm = ShaderHelper.resolveVertexNormal(scope);
    scope.$outputs.worldPos = pb.mul(ShaderHelper.getWorldMatrix(scope), pb.vec4(scope.oPos, 1)).xyz;
    scope.$outputs.worldNorm = pb.mul(ShaderHelper.getNormalMatrix(scope), pb.vec4(scope.oNorm, 0)).xyz;
    ShaderHelper.setClipSpacePosition(scope, pb.mul(ShaderHelper.getViewProjectionMatrix(scope), pb.vec4(scope.$outputs.worldPos, 1)));
  }
  override fragmentShader(scope: PBFunctionScope): void {
    super.fragmentShader(scope);
    const pb = scope.$builder;
    if (this.needFragmentColor()) {
      scope.diffuseColor = pb.vec4().uniform(2);
      scope.$l.normal = this.calculateNormal(scope, scope.$inputs.worldPos, scope.$inputs.worldNorm);
      // What the lights add up to
      scope.$l.litColor = pb.vec3(0);
      // With shadow-casting lights the scene is drawn in several passes; only one carries the ambient term
      if (this.needCalculateEnvLight()) {
        scope.litColor = this.getEnvLightIrradiance(scope, scope.normal);
      }
      const that = this;
      // Called once per light that reaches this fragment (the callback body is the shader code)
      this.forEachLight(scope, function (type, posRange, dirCutoff, colorIntensity, extra, shadow) {
        this.$l.lightAtten = that.calculateLightAttenuation(this, type, this.worldPos, posRange, dirCutoff, extra);
        this.$l.lightDir = that.calculateLightDirection(this, type, this.worldPos, posRange, dirCutoff, extra);
        this.$l.lightColor = pb.mul(colorIntensity.rgb, colorIntensity.a, this.lightAtten);
        this.$l.NoL = pb.clamp(pb.dot(this.normal, this.lightDir), 0, 1);
        this.$l.diffuse = pb.mul(this.lightColor, this.NoL);
        if (shadow) {
          this.$l.shadow = pb.vec3(that.calculateShadow(this, this.worldPos, this.normal, this.NoL));
          this.diffuse = pb.mul(this.diffuse, this.shadow);
        }
        this.litColor = pb.add(this.litColor, this.diffuse);
      });
      scope.$l.finalColor = pb.mul(pb.vec4(scope.litColor, 1), scope.diffuseColor);
      this.outputFragmentColor(scope, scope.$inputs.worldPos, scope.finalColor);
    } else {
      this.outputFragmentColor(scope, scope.$inputs.worldPos, null);
    }
  }
  override applyUniformValues(bindGroup: BindGroup, ctx: DrawContext, pass: number): void {
    super.applyUniformValues(bindGroup, ctx, pass);
    if (this.needFragmentColor(ctx)) {
      bindGroup.setValue('diffuseColor', this.color);
    }
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.15;

  // A shadow-casting sun and a roaming point light, both lit through the hand-written loop
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(-5, 8, 4), Vector3.zero(), Vector3.axisPY());
  sun.intensity = 1.5;
  sun.castShadow = true;
  const lamp = new PointLight(scene);
  lamp.range = 9;
  lamp.intensity = 4;
  lamp.color = new Vector4(1, 0.55, 0.3, 1);

  const material = new MyLambertMaterial();
  material.color.setXYZW(0.85, 0.85, 0.9, 1);
  material.uniformChanged();
  new Mesh(scene, new PlaneShape({ size: 16 }), material);
  const ball = new Mesh(scene, new SphereShape({ radius: 1 }), material);
  ball.position.setXYZ(-1.5, 1, 0);
  new Mesh(scene, new BoxShape({ size: 1.6 }), material).position.setXYZ(1.8, 0.8, -0.5);

  orbitCamera(scene, new Vector3(0, 5, 9), new Vector3(0, 0.8, 0), false);
  myApp.on('tick', (_dt, ms) => {
    lamp.position.setXYZ(Math.cos(ms * 0.0009) * 4, 1.5, Math.sin(ms * 0.0009) * 4);
  });
  if (stage.bar) {
    toggle(stage.bar, 'sun castShadow', true, (v) => (sun.castShadow = v));
    toggle(stage.bar, 'point light', true, (v) => (lamp.showState = v ? 'visible' : 'hidden'));
    color(stage.bar, 'diffuse colour', '#d9d9e6', (r, g, b) => {
      material.color.setXYZW(r, g, b, 1);
      material.uniformChanged();
    });
  } else {
    stage.caption('forEachLight + attenuation + shadows, by hand');
  }
  myApp.run();
});
