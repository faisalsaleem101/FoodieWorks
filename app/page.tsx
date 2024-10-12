"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  Briefcase,
  Search,
  PlusCircle,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Define the Job type
interface Job {
  id: number;
  company: string;
  logo: string;
  image: string;
  title: string;
  location: string;
  type: string;
  time: string;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("jobSeeker");

  return (
    <div className="min-h-screen bg-gradient-to-t from-cyan-100 to-cyan-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Button
            variant={activeTab === "jobSeeker" ? "default" : "outline"}
            className={`mr-2 ${
              activeTab === "jobSeeker"
                ? "bg-cyan-700 hover:bg-cyan-800"
                : "text-cyan-700 hover:text-cyan-800"
            }`}
            onClick={() => setActiveTab("jobSeeker")}
          >
            <Briefcase className="mr-2 h-4 w-4" /> Job Seekers
          </Button>
          <Button
            variant={activeTab === "employer" ? "default" : "outline"}
            className={
              activeTab === "employer"
                ? "bg-cyan-700 hover:bg-cyan-800"
                : "text-cyan-700 hover:text-cyan-800"
            }
            onClick={() => setActiveTab("employer")}
          >
            <Utensils className="mr-2 h-4 w-4" /> Employers
          </Button>
        </div>

        {activeTab === "jobSeeker" && <JobSeekerSection />}
        {activeTab === "employer" && <EmployerSection />}
      </main>
    </div>
  );
}

function JobSeekerSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const jobs: Job[] = useMemo(
    () => [
      {
        id: 1,
        company: "Gourmet Delights",
        logo: "G",
        image: "/placeholder.svg?height=64&width=64",
        title: "Head Chef",
        location: "New York, NY, USA",
        type: "Full Time",
        time: "1d ago",
        tags: [
          "Fine Dining",
          "Menu Development",
          "Team Management",
          "Culinary Expertise",
        ],
        isNew: true,
        isFeatured: true,
        rating: 4.7,
      },
      {
        id: 2,
        company: "Flavor Haven",
        logo: "F",
        image: "/placeholder.svg?height=64&width=64",
        title: "Sous Chef",
        location: "Los Angeles, CA, USA",
        type: "Part Time",
        time: "1d ago",
        tags: [
          "Kitchen Operations",
          "Food Preparation",
          "Inventory Management",
          "Culinary Creativity",
        ],
        isNew: true,
        isFeatured: true,
        rating: 4.5,
      },
      {
        id: 3,
        company: "Sweet Sensations",
        logo: "S",
        image: "/placeholder.svg?height=64&width=64",
        title: "Pastry Chef",
        location: "Chicago, IL, USA",
        type: "Contract",
        time: "2d ago",
        tags: [
          "Dessert Creation",
          "Baking",
          "Cake Decoration",
          "Menu Planning",
        ],
        isNew: true,
        isFeatured: false,
        rating: 4.2,
      },
    ],
    []
  );

  useEffect(() => {
    // Load the Google Places API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIEI7uXkQYwR_bPJkuK9FCigqvoZtbGew&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    const input = document.getElementById("location-input") as HTMLInputElement;
    if (
      input &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setLocation(place.formatted_address || "");
      });
    }
  };

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const searchLower = searchTerm.toLowerCase();
      const locationLower = location.toLowerCase();
      return (
        (job.company.toLowerCase().includes(searchLower) ||
          job.title.toLowerCase().includes(searchLower) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchLower))) &&
        job.location.toLowerCase().includes(locationLower)
      );
    });
    setFilteredJobs(filtered);
  }, [searchTerm, location, jobs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 search-box-shadow">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Find Your Next Culinary Adventure
          </CardTitle>
          <CardDescription>
            Search for jobs in the restaurant industry
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Job title, keywords or company"
              className="w-full sm:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              id="location-input"
              placeholder="Location"
              className="w-full sm:w-1/3"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className="w-full sm:w-auto bg-cyan-700 hover:bg-cyan-800">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 sm:p-6 card-box-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <Avatar className="h-16 w-16 mr-3">
                      <AvatarImage
                        src={job.image}
                        alt={`${job.company} logo`}
                      />
                      <AvatarFallback>{job.logo}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-cyan-700">
                        {job.company}
                      </h3>
                      <h4 className="text-lg font-bold">{job.title}</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.isNew && <Badge className="bg-cyan-500">NEW!</Badge>}
                    {job.isFeatured && (
                      <Badge className="bg-gray-900">FEATURED</Badge>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    <p>
                      {job.time} • {job.type}
                    </p>
                    <p>{job.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-cyan-100 text-cyan-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold">
                        {job.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button className="w-full bg-cyan-700 hover:bg-cyan-800">
                        Apply Now
                      </Button>
                      <Link href={`/messaging/${job.id}`}>
                        <Button variant="outline" className="w-full bg-white">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Employer
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function EmployerSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>
            Find the perfect candidate for your restaurant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/create-job-listing">
            <Button className="bg-cyan-700 hover:bg-cyan-800">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Job Listing
            </Button>
          </Link>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Your Active Listings</h2>
      <div className="space-y-4">
        {[
          { id: 1, title: "Line Cook", applications: 12, rating: 4.3 },
          { id: 2, title: "Server", applications: 24, rating: 4.6 },
          { id: 3, title: "Bartender", applications: 18, rating: 4.5 },
        ].map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{listing.title}</CardTitle>
                    <CardDescription>
                      {listing.applications} applications received
                    </CardDescription>
                  </div>
                  <div className="flex items-center bg-yellow-100 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">
                      {listing.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/view-applications">
                    <Button
                      variant="default"
                      className="w-full bg-cyan-700 hover:bg-cyan-800"
                    >
                      View Applications
                    </Button>
                  </Link>
                  <Link href={`/messaging/${listing.id}`}>
                    <Button
                      variant="outline"
                      className="w-full text-cyan-700 hover:text-cyan-800"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Applicants
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
