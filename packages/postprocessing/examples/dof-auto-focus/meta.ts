// postprocessing example: Depth of field: auto focus target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: auto focus target',
  summary:
    "Setting DepthOfFieldEffect.target to a Vector3 makes the effect refocus on it every frame, so the white marker stays sharp as it glides down the corridor. calculateFocusDistance gives the distance it uses; set target back to null to focus by distance alone.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'target', 'calculateFocusDistance', 'focusDistance'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
