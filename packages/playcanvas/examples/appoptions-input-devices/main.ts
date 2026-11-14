// AppOptions: input devices and other features stay null unless you set them
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createBaseApp, type BaseApp } from '../../shared/appbase.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

type Flags = { mouse: boolean; keyboard: boolean; touch: boolean; gamepads: boolean; soundManager: boolean; batchManager: boolean };

const mount: Mount = async (el, ctx) => {
  const holder = document.createElement('div');
  el.append(holder);
  const flags: Flags = { mouse: true, keyboard: false, touch: false, gamepads: false, soundManager: false, batchManager: false };
  let base: BaseApp | null = null;
  let readouts: HTMLElement | null = null;
  let disposed = false;

  const build = async (): Promise<void> => {
    base?.dispose();
    const next = await createBaseApp(holder, ctx, {
      systems: [pc.RenderComponentSystem, pc.CameraComponentSystem, pc.LightComponentSystem],
      options(o, canvas) {
        // Each device exists on the app only because it is set here.
        if (flags.mouse) o.mouse = new pc.Mouse(canvas);
        if (flags.keyboard) o.keyboard = new pc.Keyboard(window);
        if (flags.touch) o.touch = new pc.TouchDevice(canvas);
        if (flags.gamepads) o.gamepads = new pc.GamePads();
        if (flags.soundManager) o.soundManager = new pc.SoundManager();
        if (flags.batchManager) o.batchManager = pc.BatchManager;
      },
    });
    if (disposed) return next.dispose();
    base = next;
    const { app } = next;

    const camera = new pc.Entity('camera');
    camera.addComponent('camera', { clearColor: new pc.Color(0.1, 0.12, 0.2) });
    camera.setPosition(0, 1, 4);
    camera.lookAt(0, 0, 0);
    app.root.addChild(camera);
    const light = new pc.Entity('light');
    light.addComponent('light');
    light.setEulerAngles(45, 40, 0);
    app.root.addChild(light);

    const idle = material('#4ab3e8');
    const active = material('#7bc67b');
    const box = new pc.Entity('box');
    box.addComponent('render', { type: 'box', material: idle });
    app.root.addChild(box);
    // The box turns green while the left mouse button is held, and spins faster on Space.
    app.on('update', (dt: number) => {
      const held = !!app.mouse?.isPressed(pc.MOUSEBUTTON_LEFT);
      box.render!.material = held ? active : idle;
      box.rotate(0, (app.keyboard?.isPressed(pc.KEY_SPACE) ? 240 : 30) * dt, 0);
    });

    if (readouts) {
      const names = ['mouse', 'keyboard', 'touch', 'gamepads', 'soundManager', 'batchManager', 'xr', 'lightmapper'] as const;
      const rec = app as unknown as Record<string, unknown>;
      readouts.textContent = names.map((n) => `app.${n}: ${rec[n] ? 'set' : 'null'}`).join('   ');
    }
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    for (const key of Object.keys(flags) as (keyof Flags)[]) panel.check(key, flags[key], (on) => (flags[key] = on));
    panel.button('Rebuild the app', () => void build());
    panel.row();
    readouts = panel.readout();
    panel.row();
    panel.readout('Hold the mouse on the canvas, or hold Space, once the matching device is set.');
  }
  await build();

  return () => {
    disposed = true;
    base?.dispose();
  };
};

export default mount;
