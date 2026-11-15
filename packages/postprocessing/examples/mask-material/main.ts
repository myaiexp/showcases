// MaskMaterial in a ShaderPass: a mask texture multiplies the picture, with each MaskFunction
import { ColorChannel, CopyPass, EffectComposer, MaskFunction, MaskMaterial, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { channelTexture } from '../../shared/texture-art.ts';

const FUNCTIONS = ['DISCARD', 'MULTIPLY', 'MULTIPLY_RGB', 'MULTIPLY_RGB_SET_ALPHA'] as const;
const CHANNELS = ['RED', 'GREEN', 'BLUE', 'ALPHA'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // Red runs left to right, green bottom to top, blue is a checker, alpha a radial fade.
  const mask = stage.own(channelTexture());
  const material = new MaskMaterial(mask);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new ShaderPass(material));
  // mask.frag has no colour space conversion, so it must not be the pass that draws to the canvas.
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  let fn: (typeof FUNCTIONS)[number] = 'MULTIPLY';
  let channel: (typeof CHANNELS)[number] = 'ALPHA';
  const apply = (): void => {
    material.maskFunction = MaskFunction[fn];
    material.colorChannel = ColorChannel[channel];
    label.textContent = `maskFunction ${fn}\ncolorChannel ${channel}\ninverted ${material.inverted}`;
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'maskFunction', FUNCTIONS, (v) => ((fn = v), apply()), fn);
    select(stage.bar, 'colorChannel', CHANNELS, (v) => ((channel = v), apply()), channel);
    checkbox(stage.bar, 'inverted', false, (v) => ((material.inverted = v), apply()));
    slider(stage.bar, 'strength', 0, 3, 0.05, 1, (v) => (material.strength = v));
  } else {
    let i = 0;
    stage.every(2200, () => {
      i++;
      fn = FUNCTIONS[i % FUNCTIONS.length]!;
      channel = CHANNELS[(i >> 1) % CHANNELS.length]!;
      apply();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
