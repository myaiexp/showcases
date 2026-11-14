// FramePass lifecycle: call order, nested passes, enabled and executeEnabled
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, screenMaterial } from '../../shared/advanced-feed.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

/** A pass that does no drawing: it only records which of its methods the frame calls. */
class ProbePass extends pc.FramePass {
  private trace: string[];

  constructor(device: pc.GraphicsDevice, name: string, trace: string[]) {
    super(device);
    this.name = name;
    this.trace = trace;
  }
  private note(method: string): void {
    this.trace.push(`${this.name}.${method}`);
  }
  override frameUpdate(): void {
    this.note('frameUpdate');
  }
  override before(): void {
    this.note('before');
  }
  override execute(): void {
    this.note('execute');
  }
  override after(): void {
    this.note('after');
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 12, pitch: -10, yaw: 10, autoRotate: 0, floor: false, clear: '#12151d' });
  const { app, stage } = scene;
  const device = stage.device;
  const cameraComponent = scene.camera.camera!;

  // outer has one pass before it and one after it; all three sit in camera.afterPasses as one unit.
  const trace: string[] = [];
  const outer = new ProbePass(device, 'outer', trace);
  const nested = [new ProbePass(device, 'nestedBefore', trace), new ProbePass(device, 'nestedAfter', trace)];
  outer.beforePasses.push(nested[0]!);
  outer.afterPasses.push(nested[1]!);
  outer.onBefore = () => trace.push('outer.onBefore');
  outer.onAfter = () => trace.push('outer.onAfter');
  cameraComponent.afterPasses.push(outer);

  // The trace of the last frame is drawn on a board in the scene.
  const paper = document.createElement('canvas');
  paper.width = 512;
  paper.height = 384;
  const g = paper.getContext('2d')!;
  const board = new pc.Texture(device, {
    name: 'trace-board',
    width: 512,
    height: 384,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  board.setSource(paper);
  const boardMaterial = screenMaterial(board);
  const screen = addScreen(app, boardMaterial, [0, 0.6, 0], 8, 6);

  let last: string[] = [];
  const draw = (): void => {
    g.fillStyle = '#0d1117';
    g.fillRect(0, 0, 512, 384);
    g.font = 'bold 20px monospace';
    g.fillStyle = '#9fb3c8';
    g.fillText(`enabled: ${outer.enabled}   executeEnabled: ${outer.executeEnabled}`, 16, 30);
    g.font = '19px monospace';
    if (last.length === 0) {
      g.fillStyle = '#ff8a5c';
      g.fillText('(nothing called: the pass was skipped)', 16, 70);
    }
    last.forEach((line, i) => {
      g.fillStyle = line.startsWith('outer') ? '#7bc67b' : '#4ab3e8';
      g.fillText(`${i + 1}. ${line}`, 16, 66 + i * 24);
    });
    board.upload();
  };
  app.on('update', () => (trace.length = 0)); // a fresh trace for each frame...
  app.on('frameend', () => (last = trace.slice())); // ...kept once the frame has rendered
  let next = 0;
  let toggle = 0;
  onTick(app, (t) => {
    if (t > next) {
      next = t + 0.2;
      draw();
    }
    // A card has no controls: it cycles through the states instead.
    if (ctx.preview && t > toggle) {
      toggle = t + 2;
      const phase = Math.floor(t / 2) % 3;
      outer.enabled = phase !== 1;
      outer.executeEnabled = phase !== 2;
    }
  });

  // some life in the scene too
  const spinner = new pc.Entity('spinner');
  spinner.addComponent('render', { type: 'torus', material: colorMaterial('#f2c14e'), castShadows: false });
  spinner.setLocalPosition(0, 4.3, 0);
  spinner.setLocalScale(1.1, 1.1, 1.1);
  app.root.addChild(spinner);
  onTick(app, (t) => spinner.setLocalEulerAngles(t * 80, t * 50, 0));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('outer.enabled', true, (on) => (outer.enabled = on)); // skips the pass and its nested passes
    panel.check('outer.executeEnabled', true, (on) => (outer.executeEnabled = on)); // skips execute only
    panel.row();
    panel.readout('Enabled off: no calls at all. ExecuteEnabled off: everything but execute still runs.');
  }

  return () => {
    cameraComponent.afterPasses.splice(cameraComponent.afterPasses.indexOf(outer), 1);
    // A pass does not destroy its nested passes either.
    [outer, ...nested].forEach((p) => p.destroy());
    boardMaterial.destroy();
    board.destroy();
    screen.destroy();
    scene.dispose();
  };
};

export default mount;
