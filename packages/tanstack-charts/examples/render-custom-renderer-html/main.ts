// A custom ChartRenderer: bars, rules and labels become DOM boxes; the host keeps the behaviour
import { barY, defineChart } from '@tanstack/charts';
import type { ChartRenderer, ChartScene, ChartSurface, RenderChartOptions, SceneNode } from '@tanstack/charts';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const px = (n: number): string => `${n.toFixed(2)}px`;
const css = (o: Record<string, string | number | undefined>): string =>
  Object.entries(o).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}:${v}`).join(';');

/** Scene nodes as HTML. Polylines and areas are skipped: this renderer only knows boxes and text. */
function paint(nodes: readonly SceneNode[], dx = 0, dy = 0): string {
  return nodes
    .map((n) => {
      const key = `data-key="${esc(n.key)}"`;
      const base = { position: 'absolute' };
      // Groups with focus metadata hold geometry that stays hidden until focus asks for it.
      if (n.kind === 'group') return n.focus ? '' : paint(n.children, dx + (n.translateX ?? 0), dy + (n.translateY ?? 0));
      if (n.kind === 'rect') return `<div ${key} style="${css({ ...base, left: px(n.x + dx), top: px(n.y + dy), width: px(n.width), height: px(n.height), background: n.style?.fill, 'border-radius': n.radius ? px(n.radius) : undefined })}"></div>`;
      if (n.kind === 'dot') return `<div ${key} style="${css({ ...base, left: px(n.x + dx - n.radius), top: px(n.y + dy - n.radius), width: px(2 * n.radius), height: px(2 * n.radius), 'border-radius': '50%', background: n.style?.fill })}"></div>`;
      if (n.kind === 'rule') {
        const w = Math.max(Math.abs(n.x2 - n.x1), n.style?.strokeWidth ?? 1);
        const h = Math.max(Math.abs(n.y2 - n.y1), n.style?.strokeWidth ?? 1);
        return `<div ${key} style="${css({ ...base, left: px(Math.min(n.x1, n.x2) + dx), top: px(Math.min(n.y1, n.y2) + dy), width: px(w), height: px(h), background: n.style?.stroke ?? 'currentColor', opacity: n.style?.strokeOpacity })}"></div>`;
      }
      if (n.kind === 'label') {
        const tx = n.anchor === 'middle' ? '-50%' : n.anchor === 'end' ? '-100%' : '0';
        const ty = n.baseline === 'middle' ? '-50%' : n.baseline === 'hanging' ? '0' : '-85%';
        return `<span ${key} style="${css({ ...base, left: px(n.x + dx), top: px(n.y + dy), transform: `translate(${tx},${ty})`, 'white-space': 'nowrap', 'font-size': n.fontSize ? px(n.fontSize) : undefined, color: n.style?.fill })}">${esc(n.text)}</span>`;
      }
      return '';
    })
    .join('');
}

const rootAttrs = (scene: ChartScene, o: RenderChartOptions): string =>
  `class="html-chart ${esc(o.className ?? '')}" role="img" aria-roledescription="chart" aria-label="${esc(o.ariaLabel)}" tabindex="${o.tabIndex ?? 0}" style="position:relative;width:${scene.width}px;height:${scene.height}px"`;

const htmlRenderer: ChartRenderer = {
  id: 'showcase-html',
  // Deterministic markup for a scene: the same string render() would produce.
  prerender: (scene, o) => `<div ${rootAttrs(scene, o)}>${paint(scene.nodes)}</div>`,
  mount(container) {
    // Adopt a compatible server root if there is one, else create it.
    let root = container.querySelector<HTMLElement>('.html-chart');
    if (!root) {
      root = document.createElement('div');
      container.append(root);
    }
    const el = root;
    let current: ChartScene | null = null;
    const surface: ChartSurface = {
      renderer: htmlRenderer,
      get element() {
        return el;
      },
      render(scene, options) {
        current = scene;
        el.className = `html-chart ${options.className ?? ''}`;
        el.setAttribute('role', 'img');
        el.setAttribute('aria-roledescription', 'chart');
        el.setAttribute('aria-label', options.ariaLabel);
        el.tabIndex = options.tabIndex ?? 0;
        Object.assign(el.style, { position: 'relative', width: `${scene.width}px`, height: `${scene.height}px` });
        el.innerHTML = paint(scene.nodes);
      },
      // The root is laid out at scene size, so client coordinates differ by the root's offset only.
      clientToScene(_scene, x, y) {
        const r = el.getBoundingClientRect();
        return { x: x - r.left, y: y - r.top };
      },
      paintFocus(focus) {
        for (const n of el.querySelectorAll<HTMLElement>('[data-focused]')) {
          n.style.outline = '';
          n.removeAttribute('data-focused');
        }
        if (!focus || !current) return;
        const find = (nodes: readonly SceneNode[]): string | undefined => {
          for (const n of nodes) {
            if (n.kind === 'group') {
              const k = find(n.children);
              if (k) return k;
            } else if ('interaction' in n && n.interaction?.point?.key === focus.primary.key) return n.key;
          }
          return undefined;
        };
        const key = find(current.nodes);
        const target = key ? el.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`) : null;
        if (target) {
          target.style.outline = '2px solid #facc15';
          target.setAttribute('data-focused', '');
        }
      },
      destroy: () => el.remove(),
    };
    return surface;
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the outline comes from this renderer\'s paintFocus, the tooltip from the host.' });
  if (stage.preview) stage.height -= 4;

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', radius: 3 })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChartRenderer(stage.box, { definition, renderer: htmlRenderer, height: stage.height, ariaLabel: 'Revenue painted as HTML boxes' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
