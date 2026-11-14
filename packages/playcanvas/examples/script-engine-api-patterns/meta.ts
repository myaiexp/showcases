// playcanvas example: Calling the engine API from scripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Calling the engine API from scripts',
  summary:
    "A turret script uses the patterns the scripting guide lists: this.entity and this.app, findByPath relative to the entity, findByTag across the app root, components such as entity.light as properties, Vec3 and Color maths, and app.fire with app.on to tell the orbiting enemies they were hit.",
  section: 'Scripting',
  tags: ['Script', 'findByPath', 'findByTag', 'findByName', 'LightComponent', 'Vec3', 'Color', 'fire', 'drawLine'],
  docs: [
    'repo/docs/user-manual/scripting/engine-api.md',
    'repo/docs/user-manual/scripting/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
