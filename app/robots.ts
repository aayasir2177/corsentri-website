import type {MetadataRoute} from 'next';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/thank-you','/thank-you-partner','/thank-you-assessment','/booking-confirmed']},sitemap:'https://corsentri-homepage.bladedalbum1.chatgpt.site/sitemap.xml'}}
