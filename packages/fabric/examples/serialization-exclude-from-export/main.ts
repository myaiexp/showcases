// excludeFromExport keeps helper objects out of the JSON and the SVG
import { Canvas, Line, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['with guides', 'canvas.toJSON()'],
    scene: SCENE,
    hint: 'The dashed frame and the centre lines are helpers. Objects with excludeFromExport = true are skipped by toJSON, toObject and toSVG.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.includeDefaultValues = false;
  canvas.add(...sampleScene());

  const guideLook = { stroke: '#d9488a', strokeDashArray: [4, 3], strokeWidth: 1, selectable: false, evented: false };
  const guides = [
    new Rect({ left: 80, top: 100, width: 150, height: 190, fill: 'transparent', ...guideLook }),
    new Line([80, 5, 80, 195], guideLook),
    new Line([5, 100, 155, 100], guideLook),
  ];
  canvas.add(...guides);

  const refresh = (): void => {
    const data = canvas.toJSON();
    const svgShapes = canvas.toSVG().match(/<(rect|line|circle|polygon)\b/g)?.length ?? 0;
    show(pretty(data, stage.preview));
    say(
      `on the canvas ${canvas.getObjects().length}, in toJSON ${data.objects.length}, ` +
        `SVG shapes ${svgShapes} (the background rect counts)`,
    );
  };
  const setExcluded = (on: boolean): void => {
    for (const g of guides) g.excludeFromExport = on;
    refresh();
  };
  setExcluded(true);

  if (stage.bar) checkbox(stage.bar, 'guides excludeFromExport', true, setExcluded);
  else {
    let on = true;
    stage.every(1600, () => setExcluded((on = !on)));
  }

  return stage.dispose;
};

export default mount;
