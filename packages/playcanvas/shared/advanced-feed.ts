// An unlit "feed" scene for render target examples, and a screen to show it on
import * as pc from 'playcanvas';

export interface Feed {
  layer: pc.Layer;
  /** A camera that sees only the feed, aimed at it from `distance` units away. Extra options go to the camera component. */
  addCamera(options?: Record<string, unknown>, distance?: number): pc.Entity;
  animate(t: number): void;
  dispose(): void;
}

const unlit = (hex: string, intensity = 1): pc.StandardMaterial => {
  const m = new pc.StandardMaterial();
  m.diffuse = new pc.Color(0, 0, 0);
  m.emissive = new pc.Color().fromString(hex);
  m.emissiveIntensity = intensity;
  m.useLighting = false;
  m.update();
  return m;
};

/**
 * An asymmetric, unlit still life far from the main scene, in a layer only the feed cameras draw:
 * a red box top-left, a green ball bottom-right, a spinning torus and thin rotating bars
 * (aliasing shows on them). `hot` is the emissive intensity of the bright bar (above 1 is HDR).
 */
export function createFeed(app: pc.AppBase, offsetX = 200, hot = 1): Feed {
  const layer = new pc.Layer({ name: 'Feed' });
  app.scene.layers.push(layer);
  const materials = {
    red: unlit('#ff4d4d'),
    green: unlit('#4dff88'),
    gold: unlit('#ffd24d'),
    hot: unlit('#ffffff', hot),
    blue: unlit('#6aa7ff'),
  };
  const add = (type: 'box' | 'sphere' | 'torus', material: pc.Material, pos: [number, number, number], scale: [number, number, number]): pc.Entity => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material, layers: [layer.id], castShadows: false, receiveShadows: false });
    e.setLocalPosition(offsetX + pos[0], pos[1], pos[2]);
    e.setLocalScale(...scale);
    app.root.addChild(e);
    return e;
  };
  add('box', materials.red, [-2.6, 1.5, 0], [1.4, 1.4, 1.4]);
  add('sphere', materials.green, [2.6, -1.5, 0], [1.6, 1.6, 1.6]);
  const torus = add('torus', materials.gold, [0, 0, 0], [1.5, 1.5, 1.5]);
  const bars = [0, 1, 2, 3].map((i) => add('box', i === 0 ? materials.hot : materials.blue, [0, 0, -1], [6, 0.04, 0.04]));
  return {
    layer,
    addCamera(options = {}, distance = 7) {
      const camera = new pc.Entity('feed camera');
      camera.addComponent('camera', { clearColor: new pc.Color(0.04, 0.07, 0.16), layers: [layer.id], fov: 45, ...options });
      camera.setLocalPosition(offsetX, 0, distance);
      app.root.addChild(camera);
      return camera;
    },
    animate(t) {
      torus.setLocalEulerAngles(t * 50, t * 70, 0);
      bars.forEach((b, i) => b.setLocalEulerAngles(0, 0, t * 20 + i * 45));
    },
    dispose() {
      app.scene.layers.remove(layer);
      Object.values(materials).forEach((m) => m.destroy());
    },
  };
}

/** An unlit plane facing +Z showing `texture`, `width` by `height` world units, at `position`. */
export function addScreen(app: pc.AppBase, material: pc.Material, position: [number, number, number], width: number, height: number): pc.Entity {
  const screen = new pc.Entity('screen');
  screen.addComponent('render', { type: 'plane', material, castShadows: false, receiveShadows: false });
  screen.setLocalEulerAngles(90, 0, 0);
  screen.setLocalPosition(...position);
  screen.setLocalScale(width, 1, height);
  app.root.addChild(screen);
  return screen;
}

/** A material showing a texture as-is, unlit. */
export function screenMaterial(texture: pc.Texture): pc.StandardMaterial {
  const m = new pc.StandardMaterial();
  m.diffuse = new pc.Color(0, 0, 0);
  m.emissive = new pc.Color(1, 1, 1);
  m.emissiveMap = texture;
  m.useLighting = false;
  m.update();
  return m;
}

/** A colour texture (and nothing else) of the given size, ready to be a render target's colorBuffer. */
export function renderTexture(device: pc.GraphicsDevice, width: number, height: number, format: number = pc.PIXELFORMAT_RGBA8, filter: number = pc.FILTER_LINEAR): pc.Texture {
  return new pc.Texture(device, {
    name: 'feed-texture',
    width,
    height,
    format,
    mipmaps: false,
    minFilter: filter,
    magFilter: filter,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
}

/** A vertex shader for ShaderMaterial screens: model-view-projection with uv0 passed on as vUv0. */
export const SCREEN_VERTEX_GLSL = /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec2 vUv0;
    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
`;

/** The attribute map that goes with SCREEN_VERTEX_GLSL. */
export const SCREEN_ATTRIBUTES = { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 };
