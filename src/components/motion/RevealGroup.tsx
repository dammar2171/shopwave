import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function RevealGroup({
  children,
  className,
  staggerDelay = 0.1,
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
