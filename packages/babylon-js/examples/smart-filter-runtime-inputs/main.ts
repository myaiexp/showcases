// Smart Filter input blocks changed at runtime: uniforms, time, disabled
import { ConnectionPointType, CreateStrongRef, InputBlock, SmartFilter } from '@babylonjs/smart-filters';
import { DesaturateBlock, ExposureBlock, KaleidoscopeBlock } from '@babylonjs/smart-filters-blocks';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSmartFilterCanvas, createTestTexture } from '../../shared/smart-filter-setup.ts';

const mount: Mount = async (el, ctx) => {
  const view = createSmartFilterCanvas(el, ctx);
  const { engine } = view;

  const smartFilter = new SmartFilter('Runtime inputs');
  const picture = new InputBlock(smartFilter, 'picture', ConnectionPointType.Texture, CreateStrongRef(createTestTexture(engine)));
  const kaleidoscope = new KaleidoscopeBlock(smartFilter, 'kaleidoscope');
  const desaturate = new DesaturateBlock(smartFilter, 'desaturate');
  const exposure = new ExposureBlock(smartFilter, 'exposure');

  // Every value the runtime reads each frame is an input block: floats, and booleans for `disabled`.
  const time = new InputBlock(smartFilter, 'time', ConnectionPointType.Float, 0);
  const grey = new InputBlock(smartFilter, 'grey', ConnectionPointType.Float, 0.6);
  const exposureAmount = new InputBlock(smartFilter, 'exposure', ConnectionPointType.Float, 1);
  const kaleidoscopeOff = new InputBlock(smartFilter, 'kaleidoscopeOff', ConnectionPointType.Boolean, false);
  const desaturateOff = new InputBlock(smartFilter, 'desaturateOff', ConnectionPointType.Boolean, false);

  picture.output.connectTo(kaleidoscope.input);
  time.output.connectTo(kaleidoscope.time);
  kaleidoscopeOff.output.connectTo(kaleidoscope.disabled);
  kaleidoscope.output.connectTo(desaturate.input);
  grey.output.connectTo(desaturate.intensity);
  desaturateOff.output.connectTo(desaturate.disabled);
  desaturate.output.connectTo(exposure.input);
  exposureAmount.output.connectTo(exposure.amount);
  exposure.output.connectTo(smartFilter.output);

  const runtime = await smartFilter.createRuntimeAsync(engine);
  // After a canvas resize, intermediate textures must be resized too.
  view.onResize(() => smartFilter.resize(engine));

  let speed = 1;
  let clock = 0;
  let last = performance.now();
  const auto = ctx.preview;
  engine.runRenderLoop(() => {
    const now = performance.now();
    clock += ((now - last) / 1000) * speed;
    last = now;
    time.runtimeValue.value = clock;
    if (auto) {
      // The preview flips the disabled switches by itself.
      desaturateOff.runtimeValue.value = Math.floor(clock / 3) % 2 === 1;
      exposureAmount.runtimeValue.value = 1 + 0.4 * Math.sin(clock);
    }
    runtime.render();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('time speed', 0, 3, 0.1, speed, (v) => (speed = v));
    panel.slider('desaturate intensity', 0, 1, 0.05, grey.runtimeValue.value as number, (v) => (grey.runtimeValue.value = v));
    panel.slider('exposure amount', 0.2, 2.5, 0.05, 1, (v) => (exposureAmount.runtimeValue.value = v));
    panel.row();
    panel.check('kaleidoscope disabled', false, (on) => (kaleidoscopeOff.runtimeValue.value = on));
    panel.check('desaturate disabled', false, (on) => (desaturateOff.runtimeValue.value = on));
    panel.readout('No rebuild happens: each control writes a runtimeValue the next render() reads.');
  }

  return () => {
    runtime.dispose();
    view.dispose();
  };
};

export default mount;
