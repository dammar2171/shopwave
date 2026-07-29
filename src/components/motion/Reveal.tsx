import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
