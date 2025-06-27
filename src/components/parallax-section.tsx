"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({ children, className = "", speed = 0.5 }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const windowHeight = window.innerHeight

      // Only apply parallax when section is in view
      if (sectionTop < windowHeight && sectionTop > -section.offsetHeight) {
        const yOffset = sectionTop * speed
        content.style.transform = `translateY(${yOffset}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef} className="parallax-layer">
        {children}
      </div>
    </div>
  )
}
