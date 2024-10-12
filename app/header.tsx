import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-cyan-700">Short Staffed</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/jobs"
              className="text-cyan-700 hover:text-cyan-900 font-medium"
            >
              Find Jobs
            </Link>
            <Link
              href="/post-job"
              className="text-cyan-700 hover:text-cyan-900 font-medium"
            >
              Post a Job
            </Link>
            <Link
              href="/about"
              className="text-cyan-700 hover:text-cyan-900 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-cyan-700 hover:text-cyan-900 font-medium"
            >
              Contact
            </Link>
          </nav>
          <Button
            variant="outline"
            className="md:hidden text-cyan-700 border-cyan-700"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
