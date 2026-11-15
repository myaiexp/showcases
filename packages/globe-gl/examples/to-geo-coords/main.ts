// toGeoCoords: turn a 3D position back into lat, lng and altitude (ground track)
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The satellite is a Three.js mesh flying a tilted orbit; its track is drawn from toGeoCoords.' });
  const dark = await texture('dark');

  const track: [number, number][] = [];
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData([])
    .pathColor(() => '#ffd166')
    .pathTransitionDuration(0);
  globe.pointOfView({ lat: 20, lng: 0, altitude: 2.6 });

  const R = globe.getGlobeRadius();
  const sat = new Mesh(new BoxGeometry(R * 0.04, R * 0.04, R * 0.08), new MeshLambertMaterial({ color: '#ffd166' }));
  globe.scene().add(sat);
  stage.onDispose(() => {
    globe.scene().remove(sat);
    sat.geometry.dispose();
    sat.material.dispose();
  });

  const log = readout(stage.preview ? stage.container : stage.box);
  if (stage.preview) log.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2;font-size:10px';

  const orbit = R * 1.35;
  const tilt = (51 * Math.PI) / 180;
  let lastTrack = 0;
  stage.loop((_dt, t) => {
    // A circular orbit tilted 51° from the equator, slowly drifting in longitude.
    const a = t * 0.7;
    const drift = t * 0.08;
    const x0 = Math.cos(a) * orbit;
    const y0 = Math.sin(a) * Math.sin(tilt) * orbit;
    const z0 = Math.sin(a) * Math.cos(tilt) * orbit;
    sat.position.set(x0 * Math.cos(drift) + z0 * Math.sin(drift), y0, z0 * Math.cos(drift) - x0 * Math.sin(drift));
    sat.lookAt(0, 0, 0);

    // Back from scene space to geography.
    const { lat, lng, altitude } = globe.toGeoCoords(sat.position);
    log.textContent = `toGeoCoords(satellite.position)\nlat ${lat.toFixed(1)}  lng ${lng.toFixed(1)}  alt ${altitude.toFixed(2)}`;
    if (t - lastTrack > 0.1) {
      lastTrack = t;
      track.push([lat, lng]);
      if (track.length > 120) track.shift();
      // A path needs two points: the layer throws on shorter ones.
      if (track.length > 1) globe.pathsData([[...track]]);
    }
  });

  return stage.dispose;
};

export default mount;
