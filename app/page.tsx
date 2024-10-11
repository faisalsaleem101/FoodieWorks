"use client";

import { useState } from "react";
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

function JobSeekerSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Your Next Culinary Adventure</CardTitle>
          <CardDescription>
            Search for jobs in the restaurant industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Job title or keywords"
              className="w-full sm:w-1/3"
            />
            <Input placeholder="Location" className="w-full sm:w-1/3" />
            <Button className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            id: 1,
            company: "Gourmet Delights",
            logo: "G",
            title: "Head Chef",
            location: "New York, NY",
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
            title: "Sous Chef",
            location: "Los Angeles, CA",
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
            title: "Pastry Chef",
            location: "Chicago, IL",
            type: "Contract",
            time: "2d ago",
            tags: [
              "Dessert Creation",
              "Baking",
              "Cake Decoration",
              "Menu Planning",
            ],
            isNew: true,
            rating: 4.2,
          },
        ].map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 flex-grow card-box-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <Avatar className="h-16 w-16 mr-3">
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
                      <Button className="w-full bg-blue-400 hover:bg-blue-600">
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("jobSeeker");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 text-orange-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FoodieWorks: Restaurant Industry Job Board
        </motion.h1>

        <div className="flex justify-center mb-8">
          <Button
            variant={activeTab === "jobSeeker" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setActiveTab("jobSeeker")}
          >
            <Briefcase className="mr-2 h-4 w-4" /> Job Seekers
          </Button>
          <Button
            variant={activeTab === "employer" ? "default" : "outline"}
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
            <Button>
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
            key={index}
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
                    <Button variant="default" className="w-full">
                      View Applications
                    </Button>
                  </Link>
                  <Link href={`/messaging/${listing.id}`}>
                    <Button variant="outline" className="w-full">
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
