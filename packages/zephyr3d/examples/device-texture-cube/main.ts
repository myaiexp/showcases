// A cube texture: createCubeTexture, one update per face, sampled with a direction in a texCube shader
import { CubeFace, DEPTH_CLEAR_VALUE, Matrix4x4, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { checkerPixels, cubeGeometry, stateSet, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // Six faces of 16x16 texels, a checker in a different colour each
  const size = 16;
  const texture = device.createCubeTexture('rgba8unorm', size, {
    samplerOptions: { magFilter: 'nearest', minFilter: 'linear', mipFilter: 'linear' },
  })!;
  stage.own(() => texture.dispose());
  const faces: [CubeFace, [number, number, number]][] = [
    [CubeFace.PX, [235, 80, 70]],
    [CubeFace.NX, [120, 30, 30]],
    [CubeFace.PY, [90, 220, 110]],
    [CubeFace.NY, [30, 100, 50]],
    [CubeFace.PZ, [80, 130, 245]],
    [CubeFace.NZ, [30, 50, 120]],
  ];
  for (const [face, rgb] of faces) {
    texture.update(checkerPixels(size, 4, rgb, [255, 255, 255]), 0, 0, size, size, face);
  }

  // The shader looks the texture up with the (object-space) position of the fragment as the direction
  const program = device.buildRenderProgram({
    vertex(pb) {
      this.$inputs.pos = pb.vec3().attrib('position');
      this.mvp = pb.mat4().uniform(0);
      this.$outputs.dir = pb.vec3();
      pb.main(function () {
        this.$builtins.position = pb.mul(this.mvp, pb.vec4(this.$inputs.pos, 1));
        this.$outputs.dir = this.$inputs.pos;
      });
    },
    fragment(pb) {
      this.env = pb.texCube().uniform(1);
      this.$outputs.color = pb.vec4();
      pb.main(function () {
        this.$outputs.color = pb.textureSample(this.env, pb.normalize(this.$inputs.dir));
      });
    },
  })!;
  const group0 = device.createBindGroup(program.bindGroupLayouts[0]!);
  const group1 = device.createBindGroup(program.bindGroupLayouts[1]!);
  group1.setTexture('env', texture);

  const cube = cubeGeometry(device, 1);
  const states = stateSet(device, 'back');
  const clear = new Vector4(0.06, 0.08, 0.12, 1);
  myApp.on('tick', (_dt, ms) => {
    const model = Matrix4x4.multiply(Matrix4x4.rotationY(ms * 0.0007), Matrix4x4.rotationX(ms * 0.0004));
    group0.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 4.5, 1.2), model));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(cube.layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, group0);
    device.setBindGroup(1, group1);
    device.draw('triangle-list', 0, cube.count);
  });
  stage.caption('createCubeTexture: six update() calls, one per CubeFace');
  myApp.run();
});
