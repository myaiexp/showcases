// The Minecraft guide's components: random-color, snap and intersection-spawn
import type { AFrame, Entity } from './types.ts';

/**
 * random-color is the guide's own code. The guide only links the `snap` and
 * `intersection-spawn` sources, so these two are written here from the guide's prose: snap
 * moves an entity to the nearest point of a grid (`snap` spacing and `offset`), and
 * intersection-spawn creates an entity from a mixin where an event's raycaster intersection
 * hit, a little way out along the face normal.
 */
export function registerRandomColor(AFRAME: AFrame): void {
  AFRAME.registerComponent('random-color', {
    dependencies: ['material'],
    init() {
      // Set material component's color property to a random color.
      this.el.setAttribute('material', 'color', getRandomColor());
    },
  });
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export function registerSnap(AFRAME: AFrame): void {
  AFRAME.registerComponent('snap', {
    dependencies: ['position'],
    schema: {
      offset: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
      snap: { type: 'vec3', default: { x: 0.1, y: 0.1, z: 0.1 } },
    },
    update() {
      this.apply();
    },
    // Entities that move afterwards (animations, controllers) are pulled back onto the grid.
    tick() {
      this.apply();
    },
    apply() {
      const { offset, snap } = this.data;
      const p = this.el.object3D.position;
      const to = (v: number, o: number, s: number): number => (s ? Math.round((v - o) / s) * s + o : v);
      p.set(to(p.x, offset.x, snap.x), to(p.y, offset.y, snap.y), to(p.z, offset.z, snap.z));
    },
  });
}

export function registerIntersectionSpawn(AFRAME: AFrame): void {
  AFRAME.registerComponent('intersection-spawn', {
    schema: { event: { default: 'click' }, mixin: { default: '' } },
    init() {
      this.handler = (evt: CustomEvent<{ intersection?: { point: import('three').Vector3; face?: { normal: import('three').Vector3 } } }>) => {
        const hit = evt.detail.intersection;
        if (!hit?.face) return;
        const el = document.createElement('a-entity') as Entity;
        el.setAttribute('mixin', this.data.mixin);
        // A mixin carries components only, so the class the cursor's raycaster targets goes on each voxel.
        el.setAttribute('class', 'clickable');
        // Normal of the face of intersection, scaled down a bit, added to the point of intersection.
        const normal = hit.face.normal.clone().multiplyScalar(0.25);
        el.setAttribute('position', hit.point.clone().add(normal));
        this.el.sceneEl.appendChild(el);
        this.el.sceneEl.emit('spawned', { count: this.el.sceneEl.querySelectorAll('[mixin]').length });
      };
      this.el.addEventListener(this.data.event, this.handler);
    },
    update(old) {
      if (old.event && old.event !== this.data.event) {
        this.el.removeEventListener(old.event, this.handler);
        this.el.addEventListener(this.data.event, this.handler);
      }
    },
    remove() {
      this.el.removeEventListener(this.data.event, this.handler);
    },
  });
}
