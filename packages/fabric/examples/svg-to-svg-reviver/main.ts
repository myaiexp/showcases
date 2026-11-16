// The toSVG reviver gets each object's markup and returns the text to use instead
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { breakSvg, briefStatus, codePanel, svgPanel } from '../../shared/code-panel.ts';
import { select } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const REVIVERS: Record<string, ((markup: string, n: number) => string) | undefined> = {
  none: undefined,
  'add data-n to each group': (markup, n) => markup.replace('<g ', `<g data-n="${n}" `),
  'flat grey fills': (markup) => markup.replace(/fill: rgb\([^)]*\);/g, 'fill: rgb(150,150,150);'),
  'thin strokes': (markup) => markup.replace(/stroke-width: [\d.]+;/g, 'stroke-width: 1;'),
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['canvas', 'as <img>'] : ['canvas', 'canvas.toSVG({}, reviver)', 'as <img>'],
    scene: SCENE,
    width: 900,
    hint: 'toSVG(options, reviver) calls the reviver with the markup string of every object, in drawing order; what it returns goes into the document.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const showMarkup = stage.preview ? null : codePanel(stage.panes[1]!, false);
  const showImage = svgPanel(stage.panes.at(-1)!);
  const say = briefStatus(stage);
  canvas.backgroundColor = '#fff7d6';
  canvas.add(...sampleScene());

  const refresh = (name: string): void => {
    const rewrite = REVIVERS[name];
    let n = 0;
    const svg = canvas.toSVG({}, rewrite && ((markup: string) => rewrite(markup, n++)));
    showMarkup?.(breakSvg(svg));
    showImage(svg);
    say(`reviver: ${name}`);
  };
  refresh('none');

  const names = Object.keys(REVIVERS);
  if (stage.bar) select(stage.bar, 'reviver', names, refresh);
  else {
    let i = 0;
    stage.every(1400, () => refresh(names[++i % names.length]!));
  }

  return stage.dispose;
};

export default mount;
