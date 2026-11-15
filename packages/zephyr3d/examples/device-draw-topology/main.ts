// The six primitive topologies drawn from the same nine vertices: a centre and a ring of eight
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { PrimitiveType } from '@zephyr3d/device';
import { Application } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { stateSet } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

// How many of the nine vertices each topology can use whole
const TOPOLOGIES: Record<PrimitiveType, number> = {
  'point-list': 9,
  'line-list': 8,
  'line-strip': 9,
  'triangle-list': 9,
  'triangle-strip': 9,
  'triangle-fan': 9,
};

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  const verts = [0, 0, 0];
  for (let i = 0; i < 8; i++) verts.push(Math.cos((i / 8) * Math.PI * 2) * 0.7, Math.sin((i / 8) * Math.PI * 2) * 0.7, 0);
  const layout = device.createVertexLayout({
    vertexBuffers: [{ buffer: device.createVertexBuffer('position_f32x3', new Float32Array(verts))! }],
  });
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.aspect = pb.float().uniform(0);
      this.$outputs.shade = pb.float();
      pb.main(function () {
        this.$builtins.position = pb.vec4(pb.div(this.$inputs.pos.x, this.aspect), this.$inputs.pos.y, 0, 1);
        // Only used by point-list: the size of each point in pixels
        this.$builtins.pointSize = 12;
        this.$outputs.shade = pb.add(0.45, pb.mul(0.1, pb.float(this.$builtins.vertexIndex)));
      });
    },
    fragment(pb) {
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        this.$outputs.color = pb.vec4(pb.mul(pb.vec3(1, 0.7, 0.3), this.$inputs.shade), 1);
      });
    },
  })!;
  const bindGroup = device.createBindGroup(program.bindGroupLayouts[0]!);
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  const names = Object.keys(TOPOLOGIES) as PrimitiveType[];
  let topology: PrimitiveType = 'triangle-fan';

  myApp.on('tick', () => {
    if (!stage.bar) topology = names[Math.floor(performance.now() / 1400) % names.length]!;
    bindGroup.setValue('aspect', device.getDrawingBufferWidth() / device.getDrawingBufferHeight());
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, bindGroup);
    // A triangle-list needs a multiple of three vertices: nine is exactly three triangles
    device.draw(topology, 0, TOPOLOGIES[topology]);
    device.setFont('14px monospace');
    device.drawText(`device.draw('${topology}', 0, ${TOPOLOGIES[topology]})`, 8, 6, '#ffffff');
  });
  if (stage.bar) {
    select(stage.bar, 'primitive', names, topology, (v) => (topology = v));
  } else {
    stage.caption('cycling through the topologies');
  }
  myApp.run();
});
