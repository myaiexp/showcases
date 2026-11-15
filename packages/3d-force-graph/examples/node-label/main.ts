// Node styling: nodeLabel as an attribute, an HTML string or an HTML element, shown on hover
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { degrees, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const FORMS = ['attribute: name', 'HTML string', 'HTML element'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a person. The tooltip is whatever nodeLabel returns for that node.' });
  const data = team() as TData;
  const deg = degrees(data);
  const teams = ['Platform', 'Design', 'Data'];

  const html = (n: TNode): string =>
    `<div style="padding:4px 8px;border-radius:6px;background:#1a1b2e;border:1px solid #7aa2f7">
       <b style="color:#7aa2f7">${n.name!}</b><br><small>${teams[n.group! - 1]} team, ${deg.get(n.id) ?? 0} links</small></div>`;
  const element = (n: TNode): HTMLElement => {
    const box = document.createElement('div');
    box.style.cssText = 'padding:4px 8px;border-radius:6px;background:#2e1a1a;border:1px solid #ff9e64;color:#ffd9bd';
    box.textContent = `${n.name} · ${teams[n.group! - 1]}`;
    return box;
  };

  const graph = stage.own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>).graphData(data).nodeLabel(html);
  const use = (form: (typeof FORMS)[number]): void => {
    if (form === FORMS[0]) graph.nodeLabel('name');
    else if (form === FORMS[1]) graph.nodeLabel(html);
    else graph.nodeLabel(element);
  };

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 10));
    const tour = ['Ada', 'Hana', 'Kai', 'Cleo'];
    let i = 0;
    stage.every(1800, () => {
      const name = tour[i++ % tour.length];
      const target = data.nodes.find((n) => n.id === name);
      if (target) ghost.node(target);
    });
  }

  if (stage.bar) select(stage.bar, 'nodeLabel', FORMS, use, FORMS[1]);

  return stage.dispose;
};

export default mount;
