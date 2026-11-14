// deck-gl example: GeocoderWidget with coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeocoderWidget with coordinates',
  summary:
    'The experimental GeocoderWidget with its offline coordinates geocoder: type a longitude and latitude and the view flies there. onGeocode reports the result.',
  section: 'Widgets',
  tags: ['GeocoderWidget', 'geocoder', 'transitionDuration', 'onGeocode'],
  docs: [
    'repo/docs/api-reference/widgets/geocoder-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
