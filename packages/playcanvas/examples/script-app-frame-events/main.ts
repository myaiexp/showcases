// The order of app events and script methods through start and one frame
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

// Reports each method to the app's log event, and only while the log is open.
class Probe extends pc.Script {
  static override scriptName = 'probe';
  private note(name: string): void {
    this.app.fire('trace', `script.${name}`);
  }
  initialize(): void {
    this.note('initialize');
  }
  postInitialize(): void {
    this.note('postInitialize');
  }
  update(dt: number): void {
    this.note('update');
    this.entity.rotate(0, 45 * dt, 0);
  }
  postUpdate(): void {
    this.note('postUpdate');
  }
}

const APP_EVENTS = ['start', 'initialize', 'postinitialize', 'frameupdate', 'update', 'framerender', 'prerender', 'postrender', 'frameend'];

const mount: Mount = async (el, ctx) => {
  // manualStart keeps the app stopped, so listeners exist before the start event fires.
  const scene = await createScene(el, ctx, { floor: 10, manualStart: true, orbit: { distance: 7, pitch: -25 } });
  const { app } = scene;
  const out = createLog(el, ctx, 19);

  let framesToLog = 1;
  let logging = true;
  app.on('trace', (text: string) => logging && out.log(`   ${text}`));
  for (const name of APP_EVENTS) {
    app.on(name, () => {
      if (name === 'frameupdate') {
        logging = framesToLog > 0;
        if (logging) framesToLog--;
        if (logging) out.log(`-- frame ${app.frame + 1} --`);
      }
      if (logging) out.log(`app '${name}'`);
    });
  }

  const box = addBox(app.root, 'probe', '#4ab3e8', [0, 1, 0], 1.6);
  box.addComponent('script');
  box.script!.create(Probe);

  // Entities are in the hierarchy already; start() now runs the initialisation sequence.
  app.start();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('log the next frame', () => (framesToLog += 1));
  }
  return () => scene.dispose();
};

export default mount;
