// Scene building blocks for the Graphics: Cameras, Meshes and Lighting examples
import * as pc from 'playcanvas';

/** A StandardMaterial with a hex diffuse colour and optional extras, already updated. */
export function colorMaterial(hex: string, props: Partial<pc.StandardMaterial> = {}): pc.StandardMaterial {
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString(hex);
  material.gloss = 0.5;
  material.useMetalness = true;
  material.metalness = 0;
  Object.assign(material, props);
  material.update();
  return material;
}

/** Adds an entity with a camera component to the app root. */
export function addCamera(app: pc.AppBase, options: Record<string, unknown> = {}, name = 'camera'): pc.Entity {
  const camera = new pc.Entity(name);
  camera.addComponent('camera', { clearColor: new pc.Color(0.08, 0.09, 0.12), ...options });
  app.root.addChild(camera);
  return camera;
}

/** Adds a directional light shining along the entity's -Y axis, tilted by the given angles. */
export function addSun(app: pc.AppBase, pitch = 50, yaw = 30, options: Record<string, unknown> = {}): pc.Entity {
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', ...options });
  sun.setEulerAngles(pitch, yaw, 0);
  app.root.addChild(sun);
  return sun;
}

export type ShapeType = 'box' | 'capsule' | 'cone' | 'cylinder' | 'plane' | 'sphere' | 'torus';

/** A render entity of a primitive type with a colour; added to the app root. */
export function addShape(
  app: pc.AppBase,
  type: ShapeType,
  hex: string,
  position: [number, number, number] = [0, 0, 0],
  scale: number | [number, number, number] = 1,
  renderProps: Record<string, unknown> = {},
): pc.Entity {
  const entity = new pc.Entity(type);
  entity.addComponent('render', { type, material: colorMaterial(hex), ...renderProps });
  entity.setLocalPosition(...position);
  if (Array.isArray(scale)) entity.setLocalScale(...scale);
  else entity.setLocalScale(scale, scale, scale);
  app.root.addChild(entity);
  return entity;
}

/** A large plane that receives shadows but casts none. */
export function addGround(app: pc.AppBase, hex = '#3a4152', size = 14): pc.Entity {
  return addShape(app, 'plane', hex, [0, 0, 0], [size, 1, size], { castShadows: false });
}

const PALETTE = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];

/** A ring of alternating boxes and spheres to look at; returns the entities. */
export function addSceneryRing(app: pc.AppBase, count = 8, radius = 4): pc.Entity[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return addShape(app, i % 2 ? 'sphere' : 'box', PALETTE[i % PALETTE.length]!, [Math.cos(a) * radius, 0.5, Math.sin(a) * radius]);
  });
}

export interface CanvasLabel {
  text: string;
  /** [x, y, width, height] in the 0-1 viewport coordinates a camera's rect uses (origin bottom-left). */
  rect: [number, number, number, number];
}

/** Small HTML captions over regions of the canvas; they are removed with the mount element. */
export function addCanvasLabels(canvas: HTMLCanvasElement, labels: CanvasLabel[]): HTMLElement {
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  canvas.before(wrap);
  wrap.append(canvas);
  const layer = document.createElement('div');
  Object.assign(layer.style, { position: 'absolute', inset: '0', pointerEvents: 'none' });
  for (const { text, rect } of labels) {
    const tag = document.createElement('span');
    tag.textContent = text;
    Object.assign(tag.style, {
      position: 'absolute',
      left: `${rect[0] * 100}%`,
      bottom: `${rect[1] * 100}%`,
      margin: '4px',
      padding: '1px 6px',
      font: '0.7rem/1.4 monospace',
      color: '#fff',
      background: 'rgba(0,0,0,0.55)',
      borderRadius: '3px',
    });
    layer.append(tag);
  }
  wrap.append(layer);
  return layer;
}
