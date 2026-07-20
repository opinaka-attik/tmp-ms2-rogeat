"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DestinationCardProps {
  slug: string
  title: string
  shortDescription: string
  image: string
  era: string
  dangerLevel: number
}

export function DestinationCard({
  slug,
  title,
  shortDescription,
  image,
  era,
  dangerLevel,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl glass"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Era Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1">
          <Clock className="h-3 w-3 text-primary-foreground" />
          <span className="text-xs font-medium text-primary-foreground">{era}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {shortDescription}
        </p>

        {/* Danger Level */}
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" />
          <div className="flex-1">
            <div className="h-2 w-full rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${dangerLevel}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
              />
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{dangerLevel}%</span>
        </div>

        <Button asChild variant="secondary" className="w-full group/btn">
          <Link href={`/destinations/${slug}`}>
            <span>Explorer</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 rounded-xl border border-primary/50" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      </div>
    </motion.div>
  )
}
