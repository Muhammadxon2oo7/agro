"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: {
    label: string
    href: string
    isExternal?: boolean
  }[]
}

export function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)

    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed inset-y-0 right-0 w-[75%] max-w-sm bg-soil-800 shadow-xl z-50 md:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-soil-700">
              <h2 className="font-semibold text-lg text-white">Menu</h2>
              <button onClick={onClose} className="p-2 rounded-full text-white hover:bg-soil-500/50">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-auto p-4">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        className="block py-2.5 px-4 rounded-md text-white hover:bg-soil-500/50 transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2.5 px-4 rounded-md text-white hover:bg-soil-500/50 transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
