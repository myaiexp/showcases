// Flappy Bird as scripts: state events, free-fall flaps, pooled pipes, trigger colliders, a restart button
import { BoxColliderShape, Camera, type ColliderShape, DynamicCollider, type Engine, type Entity, EventDispatcher, Rect, Script, SphereColliderShape, Sprite, SpriteRenderer, StaticCollider, Texture2D, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/core-kit.ts';
import { createStage } from '../../shared/stage.ts';

const State = { Idle: 0, Flying: 1, Crash: 2, Result: 3 } as const;
type State = (typeof State)[keyof typeof State];
const GROUND_Y = -3.6;
const CEILING_Y = 4.6;
const GAP = 3.2;
const SPEED = 3.2;

/** The tutorial's GameCtrl: the global state and score, dispatching changes to every script. */
class GameCtrl extends EventDispatcher {
  private _state: State = State.Idle;
  private _score = 0;
  set gameState(value: State) {
    if (this._state === value) return;
    this._state = value;
    if (value === State.Idle) this.score = 0;
    this.dispatch('State_Change', value);
  }
  get gameState(): State {
    return this._state;
  }
  set score(v: number) {
    this._score = v;
    this.dispatch('Score_Change', v);
  }
  get score(): number {
    return this._score;
  }
}
let ctrl = new GameCtrl();
/** The card plays by itself: this flag stands in for a pointer press. */
let virtualPress = false;

function sprite(engine: Engine, w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void): Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d')!, w, h);
  const t = new Texture2D(engine, w, h, undefined, false); // no mipmaps: none are generated for a canvas upload
  t.setImageSource(canvas);
  return new Sprite(engine, t, new Rect(0, 0, 1, 1), new Vector2(0.5, 0.5));
}

function show(parent: Entity, name: string, s: Sprite, w: number, h: number, x: number, y: number, priority = 0): { entity: Entity; renderer: SpriteRenderer } {
  const entity = parent.createChild(name);
  entity.transform.setPosition(x, y, 0);
  const renderer = entity.addComponent(SpriteRenderer);
  renderer.sprite = s;
  renderer.width = w;
  renderer.height = h;
  renderer.priority = priority;
  return { entity, renderer };
}

class Bird extends Script {
  private vy = 0;
  override onAwake(): void {
    ctrl.on('State_Change', (state: State) => {
      const t = this.entity.transform;
      if (state === State.Idle) {
        t.setPosition(-2.4, 0, 0);
        t.setRotation(0, 0, 0);
        this.vy = 0;
      }
    });
  }
  private flap(): void {
    this.vy = 8.5;
  }
  override onUpdate(dt: number): void {
    const t = this.entity.transform;
    const press = virtualPress || this.engine.inputManager.isPointerDown();
    virtualPress = false;
    const time = this.engine.time.elapsedTime;
    if (ctrl.gameState === State.Idle) {
      t.setPosition(-2.4, Math.sin(time * 4) * 0.25, 0); // hang, bobbing
      if (press) {
        this.flap();
        ctrl.gameState = State.Flying;
      }
    } else if (ctrl.gameState === State.Flying) {
      if (press) this.flap();
      this.vy = Math.max(-9, this.vy - 24 * dt);
      const y = Math.min(CEILING_Y, t.position.y + this.vy * dt);
      t.setPosition(-2.4, y, 0);
      t.setRotation(0, 0, Math.max(-60, Math.min(30, this.vy * 5)));
      if (y <= GROUND_Y + 0.4) ctrl.gameState = State.Crash;
    } else if (ctrl.gameState === State.Crash) {
      this.vy = Math.max(-12, this.vy - 30 * dt);
      const y = Math.max(GROUND_Y + 0.4, t.position.y + this.vy * dt);
      t.setPosition(-2.4, y, 0);
      t.setRotation(0, 0, -80);
      if (y <= GROUND_Y + 0.4) ctrl.gameState = State.Result;
    }
  }
  override onTriggerEnter(_other: ColliderShape): void {
    if (ctrl.gameState === State.Flying) ctrl.gameState = State.Crash;
  }
}

class Pipes extends Script {
  pool: Entity[] = [];
  live: Entity[] = [];
  spawnIn = 0;
  make!: () => Entity;
  override onAwake(): void {
    ctrl.on('State_Change', (state: State) => {
      if (state === State.Idle) this.reset();
    });
  }
  reset(): void {
    for (const p of this.live.splice(0)) {
      p.isActive = false;
      this.pool.push(p);
    }
    this.spawnIn = 1;
  }
  override onUpdate(dt: number): void {
    if (ctrl.gameState !== State.Flying) return;
    this.spawnIn -= SPEED * dt;
    if (this.spawnIn <= 0) {
      this.spawnIn = 4.2;
      const pipe = this.pool.pop() ?? this.make();
      const center = -1.3 + Math.random() * 3.2;
      pipe.isActive = true;
      pipe.transform.setPosition(8, center, 0);
      pipe.getComponent(StaticCollider)!.shapes.forEach((shape, i) => {
        const h = i === 0 ? CEILING_Y + 2 - center - GAP / 2 : center - GROUND_Y - GAP / 2;
        (shape as BoxColliderShape).size = new Vector3(1.2, h, 1);
        (shape as BoxColliderShape).position = new Vector3(0, i === 0 ? GAP / 2 + h / 2 : -GAP / 2 - h / 2, 0);
      });
      const [up, down] = pipe.children as [Entity, Entity];
      const upHeight = CEILING_Y + 2 - center - GAP / 2;
      const downHeight = center - GROUND_Y - GAP / 2;
      for (const [part, h, sign] of [[up, upHeight, 1], [down, downHeight, -1]] as const) {
        const r = part.getComponent(SpriteRenderer)!;
        r.height = h;
        part.transform.setPosition(0, sign * (GAP / 2 + h / 2), 0);
      }
      this.live.push(pipe);
    }
    for (let i = this.live.length - 1; i >= 0; i--) {
      const pipe = this.live[i]!;
      const x = pipe.transform.position.x;
      const nx = x - SPEED * dt;
      if (x >= -2.4 && nx < -2.4) ctrl.score += 1;
      if (nx < -9) {
        this.live.splice(i, 1);
        pipe.isActive = false;
        this.pool.push(pipe);
      } else pipe.transform.setPosition(nx, pipe.transform.position.y, 0);
    }
  }
}

