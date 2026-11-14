// Storyline helpers: the registration, the title style and the theme colours for the storyline examples
import VChart from '@visactor/vchart';
import { registerStorylineChart } from '@visactor/vchart-extension';

// The guide passes the page's VChart to the registration call.
registerStorylineChart({ VChart });

/** The default title is dark with a white stroke, which glares on the dark page. */
export const TITLE = { stroke: '#0c0d11', lineWidth: 3 };
export const COLORS: Record<string, string> = { coral: '#e8543d', teal: '#3b82a0', violet: '#7b61d9', green: '#2f9e6b' };
