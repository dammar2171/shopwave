import type { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer = (staggerDelay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
})