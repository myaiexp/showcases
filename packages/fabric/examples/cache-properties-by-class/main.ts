// cacheProperties and stateProperties lists, class by class
import { Canvas, Circle, Ellipse, FabricObject, FabricText, Group, Line, Path, Polygon, Rect, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { codePanel } from '../../shared/code-panel.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const make = {
  Rect: () => new Rect({ width: 90, height: 60, rx: 10, ry: 10, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 3 }),
  Circle: () => new Circle({ radius: 36, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 3 }),
  Ellipse: () => new Ellipse({ rx: 50, ry: 30, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 3 }),
  Polygon: () => new Polygon([{ x: 0, y: 0 }, { x: 70, y: 10 }, { x: 40, y: 60 }], { fill: '#ffe9a8', stroke: '#d99a1c', strokeWidth: 3 }),
  Path: () => new Path('M 0 0 C 40 -40 80 40 120 0', { fill: '', stroke: '#3b7dd8', strokeWidth: 4 }),
  Line: () => new Line([0, 0, 90, 40], { stroke: '#e94b3c', strokeWidth: 4 }),
  FabricText: () => new FabricText('Fabric', { fontSize: 36, fill: '#2b2a33' }),
  Textbox: () => new Textbox('A text box that wraps', { width: 110, fontSize: 18, fill: '#2b2a33' }),
  Group: () => new Group([new Rect({ width: 60, height: 40, fill: '#cfe3ff' }), new Circle({ radius: 18, fill: '#e94b3c' })]),
} as const;
const classes = { Rect, Circle, Ellipse, Polygon, Path, Line, FabricText, Textbox, Group };
type Name = keyof typeof make;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['an instance', 'Class.cacheProperties'],
    scene: [200, 200],
    hint: 'Each class extends the base list with the properties its drawing depends on. A set() of any listed name marks the object dirty; the group of a child is dirtied by stateProperties too.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const text = codePanel(pb, stage.preview);

  let current: FabricObject | null = null;
  const show = (name: Name): void => {
    if (current) canvas.remove(current);
    current = make[name]();
    current.set({ left: 100, top: 100 });
    canvas.add(current);
    canvas.requestRenderAll();
    const own = classes[name].cacheProperties;
    const extra = own.filter((p) => !FabricObject.cacheProperties.includes(p));
    text(
      `${name}.cacheProperties (${own.length})\n${own.join(', ')}\n\nadded to FabricObject's ${FabricObject.cacheProperties.length}:\n${extra.join(', ') || '(none)'}\n\nFabricObject.stateProperties (${FabricObject.stateProperties.length}):\n${FabricObject.stateProperties.join(', ')}`,
    );
  };
  const names = Object.keys(make) as Name[];
  show('Rect');
  if (stage.bar) select(stage.bar, 'class', names, show, 'Rect');
  else {
    let i = 0;
    stage.every(1800, () => show(names[++i % names.length]!));
  }
  return stage.dispose;
};

export default mount;
