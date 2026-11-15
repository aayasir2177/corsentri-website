import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {articles} from '../../lib/content';
import {ArticlePage} from '../../components/content-pages';
export function generateStaticParams(){return articles.map(a=>({article:a.slug}))}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{article:string}>}):Promise<Metadata>{const {article}=await params;const a=articles.find(a=>a.slug===article);return {title:a?`${a.title} | CorSentri`:'Article not found',description:a?.description,alternates:{canonical:`/resources/${article}`},openGraph:{title:a?.title,description:a?.description,type:'article',images:a?.image?[`/images/${a.image}`]:[]}}}
export default async function Page({params}:{params:Promise<{article:string}>}){const {article}=await params;const a=articles.find(a=>a.slug===article);if(!a)notFound();return <main id="main" className="inner-page article-page"><ArticlePage article={a}/></main>}
