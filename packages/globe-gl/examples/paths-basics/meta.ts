// globe-gl example: Paths: lists of lat/lng points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: lists of lat/lng points",
  summary:
    "Five routes through five cities each, drawn as default lines. Every path is an array of [lat, lng] pairs, which pathPoints, pathPointLat and pathPointLng read by default.",
  section: "Paths Layer",
  tags: ['pathsData', 'pathPoints', 'pathPointLat', 'pathPointLng'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
