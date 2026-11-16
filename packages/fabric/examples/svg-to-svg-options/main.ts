// SVG: toSVG options viewBox, width, height and suppressPreamble
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { breakSvg, briefStatus, codePanel, svgPanel } from '../../shared/code-panel.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const VIEWS = {
  'canvas default': undefined,
  'zoom on the circle': { x: 70, y: 90, width: 70, height: 70 },
  'top half': { x: 0, y: 0, width: 160, height: 100 },
} as const;
const SIZES = { 'canvas size': [undefined, undefined], '300 x 100': ['300', '100'], '100% x 100%': ['100%', '100%'] } as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['canvas', 'as <img>'] : ['canvas', 'the options and markup', 'as <img>'],
    scene: SCENE,
    width: 900,
    hint: 'viewBox picks which part of the scene is drawn, width and height set the size the document asks for, suppressPreamble drops the <?xml ...?> and <!DOCTYPE> lines.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const showMarkup = stage.preview ? null : codePanel(stage.panes[1]!, false);
  const showImage = svgPanel(stage.panes.at(-1)!);
  const say = briefStatus(stage);
  canvas.backgroundColor = '#fff7d6';
  canvas.add(...sampleScene());

  let view: keyof typeof VIEWS = 'canvas default';
  let size: keyof typeof SIZES = 'canvas size';
  let suppress = false;
  const refresh = (): void => {
    const [width, height] = SIZES[size];
    const options = { viewBox: VIEWS[view], width, height, suppressPreamble: suppress };
    const svg = canvas.toSVG(options);
    showMarkup?.(`canvas.toSVG(${JSON.stringify(options, null, 1)})\n\n${breakSvg(svg)}`);
    showImage(svg);
    say(`viewBox: ${view}`);
  };
  refresh();

  if (stage.bar) {
    select(stage.bar, 'viewBox', Object.keys(VIEWS) as (keyof typeof VIEWS)[], (v) => ((view = v), refresh()));
    select(stage.bar, 'width x height', Object.keys(SIZES) as (keyof typeof SIZES)[], (v) => ((size = v), refresh()));
    checkbox(stage.bar, 'suppressPreamble', false, (on) => ((suppress = on), refresh()));
  } else {
    const names = Object.keys(VIEWS) as (keyof typeof VIEWS)[];
    let i = 0;
    stage.every(1500, () => {
      view = names[++i % names.length]!;
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
