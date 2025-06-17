"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessAnimationProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
  show?: boolean
}

export function SuccessAnimation({ size = "md", className, text, show = true }: SuccessAnimationProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <CheckCircle className={cn(sizeClasses[size], "text-green-500", className)} />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-medium text-green-600"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}
