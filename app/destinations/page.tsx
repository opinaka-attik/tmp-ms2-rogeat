"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DestinationCard } from "@/components/destination-card"
import { AnimatedSection } from "@/components/animated-section"
import { destinations } from "@/data/destinations"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="relative mx-auto max-w-7xl text-center">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              Toutes les destinations
            </span>

            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Choisissez votre{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                époque
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              De l’ère des dinosaures à la Belle Époque parisienne,
              explorez nos voyages temporels uniques.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <AnimatedSection key={destination.slug} delay={index * 0.1}>
                <DestinationCard {...destination} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
