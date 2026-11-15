// Scaffolding for the raw Device API examples: a cube and a quad, a lit solid-colour program, a view-projection
import { Matrix4x4, Vector3 } from '@zephyr3d/base';
import type { AbstractDevice, BindGroup, GPUProgram, RenderStateSet, VertexLayout } from '@zephyr3d/device';

/** A vertex layout plus how many indices (or vertices, when there is no index buffer) to draw. */
export interface Geometry {
  layout: VertexLayout;
  count: number;
}

/** The raw arrays of a cube of half-size `size`: positions, normals, texture coordinates and 36 indices. */
export function cubeData(size = 1): { pos: number[]; nor: number[]; uv: number[]; idx: number[] } {
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  // Each face: normal, then the two edge directions u and v with u x v = normal, so it winds counter-clockwise from outside
  const faces: [number[], number[], number[]][] = [
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    [[0, 1, 0], [0, 0, 1], [1, 0, 0]],
    [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
    [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
    [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
  ];
  faces.forEach(([n, u, v], f) => {
    for (const [a, b] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
      for (let k = 0; k < 3; k++) pos.push(((n[k] ?? 0) + (u[k] ?? 0) * a + (v[k] ?? 0) * b) * size);
      nor.push(...n);
      uv.push((a + 1) / 2, (b + 1) / 2);
    }
    const base = f * 4;
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  });
  return { pos, nor, uv, idx };
}

/** A cube of half-size `size`: three vertex buffers (position, normal, tex0) and a Uint16 index buffer. */
export function cubeGeometry(device: AbstractDevice, size = 1): Geometry {
  const { pos, nor, uv, idx } = cubeData(size);
  const layout = device.createVertexLayout({
    vertexBuffers: [
      { buffer: device.createVertexBuffer('position_f32x3', new Float32Array(pos))! },
      { buffer: device.createVertexBuffer('normal_f32x3', new Float32Array(nor))! },
      { buffer: device.createVertexBuffer('tex0_f32x2', new Float32Array(uv))! },
    ],
    indexBuffer: device.createIndexBuffer(new Uint16Array(idx)),
  });
  return { layout, count: idx.length };
}

/** A square of half-size `size` in the XY plane as a 4-vertex triangle strip: position and tex0. */
export function quadGeometry(device: AbstractDevice, size = 1): Geometry {
  const s = size;
  const layout = device.createVertexLayout({
    vertexBuffers: [
      { buffer: device.createVertexBuffer('position_f32x3', new Float32Array([-s, -s, 0, s, -s, 0, -s, s, 0, s, s, 0]))! },
      { buffer: device.createVertexBuffer('tex0_f32x2', new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]))! },
    ],
  });
  return { layout, count: 4 };
}

/** Projection x view (Matrix4x4.lookAt gives the camera's world matrix, so it is inverted) for a camera circling the origin at `angle`, `distance` away and `height` up. */
export function viewProjection(device: AbstractDevice, angle: number, distance = 5, height = 2, aspectRatio?: number): Matrix4x4 {
  const aspect = aspectRatio ?? device.getDrawingBufferWidth() / Math.max(1, device.getDrawingBufferHeight());
  const proj = Matrix4x4.perspective(Math.PI / 3, aspect, 0.1, 100);
  const view = Matrix4x4.invertAffine(Matrix4x4.lookAt(new Vector3(Math.sin(angle) * distance, height, Math.cos(angle) * distance), Vector3.zero(), Vector3.axisPY()));
  return Matrix4x4.multiply(proj, view);
}

/**
 * A program that draws position + normal geometry in one colour with a fixed light: uniforms mvp, model and color,
 * all in bind group 0. Returns the program and its group-0 bind group.
 */
export function solidProgram(device: AbstractDevice): { program: GPUProgram; bindGroup: BindGroup } {
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.normal = pb.vec3().attrib('normal');
      this.mvp = pb.mat4().uniform(0);
      this.model = pb.mat4().uniform(0);
      this.$outputs.worldNormal = pb.vec3();
      pb.main(function () {
        this.$builtins.position = pb.mul(this.mvp, pb.vec4(this.$inputs.pos, 1));
        this.$outputs.worldNormal = pb.mul(this.model, pb.vec4(this.$inputs.normal, 0)).xyz;
      });
    },
    fragment(pb) {
      this.color = pb.vec4().uniform(0);
      this.$outputs.outColor = pb.vec4();
      pb.main(function () {
        this.$l.light = pb.normalize(pb.vec3(0.5, 0.8, 0.6));
        this.$l.lit = pb.add(0.25, pb.mul(0.75, pb.max(pb.dot(pb.normalize(this.$inputs.worldNormal), this.light), 0)));
        this.$outputs.outColor = pb.vec4(pb.mul(this.color.rgb, this.lit), this.color.a);
      });
    },
  })!;
  return { program, bindGroup: device.createBindGroup(program.bindGroupLayouts[0]!) };
}

