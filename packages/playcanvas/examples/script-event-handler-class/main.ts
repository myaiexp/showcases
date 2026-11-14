// A plain class extending EventHandler: on, once, off handles and hasEvent
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog, tint } from '../../shared/scripting.ts';

// Any object can be an event source: extend EventHandler.
class Tank extends pc.EventHandler {
  level = 0;
  add(amount: number): void {
    const before = this.level;
    this.level = pc.math.clamp(before + amount, 0, 10);
    if (this.level === before) return;
    this.fire('change', this.level, before);
    if (this.level === 10) this.fire('full');
    if (this.level === 0) this.fire('empty');
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 10, orbit: { distance: 8, pitch: -20 } });
  const { app } = scene;
  const out = createLog(el, ctx, 7);

  const gauge = addBox(app.root, 'gauge', '#4ab3e8', [0, 0.1, 0]);
  gauge.setLocalScale(1.4, 0.2, 1.4);
  const frame = addBox(app.root, 'frame', '#2a2e3a', [0, 2.5, 0]);
  frame.setLocalScale(2, 5, 0.2);
  frame.setLocalPosition(0, 2.5, -1);

  const tank = new Tank();
  // on() returns a handle; handle.off() removes just that listener.
  const view = tank.on('change', (level: number) => {
    gauge.setLocalScale(1.4, Math.max(0.1, level * 0.5), 1.4);
    gauge.setLocalPosition(0, Math.max(0.05, level * 0.25), 0);
  });
  tank.on('full', () => {
    tint(gauge, '#e8794a');
    out.log('full: gauge turns orange');
  });
  tank.on('empty', () => {
    tint(gauge, '#4ab3e8');
    out.log('empty: gauge turns blue');
  });
  tank.on('change', (level: number, before: number) => out.log(`change ${before} -> ${level}`));
  // once() unregisters itself after its first call.
  tank.once('full', () => out.log('once(full): this line prints only the first time'));

  if (ctx.preview) {
    let t = 0;
    let dir = 1;
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 0.25) return;
      t = 0;
      if (tank.level >= 10) dir = -1;
      if (tank.level <= 0) dir = 1;
      tank.add(dir);
    });
  } else {
    const panel = createPanel(el);
    const state = panel.readout();
    const refresh = (): void => {
      state.textContent = `level ${tank.level} | hasEvent('change') ${tank.hasEvent('change')} | hasEvent('full') ${tank.hasEvent('full')}`;
    };
    panel.row();
    panel.button('add 3', () => tank.add(3));
    panel.button('remove 3', () => tank.add(-3));
    panel.button('handle.off() (gauge stops moving)', () => view.off());
    panel.button("tank.off('full')", () => tank.off('full'));
    app.on('update', refresh);
  }
  return () => {
    tank.off();
    scene.dispose();
  };
};

export default mount;
