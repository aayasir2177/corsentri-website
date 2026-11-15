import type {MetadataRoute} from 'next';
import {pageSlugs,articleSlugs} from './lib/content';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const origin='https://corsentri-homepage.bladedalbum1.chatgpt.site';return ['/',...pageSlugs.filter(s=>!s.startsWith('thank-you')&&s!=='booking-confirmed').map(s=>`/${s}`),...articleSlugs.map(s=>`/resources/${s}`)].map(path=>({url:origin+path,changeFrequency:'monthly',priority:path==='/'?1:path.startsWith('/resources/')?.6:.8}))}
