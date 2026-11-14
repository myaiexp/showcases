// Engine API inside a script: this.entity, this.app, find methods, components
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { tint } from '../../shared/scripting.ts';

class Enemy extends pc.Script {
  static override scriptName = 'enemy';
  radius = 5;
  speed = 1;
  private a = Math.random() * 6;
  private flash = 0;

  initialize(): void {
    this.entity.tags.add('enemy');
    // Application events reach scripts that hold no reference to each other.
    this.app.on('enemy:hit', this.onHit, this);
    this.once('destroy', () => this.app.off('enemy:hit', this.onHit, this));
  }
  onHit(who: pc.Entity): void {
    if (who === this.entity) {
      this.flash = 0.35;
      tint(this.entity, '#ffffff');
    }
  }
  update(dt: number): void {
    this.a += dt * this.speed;
    this.entity.setPosition(Math.cos(this.a) * this.radius, 1 + Math.sin(this.a * 2) * 0.5, Math.sin(this.a) * this.radius);
    if (this.flash > 0 && (this.flash -= dt) <= 0) tint(this.entity, '#e8794a');
  }
}

class Turret extends pc.Script {
  static override scriptName = 'turret';
  private barrel!: pc.GraphNode;
  private muzzle!: pc.Entity;
  private cooldown = 0;
  hits = 0;

  initialize(): void {
    // Relative to this script's entity: a path through the children.
    this.barrel = this.entity.findByName('Barrel')!;
    this.muzzle = this.entity.findByPath('Barrel/Muzzle') as pc.Entity;
  }
  update(dt: number): void {
    // Searches the whole hierarchy under the application root.
    const enemies = this.app.root.findByTag('enemy') as pc.Entity[];
    const origin = this.muzzle.getPosition();
    let nearest: pc.Entity | null = null;
    for (const e of enemies) {
      if (!nearest || e.getPosition().distance(origin) < nearest.getPosition().distance(origin)) nearest = e;
    }
    // Components are properties on the entity.
    const light = this.muzzle.light!;
    light.intensity = Math.max(0, light.intensity - dt * 6);
    if (!nearest) return;

    this.barrel.lookAt(nearest.getPosition());
    this.cooldown -= dt;
    if (this.cooldown <= 0) {
      this.cooldown = 0.7;
      light.intensity = 3;
      light.color = new pc.Color(1, 0.7, 0.3);
      this.hits++;
      this.app.fire('enemy:hit', nearest);
    }
    this.app.drawLine(origin, nearest.getPosition(), pc.Color.YELLOW);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, orbit: { distance: 12, pitch: -40 } });
  const { app } = scene;

  const base = new pc.Entity('Turret');
  app.root.addChild(base);
  addShape(base, 'cylinder', material('#5a6070'), [0, 0.6, 0], [1.4, 1.2, 1.4], 'plinth');
  const barrel = addShape(base, 'box', material('#8a90a0'), [0, 1.5, 0], [0.4, 0.4, 1.6], 'Barrel');
  const muzzle = new pc.Entity('Muzzle');
  muzzle.addComponent('light', { type: 'omni', range: 5, intensity: 0 });
  muzzle.setLocalPosition(0, 0, -0.65);
  barrel.addChild(muzzle);
  base.addComponent('script');
  const turret = base.script!.create(Turret)!;

  for (let i = 0; i < 3; i++) {
    const e = addShape(app.root, 'sphere', material('#e8794a'), [0, 1, 0], 0.9, `enemy ${i}`);
    e.addComponent('script');
    e.script!.create(Enemy, { properties: { radius: 4 + i * 1.3, speed: (i % 2 ? -1 : 1) * (0.6 + i * 0.25) } });
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    const score = panel.readout();
    app.on('update', () => (score.textContent = `app.root.findByTag('enemy') found ${app.root.findByTag('enemy').length}; hits ${turret.hits}`));
  }
  return () => scene.dispose();
};

export default mount;
