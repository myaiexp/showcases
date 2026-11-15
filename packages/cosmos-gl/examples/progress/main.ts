// graph.progress and the alpha from onSimulationTick drawn as two bars
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

function bar(parent: HTMLElement, top: number, color: string, label: string): { set(v: number): void } {
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:absolute;left:8px;right:8px;top:${top}px;height:10px;background:#ffffff18;border-radius:5px;pointer-events:none`;
  const fill = document.createElement('div');
  fill.style.cssText = `height:100%;width:0;background:${color};border-radius:5px`;
  const text = document.createElement('span');
  text.style.cssText = 'position:absolute;left:6px;top:-1px;font:9px/12px sans-serif;color:#fff;mix-blend-mode:difference';
  wrap.append(fill, text);
  parent.append(wrap);
  return {
    set(v) {
      fill.style.width = `${Math.max(0, Math.min(1, v)) * 100}%`;
      text.textContent = `${label} ${v.toFixed(2)}`;
    },
  };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Restart the layout and watch progress rise while alpha falls.' });
  const data = tree(130, 31);
  let alpha = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 1500,
        fitViewDelay: 1200,
        onSimulationTick: (a) => (alpha = a),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const progressBar = bar(stage.div, 6, '#6aa8ff', 'graph.progress');
  const alphaBar = bar(stage.div, 22, '#ffa860', 'alpha (onSimulationTick)');
  let frame = 0;
  const draw = (): void => {
    frame = requestAnimationFrame(draw);
    if (!graph.isReady) return;
    progressBar.set(graph.progress);
    alphaBar.set(alpha);
  };
  frame = requestAnimationFrame(draw);
  stage.onDispose(() => cancelAnimationFrame(frame));

  const restart = (): void => {
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    graph.start(1);
  };
  stage.button('Restart', restart);
  stage.say('graph.progress runs from 0 (start) to 1 (end); alpha falls from 1 toward 0');
  if (stage.preview) stage.every(5000, restart);
  return () => stage.dispose();
};

export default mount;
