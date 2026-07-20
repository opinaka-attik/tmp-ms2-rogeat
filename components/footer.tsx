import Link from "next/link"
import { Clock, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-wider">TimeTravel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              La premiere agence de voyage temporel au monde. Des voyages surs et personnalises a travers le temps depuis 2045.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/destinations", label: "Destinations" },
                { href: "/reservation", label: "Reserver un voyage" },
                { href: "#", label: "Protocoles de securite" },
                { href: "#", label: "FAQ" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Time Periods */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Epoques populaires
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/destinations/paris-1889", label: "Paris 1889" },
                { href: "/destinations/cretace", label: "Cretace" },
                { href: "/destinations/florence-1504", label: "Florence 1504" },
              ].map((era) => (
                <li key={era.label}>
                  <Link
                    href={era.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {era.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Contactez-nous
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contact@timetravel.agency
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Hub Temporel, Neo-Paris
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TimeTravel Agency. Tous droits reserves dans toutes les lignes temporelles.
          </p>
        </div>
      </div>
    </footer>
  )
}
