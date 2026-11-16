// canvas.toSVG() as markup, and as a picture the browser draws from that markup
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { breakSvg, briefStatus, codePanel, svgPanel } from '../../shared/code-panel.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['canvas', 'as <img>'] : ['canvas', 'canvas.toSVG()', 'as <img src="data:...">'],
    scene: SCENE,
    width: 900,
    hint: 'Move or scale an object: the markup and the picture on the right are made again from canvas.toSVG().',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const showMarkup = stage.preview ? null : codePanel(stage.panes[1]!, false);
  const showImage = svgPanel(stage.panes.at(-1)!);
  const say = briefStatus(stage);
  canvas.backgroundColor = '#fff7d6';
  canvas.add(...sampleScene());

  const refresh = (): void => {
    const svg = canvas.toSVG(); // a string holding a whole SVG document
    showMarkup?.(breakSvg(svg));
    showImage(svg);
    say(`${svg.length} chars of SVG`);
  };
  canvas.on({ 'object:moving': refresh, 'object:scaling': refresh, 'object:rotating': refresh, 'object:modified': refresh });
  refresh();

  if (stage.preview) {
    const [rect, dot] = canvas.getObjects();
    stage.loop((_dt, t) => {
      rect!.set({ angle: 12 + Math.sin(t * 1.4) * 30 });
      dot!.set({ left: 106 - Math.sin(t) * 24 });
      canvas.requestRenderAll();
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
