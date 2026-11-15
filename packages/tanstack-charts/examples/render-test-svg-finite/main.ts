// An SVG test in the page: parse the string, assert structure, scan for non-finite numbers
import { createChartScene, createMark, defineChart, renderChartSvg } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch on the broken mark: the structure checks still pass, the finite check does not.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 58;
  const readout = stage.preview ? null : stage.readout();

  const dots = (broken: boolean) =>
    createMark<unknown, never, never>(({ markIndex }) => ({
      id: `dots-${markIndex}`,
      channels: {},
      render({ chart }) {
        const nodes: SceneNode[] = Array.from({ length: 6 }, (_, i) => ({
          kind: 'dot',
          key: `d${i}`,
          // A division by zero is the usual way geometry becomes NaN or Infinity.
          x: broken && i === 3 ? chart.x / 0 - chart.x / 0 : chart.x + ((i + 0.5) * chart.width) / 6,
          y: chart.y + chart.height / 2 + Math.sin(i) * 30,
          radius: 8,
          style: { fill: '#60a5fa' },
        }));
        return { nodes };
      },
    }));

  const run = (broken: boolean): void => {
    const scene = createChartScene(defineChart({ marks: [dots(broken)], scales: { x: null, y: null } }), { width: 420, height: 140 });
    const markup = renderChartSvg(scene, { ariaLabel: 'Six dots', ariaDescription: 'A row of dots.' });
    stage.box.innerHTML = markup;
    const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
    const root = doc.documentElement;
    const checks: readonly (readonly [string, boolean])[] = [
      ['root is an svg with role img', root.localName === 'svg' && root.getAttribute('role') === 'img'],
      ['accessible name is present', (root.getAttribute('aria-label') ?? '') !== ''],
      [`six circles (found ${doc.querySelectorAll('circle').length})`, doc.querySelectorAll('circle').length === 6],
      ['no NaN, Infinity or undefined in the markup', !/NaN|Infinity|undefined/.test(markup)],
    ];
    const lines = checks.map(([name, ok]) => `${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (readout) readout.textContent = lines.join('\n');
    else stage.say(lines.filter((l) => l.startsWith('FAIL')).join('; ') || 'all 4 structure checks pass');
  };
  run(false);
  if (stage.bar) checkbox(stage.bar, 'one dot with NaN geometry', false, run);
  else stage.cycle([false, true], 2200, run);
  return () => stage.dispose();
};

export default mount;
