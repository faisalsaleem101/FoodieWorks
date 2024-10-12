"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import JobCard from "./JobCard"; // Assume we've moved the job card rendering to a separate component

export default function JobSeekerSection() {
  const [jobs, setJobs] = useState([]); // Assume this is populated with job data
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Load the Google Places API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    const input = document.getElementById("location-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setLocation(place.formatted_address);
    });
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
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
