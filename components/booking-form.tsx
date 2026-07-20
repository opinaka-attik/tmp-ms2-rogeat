"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, Sparkles, Rocket, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { destinations, getDestinationBySlug } from "@/data/destinations"

const experienceTypes = [
  {
    id: "adventure",
    label: "Aventure",
    description: "Experiences palpitantes avec risques moderes",
    icon: Rocket,
  },
  {
    id: "comfort",
    label: "Confort",
    description: "Voyage equilibre avec commodites modernes",
    icon: Sparkles,
  },
  {
    id: "luxury",
    label: "Luxe",
    description: "Experience premium avec confort total",
    icon: Sparkles,
  },
]

interface BookingFormProps {
  defaultDestination?: string
}

export function BookingForm({ defaultDestination }: BookingFormProps) {
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    duration: "",
    travelers: "",
    experienceType: "comfort",
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (defaultDestination) {
      const dest = getDestinationBySlug(defaultDestination)
      if (dest) {
        setFormData((prev) => ({ ...prev, destination: dest.id }))
      }
    }
  }, [defaultDestination])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.destination) newErrors.destination = "Veuillez selectionner une destination"
    if (!formData.departureDate) newErrors.departureDate = "Veuillez selectionner une date de depart"
    if (!formData.duration) newErrors.duration = "Veuillez selectionner la duree"
    if (!formData.travelers) newErrors.travelers = "Veuillez entrer le nombre de voyageurs"
    if (!formData.name) newErrors.name = "Veuillez entrer votre nom"
    if (!formData.email) newErrors.email = "Veuillez entrer votre email"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Veuillez entrer un email valide"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    const selectedDestination = destinations.find((d) => d.id === formData.destination)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-2xl glass p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary"
        >
          <Check className="h-10 w-10 text-primary-foreground" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-3xl font-bold text-foreground"
        >
          Votre voyage temporel est confirme
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 text-muted-foreground"
        >
          Merci, {formData.name} ! Votre aventure temporelle vers{" "}
          {selectedDestination?.title} a ete programmee.
          Vous recevrez un email de confirmation a {formData.email} avec tous les details.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Reserver un autre voyage
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl glass p-8"
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
        Planifiez votre voyage temporel
      </h2>

      <div className="space-y-6">
        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select
            value={formData.destination}
            onValueChange={(value) => handleInputChange("destination", value)}
          >
            <SelectTrigger className={errors.destination ? "border-destructive" : ""}>
              <SelectValue placeholder="Choisissez votre epoque" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  {dest.title} ({dest.era})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.destination && (
            <p className="text-sm text-destructive">{errors.destination}</p>
          )}
        </div>

        {/* Date and Duration */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="departureDate">Date de depart</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange("departureDate", e.target.value)}
                className={`pl-10 ${errors.departureDate ? "border-destructive" : ""}`}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {errors.departureDate && (
              <p className="text-sm text-destructive">{errors.departureDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duree du sejour</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => handleInputChange("duration", value)}
            >
              <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                <SelectValue placeholder="Selectionnez la duree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 jours</SelectItem>
                <SelectItem value="5">5 jours</SelectItem>
                <SelectItem value="7">7 jours</SelectItem>
                <SelectItem value="10">10 jours</SelectItem>
                <SelectItem value="14">14 jours</SelectItem>
                <SelectItem value="21">21 jours</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className="text-sm text-destructive">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <Label htmlFor="travelers">Nombre de voyageurs</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="travelers"
              type="number"
              min="1"
              max="10"
              placeholder="Combien de voyageurs ?"
              value={formData.travelers}
              onChange={(e) => handleInputChange("travelers", e.target.value)}
              className={`pl-10 ${errors.travelers ? "border-destructive" : ""}`}
            />
          </div>
          {errors.travelers && (
            <p className="text-sm text-destructive">{errors.travelers}</p>
          )}
        </div>

        {/* Experience Type */}
        <div className="space-y-3">
          <Label>Type d&apos;experience</Label>
          <RadioGroup
            value={formData.experienceType}
            onValueChange={(value) => handleInputChange("experienceType", value)}
            className="grid gap-3 sm:grid-cols-3"
          >
            {experienceTypes.map((type) => (
              <Label
                key={type.id}
                htmlFor={type.id}
                className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-all hover:border-primary ${
                  formData.experienceType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }`}
              >
                <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                <type.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="font-medium text-foreground">{type.label}</span>
                <span className="text-center text-xs text-muted-foreground">
                  {type.description}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Personal Info */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full animate-pulse-glow">
          Confirmer la reservation
        </Button>
      </div>
    </motion.form>
  )
}
