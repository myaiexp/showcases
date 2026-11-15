// Plain GLSL shaders for BufferMesh examples: vertex colour, and instanced vertex colour
import { type Engine, Material, Shader } from '@galacean/engine';

const VERT = `
attribute vec3 POSITION;
attribute vec4 COLOR;
uniform mat4 renderer_MVPMat;
varying vec4 v_color;
void main() {
  v_color = COLOR;
  gl_Position = renderer_MVPMat * vec4(POSITION, 1.0);
}`;

const FRAG = `
varying vec4 v_color;
void main() { gl_FragColor = v_color; }`;

const INSTANCED_VERT = `
attribute vec3 POSITION;
attribute vec4 COLOR;
attribute vec3 INSTANCE_OFFSET;
attribute vec3 INSTANCE_ROTATION;
uniform mat4 renderer_MVPMat;
varying vec4 v_color;
void main() {
  vec3 p = POSITION;
  float s = sin(INSTANCE_ROTATION.y);
  float c = cos(INSTANCE_ROTATION.y);
  p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  s = sin(INSTANCE_ROTATION.x);
  c = cos(INSTANCE_ROTATION.x);
  p = vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
  v_color = COLOR;
  gl_Position = renderer_MVPMat * vec4(p + INSTANCE_OFFSET, 1.0);
}`;

/** A material that shows each vertex's COLOR attribute (needs POSITION and COLOR elements on the mesh). */
export function vertexColorMaterial(engine: Engine): Material {
  const shader = Shader.find('gfx-buffer-vertex-color') ?? Shader.create('gfx-buffer-vertex-color', VERT, FRAG);
  return new Material(engine, shader);
}

/** Like vertexColorMaterial, plus per-instance INSTANCE_OFFSET and INSTANCE_ROTATION (radians) attributes. */
export function instancedMaterial(engine: Engine): Material {
  const shader = Shader.find('gfx-buffer-instanced') ?? Shader.create('gfx-buffer-instanced', INSTANCED_VERT, FRAG);
  const material = new Material(engine, shader);
  return material;
}

/** Eight corner positions of a unit cube with six faces' worth of triangle indices (shared corners). */
export const CUBE_CORNERS = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1];
export const CUBE_INDICES = [0, 1, 2, 0, 2, 3, 1, 5, 6, 1, 6, 2, 5, 4, 7, 5, 7, 6, 4, 0, 3, 4, 3, 7, 3, 2, 6, 3, 6, 7, 4, 5, 1, 4, 1, 0];
