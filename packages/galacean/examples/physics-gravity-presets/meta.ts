// galacean example: Gravity presets: Earth, Moon, zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gravity presets: Earth, Moon, zero",
  summary:
    "The same six balls are thrown again under four gravity vectors: Earth, Moon, zero and upside down. scene.physics.gravity is edited in place with set(); the full view has sliders for each component.",
  section: "Physics",
  tags: ['scene.physics.gravity', 'Vector3.set', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
