"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  ChefHat,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-cyan-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Short<span className="text-cyan-600">Staffed</span>
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/jobs"
                className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
              >
                Find Jobs
              </Link>
              <Link
                href="/candidates"
                className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
              >
                Find Candidates
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
              >
                Contact
              </Link>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Post a Job
              </Button>
            </nav>
            <div className="md:hidden flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="text-gray-600 border-gray-300"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <motion.div
      className={`fixed inset-0 bg-white z-50 ${isOpen ? "block" : "hidden"}`}
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            href="/jobs"
            className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
            onClick={onClose}
          >
            Find Jobs
          </Link>
          <Link
            href="/candidates"
            className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
            onClick={onClose}
          >
            Find Candidates
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
            onClick={onClose}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
            onClick={onClose}
          >
            Contact
          </Link>
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
            onClick={onClose}
          >
            Post a Job
          </Button>
        </nav>
      </div>
    </motion.div>
  );
}
