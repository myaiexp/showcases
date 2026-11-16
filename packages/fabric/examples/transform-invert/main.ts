// Transformations: invertTransform undoes viewport and object matrices to find a click inside the object
import { Canvas, Circle, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Click anywhere. The pointer position in element pixels is sent back through the inverse of (viewport x object) to a point in the rectangle\'s own axes: (0, 0) is its centre.' });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = status(stage, 'click on the canvas');

  const rect = new Rect({ left: 170, top: 120, width: 140, height: 80, scaleX: 1.2, scaleY: 1, angle: 25, fill: '#d99a1cbb', selectable: false, evented: false });
  const marker = new Circle({ radius: 5, fill: '#e94b3c', stroke: '#fff', strokeWidth: 2, selectable: false, evented: false, visible: false });
  canvas.add(rect, marker);

  // the rectangle's own x and y axes, drawn through the same matrices
  canvas.on('after:render', ({ ctx: c }) => {
    c.save();
    c.transform(...util.multiplyTransformMatrices(canvas.viewportTransform, rect.calcTransformMatrix()));
    c.lineWidth = 1.5 / canvas.getZoom();
    c.strokeStyle = '#e94b3c';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(70, 0); c.stroke();
    c.strokeStyle = '#2e9e5b';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 40); c.stroke();
    c.restore();
  });

  const probe = (viewportPoint: Point): void => {
    const mCanvas = canvas.viewportTransform;
    const mObject = rect.calcTransformMatrix();
    const mTotal = util.multiplyTransformMatrices(mCanvas, mObject); // the order matters
    const mInverse = util.invertTransform(mTotal);
    const local = viewportPoint.transform(mInverse);
    marker.set('visible', true);
    marker.setPositionByOrigin(viewportPoint.transform(util.invertTransform(mCanvas)), 'center', 'center');
    marker.setCoords();
    const inside = Math.abs(local.x) <= rect.width / 2 && Math.abs(local.y) <= rect.height / 2;
    say(`${stage.preview ? '' : `pixel (${Math.round(viewportPoint.x)}, ${Math.round(viewportPoint.y)}) -> `}object (${local.x.toFixed(0)}, ${local.y.toFixed(0)})  ${inside ? 'inside' : 'outside'}`);
    canvas.requestRenderAll();
  };
  canvas.on('mouse:down', (e) => probe(e.viewportPoint));

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    const spots = [new Point(170, 120), new Point(220, 150), new Point(110, 90), new Point(60, 190), new Point(260, 60)];
    let i = 0;
    stage.repeat(async () => {
      await ghost.click(spots[i++ % spots.length]!);
      await stage.wait(900);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
