"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { AnimatedSection } from "@/components/animated-section"
import { Shield, Clock, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Voyage 100% sur",
    description: "Protégé par boucliers temporels",
  },
  {
    icon: Clock,
    title: "Horaires flexibles",
    description: "Partez quand vous le souhaitez",
  },
  {
    icon: Sparkles,
    title: "Experience premium",
    description: "Commodités de luxe incluses",
  },
]

function ReservationContent() {
  const searchParams = useSearchParams()
  const destinationSlug = searchParams.get("destination")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="relative mx-auto max-w-7xl text-center">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
              Réservez votre voyage
            </span>

            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Commencez votre{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                aventure temporelle
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Remplissez le formulaire pour réserver votre voyage temporel.
              Notre équipe vous contactera sous 24h.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={benefit.title} delay={index * 0.1}>
              <div className="flex items-center gap-3 rounded-lg glass p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection delay={0.2}>
            <BookingForm defaultDestination={destinationSlug || undefined} />
          </AnimatedSection>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-2xl font-bold">
              La confiance des voyageurs du monde entier
            </h2>

            <p className="mb-8 text-muted-foreground">
              Plus de 10 000 voyages réussis avec 99,9% de sécurité.
            </p>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { value: "10 000+", label: "Voyageurs" },
                { value: "99,9%", label: "Sécurité" },
                { value: "50M+", label: "Années explorées" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ReservationContent />
    </Suspense>
  )
}