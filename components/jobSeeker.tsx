"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MessageSquare } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      company: "Gourmet Delights",
      logo: "G",
      image: "/placeholder.svg?height=64&width=64",
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
      image: "/placeholder.svg?height=64&width=64",
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
      image: "/placeholder.svg?height=64&width=64",
      title: "Pastry Chef",
      location: "Chicago, IL",
      type: "Contract",
      time: "2d ago",
      tags: ["Dessert Creation", "Baking", "Cake Decoration", "Menu Planning"],
      isNew: true,
      rating: 4.2,
    },
    // ... (other job listings)
  ];

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.company.toLowerCase().includes(searchLower) ||
      job.title.toLowerCase().includes(searchLower) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

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
              placeholder="Job title or keywords"
              className="w-full sm:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input placeholder="Location" className="w-full sm:w-1/3" />
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
            key={index}
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

export default JobSeekerSection;
