import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import './interior.css';
import { SiteHeader, SiteFooter, SiteEffects } from './components/site-chrome';
export const metadata: Metadata = { title: 'CorSentri | Smarter Security. Greater Confidence.', description: 'Managed cybersecurity monitoring and threat detection, 24/7/365. AI-enabled technology. Human expertise. Clear answers.', metadataBase: new URL('https://corsentri-homepage.bladedalbum1.chatgpt.site'), openGraph: {title:'CorSentri — Smarter Security. Greater Confidence.',description:'Cybersecurity monitoring built around your business. Always watching. Always human.',type:'website'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><SiteHeader/><SiteEffects/>{children}<SiteFooter/></body></html>}
