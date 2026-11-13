// babylon-js example: a custom Observable and its observers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom Observable and its observers',
  summary:
    'A master sphere owns an Observable carrying its x position, and two minions register observers with add: one scales a sphere, one spins a cube. Buttons remove and re-add each observer, use addOnce for a one-shot flash, and read hasObservers.',
  section: 'Events',
  tags: ['Observable', 'Observer', 'add', 'addOnce', 'remove', 'notifyObservers', 'onBeforeRenderObservable'],
  docs: ['repo/content/features/featuresDeepDive/events/observables.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
