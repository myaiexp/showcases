// initialize, postInitialize, update and postUpdate across three entities
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

class Stepper extends pc.Script {
  static override scriptName = 'stepper';
  label = '';
  say: (text: string) => void = () => {};
  private frames = 0;

  initialize(): void {
    this.say(`${this.label}.initialize`);
    this.entity.setLocalScale(0.3, 0.3, 0.3);
  }
  postInitialize(): void {
    // Every enabled script's initialize has finished by now.
    this.say(`${this.label}.postInitialize`);
    this.entity.setLocalScale(1, 1, 1);
  }
  update(dt: number): void {
    if (this.frames === 0) this.say(`${this.label}.update`);
    this.entity.rotate(0, 70 * dt, 0);
  }
  postUpdate(): void {
    // Runs after every script's update for this frame.
    if (this.frames++ === 0) this.say(`${this.label}.postUpdate`);
  }
}

const COLOURS = ['#e8794a', '#f2c14e', '#4ab3e8'];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, orbit: { distance: 8, pitch: -25 } });
  const { app } = scene;
  const out = createLog(el, ctx, 13);
  let group: pc.Entity | null = null;

  // The group is built detached: no script runs until it joins the scene.
  const build = (): void => {
    group?.destroy();
    out.clear();
    group = new pc.Entity('group');
    ['A', 'B', 'C'].forEach((label, i) => {
      const box = addBox(group!, label, COLOURS[i]!, [(i - 1) * 2.4, 1, 0]);
      box.addComponent('script');
      box.script!.create(Stepper, { properties: { label, say: out.log } });
    });
    out.log('-- group added to app.root --');
    app.root.addChild(group);
  };
  build();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Rebuild and replay', build);
  }
  return () => scene.dispose();
};

export default mount;
