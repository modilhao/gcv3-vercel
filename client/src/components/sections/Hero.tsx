"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Code2, Cpu, Database } from "lucide-react"

// Utilitário para classes
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

// Botão com variantes

type ButtonAs = "button" | "a";

type ButtonBaseProps = {
  variant?: "default" | "outline";
  size?: "lg" | "sm" | "default";
  as?: ButtonAs;
};

type ButtonProps = ButtonBaseProps & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" })
);

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { className, variant = "default", size = "lg", as = "button", children, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    }
    const sizes: Record<string, string> = {
      lg: "h-11 rounded-md px-8",
      sm: "h-9 rounded-md px-3",
      default: "h-10 px-4 py-2",
    }
    if (as === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(base, variants[variant], sizes[size], className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

// Elemento flutuante animado
type FloatingElementProps = {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

const FloatingElement: React.FC<FloatingElementProps> = ({ className, delay = 0, duration = 6, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [20, -10, -20, -40],
      scale: [0.8, 1, 1.1, 0.9],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
      ease: "easeInOut",
    }}
    className={cn("absolute pointer-events-none", className)}
  >
    {children}
  </motion.div>
)

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-background via-background to-background/95"
      )}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, hsl(var(--primary)/0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div
        className="absolute pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating Tech Elements */}
      <FloatingElement className="top-20 left-10 text-primary/30" delay={0}>
        <Code2 size={32} />
      </FloatingElement>
      <FloatingElement className="top-32 right-20 text-primary/20" delay={1}>
        <Cpu size={28} />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-20 text-primary/25" delay={2}>
        <Database size={24} />
      </FloatingElement>
      <FloatingElement className="top-60 right-10 text-primary/30" delay={0.5}>
        <Zap size={20} />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-40 text-primary/20" delay={1.5}>
        <Sparkles size={26} />
      </FloatingElement>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          {/* Removido o badge conforme solicitado */}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Ecossistemas digitais para o seu crescimento
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent"
            >
              Bots, IA e webapps para vendas inteligentes
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-black"
          >
            Arquitetamos ecossistemas digitais que escutam, aprendem e convertem — enquanto você dorme.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                as="a"
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ12tsOO0WYlIgcGyAuJB88cZAEwUROR5XPcx0_QMI5EKNGTfxSILp-uI49NKzNjWZjYfc4Vwglg?gv=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agende uma conversa"
              >
                Agende uma conversa
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                as="a"
                href="#products"
                className="border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                aria-label="Ver soluções"
              >
                Ver soluções
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero;
