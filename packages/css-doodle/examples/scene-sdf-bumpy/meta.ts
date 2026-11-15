// sdf { d: … }: a sphere with a bumpy surface
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sdf { d: … }: a sphere with a bumpy surface",
  summary: "sdf { d: … } draws any shape from its signed distance, written in p. A sphere of radius .6 gets a sine bump in each axis added to its distance, giving an egg-carton skin.",
  section: "Scenes",
  tags: ["@scene", "sdf", "d", "p"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
