// Selective corner radii: scene rects, the helper that fits them, and the helper's SVG path
import { createMark, defineChart, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { rectCornerRadiiPath, resolveRectCornerRadii } from '@tanstack/charts/renderer/rect';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const sizes: readonly (readonly [number, number])[] = [[140, 90], [80, 40], [30, 30]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise the radius: the small rectangles shrink the radii to fit.' });
  if (stage.preview) stage.height -= 4;
  const readout = stage.preview ? null : stage.readout();
  const pathBox = stage.addBox();
  pathBox.style.minHeight = '60px';
  const state = { radius: 30 };

  const rects = createMark<unknown, never, never>(({ markIndex }) => ({
    id: `rects-${markIndex}`,
    channels: {},
    render({ chart }) {
      let x = chart.x + 12;
      const nodes: SceneNode[] = sizes.map(([w, h], i) => {
        const node: SceneNode = { kind: 'rect', key: `r${i}`, x, y: chart.y + 20, width: w, height: h, cornerRadii: [0, state.radius, 0, state.radius], style: { fill: '#60a5fa' } };
        x += w + 16;
        return node;
      });
      return { nodes };
    },
  }));
  const options = () => ({ definition: defineChart({ marks: [rects], scales: { x: null, y: null } }), height: stage.height, ariaLabel: 'Rectangles with selective corners' });
  const host = stage.own(mountChart(stage.box, options()));

  const show = (): void => {
    const asked = [0, state.radius, 0, state.radius] as const;
    host.update(options());
    const lines = sizes.map(([w, h]) => `${w} x ${h}: asked [${asked.join(', ')}], fitted [${resolveRectCornerRadii(asked, w, h).map((v) => v.toFixed(1)).join(', ')}]`);
    if (readout) readout.textContent = lines.join('\n');
    // The same geometry, serialized by the helper into a plain svg next to the chart.
    let x = 6;
    const paths = sizes.map(([w, h]) => {
      const d = rectCornerRadiiPath(x, 6, w, h, asked);
      x += w + 16;
      return `<path d="${d}" fill="none" stroke="#facc15" stroke-width="2"/>`;
    });
    pathBox.innerHTML = `<svg viewBox="0 0 ${x} 110" width="100%" height="${stage.preview ? 60 : 110}" aria-label="Paths from rectCornerRadiiPath" role="img">${paths.join('')}</svg>`;
  };
  show();
  if (stage.bar) slider(stage.bar, 'radius', 0, 60, 2, state.radius, (v) => { state.radius = v; show(); }, (v) => `${v}px`);
  else stage.cycle([4, 30, 60], 1800, (v) => { state.radius = v; show(); });
  return () => stage.dispose();
};

export default mount;
