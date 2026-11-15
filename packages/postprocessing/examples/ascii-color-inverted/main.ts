// An ASCIIEffect toggling its colour override and inverted flag
import { ASCIIEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const COLORS = { 'scene colours (null)': null, green: '#33ff66', amber: '#ffb000', white: '#ffffff' } as const;
type ColorName = keyof typeof COLORS;
const NAMES = Object.keys(COLORS) as ColorName[];
const STATES: [ColorName, boolean][] = [['scene colours (null)', false], ['green', false], ['green', true], ['amber', true]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const ascii = new ASCIIEffect({ cellSize: 12 });
  composer.addPass(new EffectPass(stage.camera, ascii));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    select(stage.bar, 'color', NAMES, (n) => (ascii.color = COLORS[n]));
    checkbox(stage.bar, 'inverted', false, (on) => (ascii.inverted = on));
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 2) % STATES.length;
      if (s !== step) {
        step = s;
        const [name, inverted] = STATES[s]!;
        ascii.color = COLORS[name];
        ascii.inverted = inverted;
        label.textContent = `color ${name}, inverted ${inverted}`;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
