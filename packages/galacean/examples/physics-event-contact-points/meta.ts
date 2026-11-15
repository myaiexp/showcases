// galacean example: Collision events: contact points and impulses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collision events: contact points and impulses",
  summary:
    "A box tumbles onto the floor and a script reads the Collision it is given: getContacts fills ContactPoint objects, drawn here as a dot at each position with an arrow along the normal scaled by the impulse.",
  section: "Physics",
  tags: ['Collision.getContacts', 'ContactPoint', 'onCollisionEnter', 'onCollisionStay'],
  docs: [
    'repo/docs/en/physics/collider/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
