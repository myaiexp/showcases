// A depth-outline render module and a small scene for the render graph examples
import { Vector2, Vector3, Vector4 } from '@zephyr3d/base';
import type { BindGroup, GPUProgram, RenderStateSet, VertexLayout } from '@zephyr3d/device';
import {
  BoxShape,
  DirectionalLight,
  FrameResources,
  LambertMaterial,
  Mesh,
  PlaneShape,
  SphereShape,
  TorusShape,
  type ForwardPlusModuleContext,
  type RenderModule,
  type Scene,
} from '@zephyr3d/scene';

interface OutlineResources {
  program: GPUProgram;
  bindGroup: BindGroup;
  vertexLayout: VertexLayout;
  renderStates: RenderStateSet;
}

/** The module plus the settings its pass reads every frame. */
export interface OutlineModule extends RenderModule<ForwardPlusModuleContext> {
  /** Relative depth jump that counts as a full edge. */
  threshold: number;
  /** Edge colour, 0..1 per channel. */
  readonly outlineColor: Vector3;
  /** What prepare() returns: false drops the module's passes for the frame. */
  active: boolean;
  /** How many frames the pass has run. */
  frames: number;
}

/**
 * The docs' tut-70 module: reads SceneColor and LinearDepth, darkens depth discontinuities in a
 * separate output texture (a pass cannot sample and render the same texture) and publishes it
 * as the new SceneColor. `type` must be unique within a pipeline.
 */
export function createOutlineModule(type = 'MyOutline'): OutlineModule {
  let res: OutlineResources | null = null;
  const mod: OutlineModule = {
    type,
    threshold: 0.04,
    outlineColor: new Vector3(0, 0, 0),
    active: true,
    frames: 0,
    reads: [{ resource: FrameResources.SceneColor }, { resource: FrameResources.LinearDepth }],
    writes: [FrameResources.SceneColor],
    prepare() {
      return { enabled: mod.active };
    },
    setup(fg) {
      const { graph, ctx, blackboard } = fg;
      const sceneColor = blackboard.expect(FrameResources.SceneColor);
      // Read defensively: degrade instead of throwing when the prepass did not publish it
      const linearDepth = blackboard.get(FrameResources.LinearDepth);
      if (!linearDepth) return;
      const out = graph.addPass(type, (builder) => {
        builder.read(linearDepth);
        builder.read(sceneColor);
        const written = builder.createTexture({ format: ctx.colorFormat, label: `${type}Color`, allocationKey: `${type}.Color` });
        builder.setExecute((rgCtx) => {
          const device = ctx.device;
          if (!res) res = buildResources(device);
          const srcColor = rgCtx.getTexture(sceneColor);
          const depthTex = rgCtx.getTexture(linearDepth);
          const dstColor = rgCtx.getTexture(written);
          const fb = rgCtx.createFramebuffer({ colorAttachments: [written] });
          device.pushDeviceStates();
          device.setFramebuffer(fb);
          res.bindGroup.setTexture('sceneColor', srcColor);
          res.bindGroup.setTexture('linearDepth', depthTex);
          res.bindGroup.setValue('texelSize', new Vector2(1 / dstColor.width, 1 / dstColor.height));
          res.bindGroup.setValue('outlineColor', mod.outlineColor);
          res.bindGroup.setValue('threshold', mod.threshold);
          device.setProgram(res.program);
          device.setBindGroup(0, res.bindGroup);
          device.setVertexLayout(res.vertexLayout);
          device.setRenderStates(res.renderStates);
          device.draw('triangle-strip', 0, 4);
          device.popDeviceStates();
          mod.frames++;
        });
        return written;
      });
      // Publish the new version so the modules after this one see the outlined colour
      blackboard.set(FrameResources.SceneColor, out);
    },
  };
  return mod;
}

function buildResources(device: ForwardPlusModuleContext['ctx']['device']): OutlineResources {
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec2().attrib('position');
      this.$outputs.uv = pb.vec2();
      pb.main(function () {
        this.$builtins.position = pb.vec4(this.$inputs.pos, 0, 1);
        this.$outputs.uv = pb.add(pb.mul(this.$inputs.pos.xy, 0.5), pb.vec2(0.5));
      });
    },
    fragment(pb) {
      this.sceneColor = pb.tex2D().uniform(0);
      this.linearDepth = pb.tex2D().sampleType('unfilterable-float').uniform(0);
      this.texelSize = pb.vec2().uniform(0);
      this.outlineColor = pb.vec3().uniform(0);
      this.threshold = pb.float().uniform(0);
      this.$outputs.outColor = pb.vec4();
      pb.main(function () {
        this.$l.color = pb.textureSample(this.sceneColor, this.$inputs.uv);
        const at = (dx: number, dy: number) =>
          pb.textureSampleLevel(this.linearDepth, pb.add(this.$inputs.uv, pb.mul(this.texelSize, pb.vec2(dx, dy))), 0).r;
        this.$l.dc = at(0, 0);
        this.$l.dl = at(-1, 0);
        this.$l.dr = at(1, 0);
        this.$l.du = at(0, -1);
        this.$l.dd = at(0, 1);
        this.$l.diff = pb.max(
          pb.max(pb.abs(pb.sub(this.dc, this.dl)), pb.abs(pb.sub(this.dc, this.dr))),
          pb.max(pb.abs(pb.sub(this.dc, this.du)), pb.abs(pb.sub(this.dc, this.dd))),
        );
        this.$l.rel = pb.div(this.diff, pb.max(this.dc, 0.0001));
        this.$l.edge = pb.clamp(pb.div(this.rel, pb.max(this.threshold, 0.0001)), 0, 1);
        this.$outputs.outColor = pb.vec4(pb.mix(this.color.rgb, this.outlineColor, this.edge), this.color.a);
      });
    },
  })!;
  program.name = 'ShowcaseOutlinePass';
  const bindGroup = device.createBindGroup(program.bindGroupLayouts[0]!);
  const vertexLayout = device.createVertexLayout({
    vertexBuffers: [{ buffer: device.createVertexBuffer('position_f32x2', new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]))! }],
  })!;
  const renderStates = device.createRenderStateSet();
  renderStates.useDepthState().enableTest(false).enableWrite(false);
  renderStates.useRasterizerState().setCullMode('none');
  return { program, bindGroup, vertexLayout, renderStates };
}

/** The tut-70 scene: a floor and three overlapping shapes, so depth edges are easy to see. Returns the shapes. */
export function outlineScene(scene: Scene): { box: Mesh; sphere: Mesh; torus: Mesh } {
  scene.env.light.strength = 0.4;
  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  const floorMaterial = new LambertMaterial();
  floorMaterial.albedoColor = new Vector4(0.7, 0.7, 0.72, 1);
  new Mesh(scene, new PlaneShape({ size: 60 }), floorMaterial).position.setXYZ(-30, -6, -30);
  const shapeMaterial = new LambertMaterial();
  shapeMaterial.albedoColor = new Vector4(0.85, 0.5, 0.25, 1);
  const box = new Mesh(scene, new BoxShape({ size: 6 }), shapeMaterial);
  box.position.setXYZ(-7, -3, 0);
  const sphere = new Mesh(scene, new SphereShape({ radius: 4 }), shapeMaterial);
  sphere.position.setXYZ(1, -2, 3);
  const torus = new Mesh(scene, new TorusShape(), shapeMaterial);
  torus.scale.setXYZ(3, 3, 3);
  torus.position.setXYZ(8, 0, -2);
  return { box, sphere, torus };
}
