// OutlineEffect: a Selection of meshes, edgeStrength and visibleEdgeColor
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const COLORS = { white: 0xffffff, orange: 0xff9a2e, cyan: 0x2ee6ff, lime: 0x9dff3a } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The default blend function is SCREEN, which adds the outline's colour to the picture.
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 3, visibleEdgeColor: COLORS.white });
  composer.addPass(new EffectPass(stage.camera, outline));
  const { selection } = outline;
  selection.set([subject.knot]);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `selection.size ${selection.size}, edgeStrength ${outline.edgeStrength.toFixed(1)}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'edgeStrength', 0, 10, 0.1, 3, (v) => ((outline.edgeStrength = v), note()));
    select(stage.bar, 'visibleEdgeColor', Object.keys(COLORS) as (keyof typeof COLORS)[], (c) => outline.visibleEdgeColor.set(COLORS[c]), 'white');
    select(stage.bar, 'select', ['knot', 'balls', 'crates', 'everything'] as const, (what) => {
      const group = { knot: [subject.knot], balls: subject.balls, crates: subject.crates, everything: subject.all }[what];
      selection.set(group);
      note();
    }, 'knot');
  } else {
    // Cards walk the selection through the scene's objects.
    let i = 0;
    stage.every(1400, () => {
      selection.set([subject.all[++i % subject.all.length]!]);
      note();
    });
  }
  note();

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
