// AppBase runs only the component systems you list; addComponent returns null
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createBaseApp } from '../../shared/appbase.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const NAMES = ['render', 'camera', 'light', 'script', 'particlesystem', 'sound', 'audiolistener', 'anim', 'element', 'screen'] as const;

const mount: Mount = async (el, ctx) => {
  // Only these three systems are imported by this app, so only these components exist.
  const base = await createBaseApp(el, ctx, {
    systems: [pc.RenderComponentSystem, pc.CameraComponentSystem, pc.LightComponentSystem],
    handlers: [pc.TextureHandler, pc.ContainerHandler],
  });
  const { app } = base;

  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.1, 0.12, 0.2) });
  camera.setPosition(0, 1.2, 4);
  camera.lookAt(0, 0, 0);
  app.root.addChild(camera);

  const light = new pc.Entity('light');
  light.addComponent('light');
  light.setEulerAngles(45, 40, 0);
  app.root.addChild(light);

  const box = new pc.Entity('box');
  box.addComponent('render', { type: 'box', material: material('#e8794a') });
  app.root.addChild(box);
  app.on('update', (dt: number) => box.rotate(15 * dt, 30 * dt, 0));

  if (!ctx.preview) {
    const registered = NAMES.filter((n) => (app.systems as unknown as Record<string, unknown>)[n]);
    const panel = createPanel(el);
    panel.readout(`app.systems has: ${registered.join(', ')}`);
    panel.row();
    const probe = new pc.Entity('probe');
    app.root.addChild(probe);
    const out = panel.readout('Pick a component and try adding it to a spare entity.');
    let name: string = 'sound';
    panel.select('component', NAMES, 'sound', (v) => (name = v));
    panel.button('addComponent()', () => {
      if (probe.c[name]) probe.removeComponent(name);
      const added = probe.addComponent(name);
      out.textContent = added ? `addComponent('${name}') returned a ${added.constructor.name}` : `addComponent('${name}') returned null: its system is not registered`;
    });
  }

  return () => base.dispose();
};

export default mount;