class Restart extends Script {
  override onAwake(): void {
    ctrl.on('State_Change', (state: State) => (this.entity.isActive = state === State.Result));
    this.entity.isActive = false;
  }
  override onPointerClick(): void {
    ctrl.gameState = State.Idle;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, background: [0.08, 0.2, 0.32, 1], hint: 'Click or tap the canvas to flap. After a crash, click the restart button. Cards play by themselves.' });
  const { engine, root } = stage;
  ctrl = new GameCtrl();
  virtualPress = false;
  const cameraEntity = root.createChild('camera');
  cameraEntity.transform.setPosition(0, 0.5, 10);
  const camera = cameraEntity.addComponent(Camera);
  camera.isOrthographic = true;
  camera.orthographicSize = 5;

  const birdSprite = sprite(engine, 64, 64, (g, w, h) => {
    g.fillStyle = '#ffd23f';
    g.beginPath();
    g.arc(w / 2, h / 2, w * 0.42, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(w * 0.62, h * 0.38, w * 0.13, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#111';
    g.beginPath();
    g.arc(w * 0.66, h * 0.38, w * 0.06, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#ff7a2f';
    g.fillRect(w * 0.7, h * 0.52, w * 0.28, h * 0.14);
  });
  const pipeSprite = sprite(engine, 32, 64, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#2e8b3d');
    grad.addColorStop(0.5, '#6fd16f');
    grad.addColorStop(1, '#2e8b3d');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#1d5e28';
    g.lineWidth = 3;
    g.strokeRect(1.5, 1.5, w - 3, h - 3);
  });
  const groundSprite = sprite(engine, 64, 32, (g, w, h) => {
    g.fillStyle = '#d9c27a';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#7bc043';
    g.fillRect(0, 0, w, h * 0.3);
    g.fillStyle = 'rgba(0,0,0,.12)';
    for (let x = 0; x < w; x += 16) g.fillRect(x, h * 0.3, 8, h);
  });
  const buttonSprite = sprite(engine, 128, 48, (g, w, h) => {
    g.fillStyle = '#ff7a2f';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff';
    g.font = 'bold 26px sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('RESTART', w / 2, h / 2);
  });

  show(root, 'ground', groundSprite, 22, 1.6, 0, GROUND_Y - 0.4, 5);
  const bird = show(root, 'bird', birdSprite, 0.9, 0.9, -2.4, 0, 3);
  const body = bird.entity.addComponent(DynamicCollider);
  body.isKinematic = true;
  const ball = new SphereColliderShape();
  ball.radius = 0.38;
  body.addShape(ball);
  bird.entity.addComponent(Bird);

  const pipes = root.createChild('pipes');
  const pipeScript = pipes.addComponent(Pipes);
  pipeScript.make = () => {
    const pipe = pipes.createChild('pipe');
    const collider = pipe.addComponent(StaticCollider);
    for (let i = 0; i < 2; i++) {
      const shape = new BoxColliderShape();
      shape.isTrigger = true;
      collider.addShape(shape);
    }
    show(pipe, 'up', pipeSprite, 1.2, 4, 0, 0, 1).renderer.flipY = true;
    show(pipe, 'down', pipeSprite, 1.2, 4, 0, 0, 1);
    return pipe;
  };

  const restart = show(root, 'restart', buttonSprite, 3, 1.1, 0, -1, 8);
  const button = new BoxColliderShape();
  button.size = new Vector3(3, 1.1, 1);
  restart.entity.addComponent(StaticCollider).addShape(button);
  restart.entity.addComponent(Restart);

  const info = panel(stage, 'tl');
  info.el.style.fontSize = stage.preview ? '16px' : '22px';
  const text = (): void => info.text(`score ${ctrl.score}${ctrl.gameState === State.Idle ? '  (tap to start)' : ''}`);
  ctrl.on('Score_Change', text);
  ctrl.on('State_Change', text);
  text();

  // The card's player: flap when the bird sinks below the next gap's lower edge; restart after a crash.
  let wait = 0;
  tick(root, (dt) => {
    if (!stage.preview) return;
    const birdY = bird.entity.transform.position.y;
    if (ctrl.gameState === State.Idle) virtualPress = true;
    else if (ctrl.gameState === State.Flying) {
      const next = pipeScript.live.find((p) => p.transform.position.x > -3.4);
      const target = next ? next.transform.position.y - 0.3 : 0.2;
      if (birdY < target && bird.entity.transform.position.y < CEILING_Y - 1 && Math.random() < 0.5) virtualPress = true;
    } else if (ctrl.gameState === State.Result) {
      wait += dt;
      if (wait > 1.2) {
        wait = 0;
        ctrl.gameState = State.Idle;
      }
    }
  });
  return stage.dispose;
};

export default mount;
