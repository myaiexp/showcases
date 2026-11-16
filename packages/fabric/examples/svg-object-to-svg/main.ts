// SVG: object.toSVG() returns the markup of one object, wrapped here in an svg element
import { Canvas, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { breakSvg, briefStatus, codePanel, svgPanel } from '../../shared/code-panel.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['canvas', 'as <img>'] : ['canvas (select one)', 'object.toSVG()', 'wrapped in <svg>'],
    scene: SCENE,
    width: 900,
    hint: 'Click an object. toSVG() on it gives a <g> with its transform and one shape, in the canvas coordinates: not a whole document, so the picture wraps it.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const showMarkup = stage.preview ? null : codePanel(stage.panes[1]!, false);
  const showImage = svgPanel(stage.panes.at(-1)!);
  const say = briefStatus(stage);
  const objects = sampleScene();
  canvas.add(...objects);
  canvas.setActiveObject(objects[1]!);

  const refresh = (target: FabricObject | undefined = canvas.getActiveObject()): void => {
    if (!target) return;
    const fragment = target.toSVG();
    showMarkup?.(breakSvg(fragment));
    showImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="160" height="200">${fragment}</svg>`);
    say(`${(target.constructor as typeof FabricObject).type} toSVG(): ${fragment.length} chars`);
  };
  canvas.on({ 'selection:created': () => refresh(), 'selection:updated': () => refresh(), 'object:modified': () => refresh() });
  refresh();

  if (stage.preview) {
    let i = 0;
    stage.every(1300, () => {
      const next = objects[++i % objects.length]!;
      canvas.setActiveObject(next);
      canvas.requestRenderAll();
      refresh(next);
    });
  }

  return stage.dispose;
};

export default mount;
