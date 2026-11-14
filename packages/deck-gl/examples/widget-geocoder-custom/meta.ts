// deck-gl example: GeocoderWidget with a custom geocoder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeocoderWidget with a custom geocoder',
  summary:
    'geocoder: "custom" plus a customGeocoder object resolves city names against a local list instead of a web service. A name that is not in the list shows the widget error state.',
  section: 'Widgets',
  tags: ['GeocoderWidget', 'geocoder: custom', 'customGeocoder', 'Geocoder', 'onGeocode'],
  docs: [
    'repo/docs/api-reference/widgets/geocoder-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
