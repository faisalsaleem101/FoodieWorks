import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-blue-100 to-white py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">
              FoodieWorks
            </h3>
            <p className="text-gray-600">
              Connecting culinary talent with great opportunities in the
              restaurant industry.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-700">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-700">
              Connect With Us
            </h4>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-600 hover:text-cyan-700">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-cyan-700">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-cyan-700">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-cyan-700">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-gray-600">
              Stay updated with our latest news and opportunities.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; 2023 ShortSTaffed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
