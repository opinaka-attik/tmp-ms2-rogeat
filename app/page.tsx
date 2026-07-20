"use client"

import { Shield, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { DestinationCard } from "@/components/destination-card"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { destinations } from "@/data/destinations"
import Script from "next/script"

const features = [
  {
    icon: Shield,
    title: "Voyage securise",
    description:
      "Nos boucliers temporels garantissent une experience sure et stable.",
  },
  {
    icon: Sparkles,
    title: "Voyages personnalises",
    description:
      "Chaque voyage est adapte a vos envies et votre profil.",
  },
  {
    icon: Shield,
    title: "Assistante IA",
    description:
      "Chatbot IA disponible 24h/24 pour vous guider dans vos choix.",
  },
]

export default function HomePage() {
  const featuredDestinations = destinations.filter((d) => d.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      {/* FEATURES */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="text-center mb-16">
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              Pourquoi nous choisir
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Le futur du voyage est la
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div className="rounded-xl glass p-8 text-center">
                  <feature.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="mb-3 text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold">
              Explorez a travers le temps
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination, index) => (
              <AnimatedSection key={destination.slug} delay={index * 0.1}>
                <DestinationCard {...destination} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Pret a voyager dans le temps ?
        </h2>

        <Button asChild size="lg">
          <Link href="/reservation">
            Reserver maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      <Footer />

      {/* 🤖 CHATBASE GLOBAL */}
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
    </div>
  )
}