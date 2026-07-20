"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, DollarSign, Shield, Star, Check, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { destinations, getDestinationBySlug } from "@/data/destinations"

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = use(params)
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 left-4 sm:left-8"
        >
          <Button asChild variant="secondary" className="glass">
            <Link href="/destinations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux destinations
            </Link>
          </Button>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                  <Clock className="h-4 w-4" />
                  {destination.era}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-secondary/90 px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                  <Calendar className="h-4 w-4" />
                  {destination.duration}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                {destination.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <AnimatedSection>
                <h2 className="mb-4 text-2xl font-bold text-foreground">A propos de cette destination</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {destination.longDescription}
                </p>
              </AnimatedSection>

              {/* Experiences */}
              <AnimatedSection delay={0.1}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Experiences incluses</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {destination.experiences.map((experience, index) => (
                    <motion.div
                      key={experience}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 rounded-lg glass p-4"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-foreground">{experience}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Safety Levels */}
              <AnimatedSection delay={0.2}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Niveaux de securite et confort</h2>
                <div className="space-y-6 rounded-xl glass p-6">
                  {/* Danger Level */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-destructive" />
                        <span className="font-medium text-foreground">Niveau de danger</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{destination.dangerLevel}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${destination.dangerLevel}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-destructive"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {destination.dangerLevel < 30
                        ? "Destination tres sure avec risques minimaux."
                        : destination.dangerLevel < 50
                        ? "Risques moderes, convient a la plupart des voyageurs."
                        : destination.dangerLevel < 70
                        ? "Destination a risque eleve, necessite une preparation."
                        : "Conditions extremes, reserve aux voyageurs experimentes."}
                    </p>
                  </div>

                  {/* Comfort Level */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Niveau de confort</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{destination.comfortLevel}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${destination.comfortLevel}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {destination.comfortLevel < 40
                        ? "Commodites basiques, focus sur l'experience authentique."
                        : destination.comfortLevel < 70
                        ? "Bon confort avec ameliorations temporelles modernes."
                        : "Experience luxueuse avec toutes les commodites modernes."}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.3}>
                <div className="sticky top-24 rounded-xl glass p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">A partir de</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">
                        {destination.price.toLocaleString("fr-FR")} EUR
                      </span>
                      <span className="text-muted-foreground">/personne</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duree</span>
                      <span className="font-medium text-foreground">{destination.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Epoque</span>
                      <span className="font-medium text-foreground">{destination.era}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Experiences</span>
                      <span className="font-medium text-foreground">{destination.experiences.length} incluses</span>
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full animate-pulse-glow">
                    <Link href={`/reservation?destination=${destination.slug}`}>
                      Reserver ce voyage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Annulation gratuite jusqu&apos;a 7 jours avant le depart
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <h2 className="mb-8 text-2xl font-bold text-foreground">Autres destinations qui pourraient vous plaire</h2>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations
              .filter((d) => d.slug !== destination.slug)
              .slice(0, 3)
              .map((dest, index) => (
                <AnimatedSection key={dest.slug} delay={index * 0.1}>
                  <Link href={`/destinations/${dest.slug}`} className="block">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden rounded-xl glass"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {dest.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{dest.era}</p>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  )
}
