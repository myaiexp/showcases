// Vizzu: animated charts that morph from one chart type into another
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Vizzu',
  npm: 'vizzu',
  tagline: 'Charts that animate from one state to the next, for data stories.',
  about:
    'Most chart libraries draw one chart. Vizzu draws a chart and then moves it: you describe the next state (put this series on the x-axis, colour by that one, switch to circles, go polar) and Vizzu animates every bar, point and label into its new place, so the viewer can follow what changed. There are no chart types to pick from. A chart is data series placed on channels (x, y, colour, lightness, size, label), plus a geometry and a coordinate system, and a column chart becomes a stacked area, a pie or a treemap by changing those. Each example here plays a short sequence of animate() calls, the way the Vizzu tutorial builds its charts step by step, and loops back to the start.',
  category: 'Data/Viz',
  homepage: 'https://lib.vizzuhq.com/',
  docsUrl: 'https://lib.vizzuhq.com/',
  repo: 'https://github.com/vizzuhq/vizzu-lib',
  added: '2026-11-15',
  // The tutorial's chapter order (tools/docs/mkdocs.yml nav), then the code reference.
  sections: [
    'Basic logic',
    'Initialization',
    'Data',
    'Axes, title, tooltip',
    'Aggregating data',
    'Geometry',
    'Channels & legend',
    'Group/stack',
    'Stacking explanation',
    'Sorting',
    'Align & range',
    'Changing dimensions',
    'Orientation, split & polar',
    'Filtering & adding new records',
    'Without coordinates & noop channel',
    'Color palette & fonts',
    'Chart layout',
    'Animation options',
    'Animation control & keyframes',
    'Events',
    'Shorthands & Store',
    'Chart presets',
    'Style',
    'Writing plugins',
    'Code reference',
  ],
});
