// A Graph given a device never destroys it: destroy one, build the next on it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { resetZoom } from '../../shared/reset-zoom.ts';
import { communities, ring } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The page made the device, so the page destroys it. Graphs come and go on it.' });
  const rb = rebuilder(stage); // rb.device is the Promise<Device> handed to every Graph
  const log = stage.side();
  const lines: string[] = [];
  let n = 0;
  let alive = false;

  const note = async (text: string): Promise<void> => {
    const device = await rb.device;
    lines.push(`${text}\n  device.isLost: ${device.isLost}`);
    if (log) log.textContent = lines.slice(-8).join('\n');
    stage.say(`${text} (device.isLost: ${device.isLost})`, device.isLost ? 'bad' : 'ok');
  };

  // Each call builds a whole new Graph on the same device: the third constructor argument.
  const build = async (): Promise<void> => {
    n++;
    const rings = n % 2 === 1;
    const data = rings ? ring(60, 120) : communities(3, 30, n);
    resetZoom(stage.div);
    const graph = rb.adopt(
      new Graph(stage.div, { pointDefaultSize: 7, linkDefaultColor: '#667', enableSimulation: !rings, fitViewDelay: 800 }, rb.device),
    );
    graph.setPointPositions(data.positions);
    graph.setPointColors(colors(data.count, (i) => paletteColor(rings ? i : (data.group[i] ?? 0))));
    graph.setLinks(data.links);
    graph.render();
    alive = true;
    await note(`graph ${n} built on the device`);
  };
  const drop = async (): Promise<void> => {
    alive = false;
    rb.current?.destroy(); // frees the graph's own resources, leaves the device alone
    await note(`graph ${n}.destroy() called`);
  };

  if (stage.preview) stage.every(1500, () => alive && rb.current?.fitView(600, 0.15));
  stage.button('Build a graph', () => void build());
  stage.button('Destroy the graph', () => void drop());
  stage.cycle([{ run: build }, { run: drop, hold: 1400 }], 2200);
  return () => stage.dispose();
};

export default mount;
