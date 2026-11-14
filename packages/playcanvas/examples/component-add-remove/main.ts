// Components: addComponent, the entity.render shortcut, enabled, removeComponent
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 7, pitch: -25, autoRotate: 12 }, floor: 10 });
  const { app } = scene;

  // An entity starts as just a transform; its abilities come from components.
  const thing = new pc.Entity('thing');
  thing.setLocalPosition(0, 1, 0);
  app.root.addChild(thing);
  const mat = material('#4ab3e8', { gloss: 0.6 });
  const lampColour = new pc.Color(1, 0.7, 0.4);

  const has = (): string => ['render', 'light'].map((n) => `${n}: ${thing.c[n] ? 'yes' : 'no'}`).join('   ');
  let message = 'The entity has no components yet.';
  const say = (m: string): void => {
    message = m;
  };

  const addRender = (): void => {
    const c = thing.addComponent('render', { type: 'box', material: mat });
    say(c ? "addComponent('render') returned the component, also thing.render" : "addComponent('render') returned null: it already has one");
  };
  const addLight = (): void => {
    const c = thing.addComponent('light', { type: 'omni', color: lampColour, range: 9, intensity: 2 });
    say(c ? "addComponent('light') returned the component, also thing.light" : "addComponent('light') returned null: it already has one");
  };

  let t = 0;
  let phase = -1;
  app.on('update', (dt: number) => {
    t += dt;
    thing.rotate(20 * dt, 40 * dt, 0);
    if (ctx.preview) {
      // Cards walk through the life of the components: add, switch off, remove.
      const p = Math.floor(t / 1.5) % 6;
      if (p === phase) return;
      phase = p;
      if (p === 0) addRender();
      if (p === 1) addLight();
      if (p === 2) thing.render!.enabled = false;
      if (p === 3) thing.render!.enabled = true;
      if (p === 4) thing.removeComponent('render');
      if (p === 5) thing.removeComponent('light');
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button("addComponent('render', { type: 'box' })", addRender);
    panel.button("addComponent('light', { type: 'omni' })", addLight);
    panel.row();
    panel.button('render.enabled = false', () => thing.render && ((thing.render.enabled = false), say('Disabled: not drawn, but the settings are kept.')));
    panel.button('render.enabled = true', () => thing.render && ((thing.render.enabled = true), say('Enabled again, exactly as it was.')));
    panel.button("removeComponent('render')", () => (thing.removeComponent('render'), say('Removed: the component and its settings are gone.')));
    panel.button("removeComponent('light')", () => (thing.removeComponent('light'), say('Removed the light.')));
    panel.row();
    const out = panel.readout();
    app.on('update', () => (out.textContent = `${has()}   |   ${message}`));
  }

  return () => scene.dispose();
};

export default mount;
