"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatbot } from "@/contexts/chatbot-context"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const quickReplies = [
  "Quelle destination me conseillez-vous ?",
  "Quel voyage est le plus sur ?",
  "Combien coute un voyage ?",
  "Comment fonctionne le voyage temporel ?",
]

const botResponses: Record<string, string> = {
  default: "Bonjour ! Je suis ARIA, votre assistante IA de voyage temporel. Comment puis-je vous aider a planifier votre aventure aujourd'hui ?",
  destinations: "Nos destinations les plus populaires sont :\n\n1. Paris 1889 - Vivez l'Exposition universelle\n2. Cretace - Explorez le monde des dinosaures\n3. Florence 1504 - Rencontrez Michel-Ange\n\nSouhaitez-vous plus de details sur l'une d'entre elles ?",
  "quelle destination": "Nos destinations les plus populaires sont :\n\n1. Paris 1889 - Vivez l'Exposition universelle et la construction de la Tour Eiffel\n2. Cretace - Aventurez-vous parmi les dinosaures\n3. Florence 1504 - Decouvrez la Renaissance italienne\n\nPour une premiere experience, je recommande Paris 1889 : c'est sur, confortable et absolument magique !",
  "conseillez": "Pour une premiere experience de voyage temporel, je vous recommande Paris 1889 ! C'est notre destination la plus sure avec un niveau de confort eleve. Vous pourrez assister a l'inauguration de la Tour Eiffel et vivre la Belle Epoque. Pour les aventuriers, le Cretace offre une experience unique avec les dinosaures !",
  "plus sur": "Le voyage le plus sur est Paris 1889 avec un niveau de danger de seulement 15%. C'est une epoque civilisee avec un excellent niveau de confort (85%). Florence 1504 est egalement tres sure (20% de danger). Le Cretace est reserve aux aventuriers avec un niveau de danger de 90% !",
  "sur": "Paris 1889 est notre destination la plus sure avec seulement 15% de niveau de danger et 85% de confort. Florence 1504 suit de pres avec 20% de danger. Le Cretace est plus aventureux avec 90% de danger, mais nos guides temporels garantissent votre securite !",
  "combien": "Nos voyages temporels debutent a partir de 18 000 EUR pour Paris 1889. Voici nos tarifs :\n\n- Paris 1889 : 18 000 EUR\n- Florence 1504 : 22 000 EUR\n- Cretace : 28 000 EUR\n\nLes prix incluent le transport temporel, l'hebergement et toutes les experiences. Nous proposons aussi des facilites de paiement !",
  "coute": "Nos voyages temporels debutent a partir de 18 000 EUR pour Paris 1889. Voici nos tarifs :\n\n- Paris 1889 : 18 000 EUR\n- Florence 1504 : 22 000 EUR\n- Cretace : 28 000 EUR\n\nTous nos voyages incluent le transport temporel securise, l'hebergement d'epoque et les experiences guidees.",
  "prix": "Nos voyages temporels debutent a partir de 18 000 EUR pour Paris 1889. Voici nos tarifs :\n\n- Paris 1889 : 18 000 EUR\n- Florence 1504 : 22 000 EUR\n- Cretace : 28 000 EUR\n\nNous offrons des reductions early-bird et des plans de paiement !",
  "comment fonctionne": "Notre technologie de Deplacement Temporel (TDT) cree un tunnel quantique stable a travers le continuum espace-temps. Vous voyagez en toute securite dans nos Chronopodes ultramodernes, avec une integrite moleculaire garantie. La sensation est celle d'un bref moment d'apesanteur !",
  "fonctionne": "Notre technologie de Deplacement Temporel (TDT) utilise des tunnels quantiques pour vous transporter a travers le temps. Vous voyagez dans nos Chronopodes securises avec :\n\n- Systemes anti-paradoxe en temps reel\n- Balises de rappel d'urgence\n- Guides temporels formes\n- Nanobots medicaux\n\nC'est comme un court moment d'apesanteur !",
  "securite": "Absolument ! Nous avons un taux de securite de 99,9% sur plus de 10 000 voyages temporels. Notre technologie comprend :\n\n- Systemes de prevention des paradoxes en temps reel\n- Balises de rappel temporel d'urgence\n- Guides temporels experimentes\n- Nanobots medicaux pour soins instantanes\n\nVotre securite est notre priorite absolue !",
  "bonjour": "Bonjour ! Bienvenue chez TimeTravel Agency. Je suis ARIA, votre assistante IA. Etes-vous pret a explorer les merveilles du voyage temporel ?",
  "salut": "Salut ! Je suis ARIA, votre assistante de voyage temporel. Comment puis-je vous aider aujourd'hui ?",
  "reserver": "Excellent choix ! Pour reserver un voyage, rendez-vous sur notre page Reservation ou vous pourrez selectionner votre destination, vos dates et votre type d'experience. Voulez-vous que je vous guide dans le processus ?",
  "aide": "Je suis la pour vous aider ! Je peux vous renseigner sur :\n\n- Nos destinations (Paris 1889, Cretace, Florence 1504)\n- Les protocoles de securite\n- Le processus de reservation\n- Les tarifs et options\n- La technologie de voyage temporel\n\nPosez-moi vos questions !",
  "paris": "Paris 1889 est une destination magnifique ! Vous vivrez l'Exposition universelle et l'inauguration de la Tour Eiffel. Ambiance Belle Epoque, romantisme et innovation. Niveau de danger : 15%, Confort : 85%. A partir de 18 000 EUR.",
  "cretace": "Le Cretace est notre destination la plus aventureuse ! Explorez le monde des dinosaures il y a 66 millions d'annees. Safari d'observation, jungle prehistorique, volcans actifs. Niveau de danger : 90%, mais securite garantie par nos guides ! A partir de 28 000 EUR.",
  "florence": "Florence 1504, c'est la Renaissance italienne dans toute sa splendeur ! Rencontrez Michel-Ange, visitez les ateliers d'artistes, participez aux banquets des Medicis. Niveau de danger : 20%, Confort : 75%. A partir de 22 000 EUR.",
  "dinosaures": "Notre voyage au Cretace vous permet d'observer les dinosaures dans leur habitat naturel ! T-Rex, Triceratops, Pteranodons... Une experience unique avec safari guide, exploration de jungle et meme observation de meteorites (securite garantie). Niveau de danger : 90%. A partir de 28 000 EUR.",
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim()
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return response
    }
  }
  
  return "C'est une excellente question ! Je n'ai pas d'information specifique sur ce sujet, mais je vous recommande de parler avec l'un de nos specialistes temporels pour plus de details. Puis-je vous aider avec autre chose concernant nos destinations ou le processus de reservation ?"
}

export function Chatbot() {
  const { isOpen, openChatbot, closeChatbot } = useChatbot()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: botResponses.default,
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botResponse: Message = {
      id: Date.now() + 1,
      text: getBotResponse(text),
      isBot: true,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botResponse])
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        id="chatbot-button"
        onClick={openChatbot}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">ARIA</h3>
                  <p className="text-xs text-muted-foreground">Assistante de voyage IA</p>
                </div>
              </div>
              <button
                onClick={closeChatbot}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Fermer le chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    message.isBot ? "" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.isBot ? "bg-primary" : "bg-accent"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="rounded-2xl bg-secondary px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-2 w-2 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="border-t border-border px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card/80 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ecrivez votre message..."
                  className="flex-1 bg-secondary border-border"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
