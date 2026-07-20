import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TimeTravel Agency | Voyagez a travers le temps',
  description:
    'Vivez le passe et le futur avec la premiere agence de voyage temporel au monde.',
  keywords: [
    'voyage temporel',
    'tourisme temporel',
    'voyage dans le temps',
    'experiences historiques',
    'Paris 1889',
    'Cretace',
    'Florence 1504',
  ],
}

export const viewport: Viewport = {
  themeColor: '#1a0a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${orbitron.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}

        {/* 🤖 CHATBASE */}
        <Script id="chatbase" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                window.chatbase=(...arguments)=>{
                  if(!window.chatbase.q){window.chatbase.q=[]}
                  window.chatbase.q.push(arguments)
                };
                window.chatbase=new Proxy(window.chatbase,{
                  get(target,prop){
                    if(prop==="q"){return target.q}
                    return(...args)=>target(prop,...args)
                  }
                })
              }
              const onLoad=function(){
                const script=document.createElement("script");
                script.src="https://www.chatbase.co/embed.min.js";
                script.id="jq8nH37x9p-RAtvawTTQn";
                script.domain="www.chatbase.co";
                document.body.appendChild(script)
              };
              if(document.readyState==="complete"){
                onLoad()
              } else {
                window.addEventListener("load",onLoad)
              }
            })();
          `}
        </Script>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
