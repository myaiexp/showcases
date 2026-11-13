// The official imageSequence() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/imageSequenceScrub
// Scrubs through a sequence of images, drawing the appropriate one to the provided canvas.
// Returns the Tween that moves the playhead.
export interface ImageSequenceConfig {
  /** an Array of image URLs */
  urls: string[];
  /** the <canvas> to draw to */
  canvas: gsap.TweenTarget;
  /** an optional ScrollTrigger configuration object */
  scrollTrigger?: ScrollTrigger.Vars;
  /** optional callback for when the Tween updates */
  onUpdate?: () => void;
}

export function imageSequence(config: ImageSequenceConfig): gsap.core.Tween {
  const playhead = { frame: 0 };
  const ctx = gsap.utils.toArray<HTMLCanvasElement>(config.canvas)[0]?.getContext('2d') as CanvasRenderingContext2D;
  const onUpdate = config.onUpdate;
  let images: HTMLImageElement[];
  const updateImage = function (this: unknown): void {
    ctx.drawImage(images[Math.round(playhead.frame)] as HTMLImageElement, 0, 0);
    onUpdate && onUpdate.call(this);
  };
  images = config.urls.map((url, i) => {
    const img = new Image();
    img.src = url;
    i || (img.onload = updateImage);
    return img;
  });
  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: 'none',
    onUpdate: updateImage,
    scrollTrigger: config.scrollTrigger,
  });
}
