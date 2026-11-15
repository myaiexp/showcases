// Sampler states on a tilted checker quad: mag/min/mip filters and the address mode
import { DEPTH_CLEAR_VALUE, Matrix4x4, Vector2, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { TextureAddressMode, TextureFilterMode } from '@zephyr3d/device';
import { Application } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { checkerPixels, quadGeometry, stateSet, texturedProgram, viewProjection } from '../../shared/device-kit.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const device = myApp.device;

  // An 8x8 texture of 2x2-texel squares: coarse enough that nearest and linear look different
  const texture = device.createTexture2D('rgba8unorm', 8, 8)!;
  texture.update(checkerPixels(8, 2, [250, 230, 160], [50, 70, 120]), 0, 0, 8, 8);
  stage.own(() => texture.dispose());

  const quad = quadGeometry(device, 3);
  const { program, group0, group1 } = texturedProgram(device);
  // Texture coordinates run 0..2.5, so the address mode matters beyond 1
  group0.setValue('uvScale', new Vector2(2.5, 2.5));
  const states = stateSet(device, 'none', false);
  const clear = new Vector4(0.06, 0.08, 0.12, 1);

  const options = { magFilter: 'nearest' as TextureFilterMode, minFilter: 'linear' as TextureFilterMode, mipFilter: 'linear' as TextureFilterMode, address: 'repeat' as TextureAddressMode };
  const apply = (): void => {
    const sampler = device.createSampler({
      magFilter: options.magFilter,
      minFilter: options.minFilter,
      mipFilter: options.mipFilter,
      addressU: options.address,
      addressV: options.address,
    });
    group1.setTexture('tex', texture, sampler);
  };
  apply();

  myApp.on('tick', (_dt, ms) => {
    if (!stage.bar) {
      options.address = (['repeat', 'mirrored-repeat', 'clamp'] as const)[Math.floor(ms / 1800) % 3]!;
      options.magFilter = Math.floor(ms / 900) % 2 === 0 ? 'nearest' : 'linear';
      apply();
    }
    // Tilted back so the far edge is minified and the near edge magnified
    const model = Matrix4x4.multiply(Matrix4x4.rotationX(-1.15), Matrix4x4.rotationZ(Math.sin(ms * 0.0004) * 0.4));
    group0.setValue('mvp', Matrix4x4.multiply(viewProjection(device, 0, 5, 0.5), model));
    device.clearFrameBuffer(clear, DEPTH_CLEAR_VALUE, 0);
    device.setVertexLayout(quad.layout);
    device.setRenderStates(states);
    device.setProgram(program);
    device.setBindGroup(0, group0);
    device.setBindGroup(1, group1);
    device.draw('triangle-strip', 0, 4);
  });
  if (stage.bar) {
    const filters = ['nearest', 'linear'] as const;
    select(stage.bar, 'magFilter', filters, options.magFilter as 'nearest', (v) => ((options.magFilter = v), apply()));
    select(stage.bar, 'minFilter', filters, 'linear', (v) => ((options.minFilter = v), apply()));
    select(stage.bar, 'mipFilter', ['none', 'nearest', 'linear'] as const, 'linear', (v) => ((options.mipFilter = v), apply()));
    select(stage.bar, 'addressU / addressV', ['repeat', 'mirrored-repeat', 'clamp'] as const, 'repeat', (v) => ((options.address = v), apply()));
  } else {
    stage.caption('createSampler: filters and address modes');
  }
  myApp.run();
});
