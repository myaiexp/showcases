<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AttributionControlOptions/index.md -->

# AttributionControlOptions
> \*\*AttributionControlOptions\*\* = `object`
Defined in: [ui/control/attribution\\_control.ts:10]()
The [AttributionControl]() options object
## Properties
### compact?
> `optional` \*\*compact?\*\*: `boolean`
Defined in: [ui/control/attribution\\_control.ts:16]()
If `true`, the attribution control will always collapse when moving the map. If `false`, force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide. \*\*Attribution should not be collapsed if it can comfortably fit on the map. `compact` should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.\*\*
---
### customAttribution?
> `optional` \*\*customAttribution?\*\*: `string` | `string`\[\]
Defined in: [ui/control/attribution\\_control.ts:20]()
Attributions to show in addition to any other attributions.
