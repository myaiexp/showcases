// Style presets: Zdog.extend merges a shared look into each icon's own options
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

type Options = Zdog.ShapeOptions & Zdog.EllipseOptions & Zdog.PolygonOptions & Zdog.RoundedRectOptions;

// a style preset is just a plain options object
const STYLES: Record<string, Options> = {
  outline: { stroke: 6, fill: false },
  solid: { stroke: false, fill: true },
  chunky: { stroke: 18, fill: true },
};
const THEMES: Record<string, Options> = {
  sunset: { color: '#E62', backface: '#EA0' },
  berry: { color: '#a35ac9', backface: '#C25' },
  mint: { color: '#3ecf8e', backface: '#1f8a5b' },
};
const STYLE_NAMES = Object.keys(STYLES);
const THEME_NAMES = Object.keys(THEMES);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { fit: 300, aspect: 0.5 });
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom });
  const icons = new Zdog.Anchor({ addTo: illo });

  let style = 'chunky';
  let theme = 'sunset';
  const built: Zdog.Shape[] = [];

  const build = (): void => {
    for (const icon of built.splice(0)) icons.removeChild(icon);
    // the shape-specific options: only position and geometry
    const shapes: [new (o: Options) => Zdog.Shape, Options][] = [
      [Zdog.Ellipse, { diameter: 56 }],
      [Zdog.Polygon, { radius: 34, sides: 3 }],
      [Zdog.RoundedRect, { width: 56, height: 56, cornerRadius: 14 }],
      [Zdog.Polygon, { radius: 32, sides: 6 }],
    ];
    shapes.forEach(([Shape, own], i) => {
      // copy own options, then lay the style and the theme on top
      const options: Options = Zdog.extend<Options>({ addTo: icons, translate: { x: (i - 1.5) * 76 } }, own);
      Zdog.extend(options, STYLES[style]!);
      Zdog.extend(options, THEMES[theme]!);
      built.push(new Shape(options));
    });
  };
  build();

  if (stage.bar) {
    select(stage.bar, 'style preset', STYLE_NAMES, (v) => { style = v; build(); }, style);
    select(stage.bar, 'colour theme', THEME_NAMES, (v) => { theme = v; build(); }, theme);
  } else {
    let i = 0;
    stage.every(1600, () => {
      i++;
      style = STYLE_NAMES[i % STYLE_NAMES.length]!;
      theme = THEME_NAMES[Math.floor(i / STYLE_NAMES.length) % THEME_NAMES.length]!;
      build();
    });
  }

  stage.loop((_, t) => {
    // each icon rocks on its own phase so both sides of the colour theme show
    built.forEach((icon, i) => (icon.rotate.y = Math.sin(t * 1.6 + i) * 1.2));
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
