// What compile returns: the laid-out shapes, connections and render options
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const source = `direction: right
vars: {
  d2-config: {
    sketch: true
  }
}
web: Web app
api: API {shape: hexagon}
db: Postgres {shape: cylinder}
web -> api: REST
api -> db: SQL
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const panel = stage.side('compile() result');
  try {
    const d2 = await stage.d2();
    const result = await d2.compile(source, { themeID: 200, pad: 24 });
    const svg = await d2.render(result.diagram, result.renderOptions);
    stage.show(svg);

    // Every shape has its laid-out box; every connection its route of points.
    const lines = [
      ...result.diagram.shapes.map(
        (s) => `${s.id}: ${s.type || 'rectangle'} at (${s.pos.x}, ${s.pos.y}), ${s.width}×${s.height}`,
      ),
      ...result.diagram.connections.map((c) => `${c.id}: ${c.route.length} route points, label "${c.label}"`),
    ];
    if (panel) {
      const pre = document.createElement('pre');
      pre.className = 'dd-pre';
      const { sketch, themeID, pad } = result.renderOptions;
      pre.textContent = [
        'diagram.shapes / diagram.connections:',
        ...lines,
        '',
        'renderOptions (d2-config merged in):',
        JSON.stringify({ sketch, themeID, pad }),
        '',
        `graph.objects: ${result.graph.objects.length}, graph.edges: ${result.graph.edges.length}`,
      ].join('\n');
      panel.append(pre);
      stage.say(`${result.diagram.shapes.length} shapes and ${result.diagram.connections.length} connections laid out`);
    } else {
      let i = 0;
      const next = (): void => stage.say(lines[i++ % lines.length]!);
      next();
      stage.every(1800, next);
    }
  } catch (err) {
    stage.fail(err);
  }
  return () => stage.dispose();
};

export default mount;