/**
 * A program that draws a textured quad (position + tex0): mvp and uvScale in bind group 0, the 2D texture `tex` in
 * bind group 1. Returns the program and both bind groups.
 */
export function texturedProgram(device: AbstractDevice): { program: GPUProgram; group0: BindGroup; group1: BindGroup } {
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.uv = pb.vec2().attrib('texCoord0');
      this.mvp = pb.mat4().uniform(0);
      this.uvScale = pb.vec2().uniform(0);
      this.$outputs.outUV = pb.vec2();
      pb.main(function () {
        this.$builtins.position = pb.mul(this.mvp, pb.vec4(this.$inputs.pos, 1));
        this.$outputs.outUV = pb.mul(this.$inputs.uv, this.uvScale);
      });
    },
    fragment(pb) {
      this.tex = pb.tex2D().uniform(1);
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        this.$outputs.color = pb.textureSample(this.tex, this.$inputs.outUV);
      });
    },
  })!;
  return {
    program,
    group0: device.createBindGroup(program.bindGroupLayouts[0]!),
    group1: device.createBindGroup(program.bindGroupLayouts[1]!),
  };
}

/** Pixels of an n x n two-colour checker as RGBA bytes, `cell` texels per square. */
export function checkerPixels(n: number, cell: number, a: [number, number, number], b: [number, number, number]): Uint8Array<ArrayBuffer> {
  const px = new Uint8Array(new ArrayBuffer(n * n * 4));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const c = (Math.floor(x / cell) + Math.floor(y / cell)) % 2 === 0 ? a : b;
      px.set([c[0], c[1], c[2], 255], (y * n + x) * 4);
    }
  }
  return px;
}

/** A render state set with the depth test on or off and the given culling. Always set one: a raw draw should not rely on leftover state. */
export function stateSet(device: AbstractDevice, cull: 'none' | 'front' | 'back' = 'back', depth = true): RenderStateSet {
  const states = device.createRenderStateSet();
  states.useDepthState().enableTest(depth).enableWrite(depth);
  states.useRasterizerState().setCullMode(cull);
  return states;
}

type FragmentGenerator = NonNullable<Parameters<AbstractDevice['buildRenderProgram']>[0]['fragment']>;

/**
 * A program for a full-screen quad drawn from quadGeometry(): the vertex stage just passes `uv` (0..1) on as the varying
 * `uv`, and the fragment stage is the generator you pass. Uniforms it declares for group 0 go in the returned bind group.
 */
export function screenProgram(device: AbstractDevice, fragment: FragmentGenerator): { program: GPUProgram; bindGroup: BindGroup } {
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.$inputs.texcoord = pb.vec2().attrib('texCoord0');
      this.$outputs.uv = pb.vec2();
      pb.main(function () {
        this.$builtins.position = pb.vec4(this.$inputs.pos, 1);
        this.$outputs.uv = this.$inputs.texcoord;
      });
    },
    fragment,
  })!;
  return { program, bindGroup: device.createBindGroup(program.bindGroupLayouts[0]!) };
}

/** Draws a quadGeometry() strip with the program and its group-0 bind group, no culling and no depth test. */
export function drawScreen(device: AbstractDevice, quad: Geometry, program: GPUProgram, bindGroup: BindGroup, states: RenderStateSet): void {
  device.setVertexLayout(quad.layout);
  device.setRenderStates(states);
  device.setProgram(program);
  device.setBindGroup(0, bindGroup);
  device.draw('triangle-strip', 0, 4);
}
