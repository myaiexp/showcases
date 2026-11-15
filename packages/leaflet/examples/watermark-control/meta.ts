// leaflet example: A Control subclass: watermark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A Control subclass: watermark",
  summary:
    `The tutorial's WatermarkControl: a Control subclass whose onAdd returns an img made with DomUtil.create, and whose onRemove is the place to undo anything onAdd set up. The picture is drawn on a canvas and used as a data URL, the width is a default option of the class, and setPosition moves it between corners. The log lists each onAdd and onRemove call.`,
  section: "Extending Leaflet",
  tags: ["Control", "onAdd", "onRemove", "setPosition", "DomUtil.create", "static defaultOptions"],
  docs: [
    'repo/docs/examples/extending-3-controls/index.md',
    'repo/src/control/Control.js',
    'repo/src/dom/DomUtil.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
