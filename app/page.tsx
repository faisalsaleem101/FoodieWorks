"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Briefcase, Search, PlusCircle, Star, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('jobSeeker');

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
            variant={activeTab === 'jobSeeker' ? 'default' : 'outline'}
            className="mr-2"
            onClick={() => setActiveTab('jobSeeker')}
          >
            <Briefcase className="mr-2 h-4 w-4" /> Job Seekers
          </Button>
          <Button
            variant={activeTab === 'employer' ? 'default' : 'outline'}
            onClick={() => setActiveTab('employer')}
          >
            <Utensils className="mr-2 h-4 w-4" /> Employers
          </Button>
        </div>

        {activeTab === 'jobSeeker' && (
          <JobSeekerSection />
        )}

        {activeTab === 'employer' && (
          <EmployerSection />
        )}
      </main>
    </div>
  );
}

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
          <CardDescription>Search for jobs in the restaurant industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Job title or keywords" />
            <Input placeholder="Location" />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 1, title: "Head Chef", company: "Gourmet Delights", location: "New York, NY", rating: 4.7 },
          { id: 2, title: "Sous Chef", company: "Flavor Haven", location: "Los Angeles, CA", rating: 4.5 },
          { id: 3, title: "Pastry Chef", company: "Sweet Sensations", location: "Chicago, IL", rating: 4.8 },
        ].map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                  <div className="flex items-center bg-yellow-100 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{job.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{job.location}</p>
                <div className="space-y-2">
                  <Button className="w-full" variant="default">Apply Now</Button>
                  <Link href={`/messaging/${job.id}`}>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Employer
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
          <CardDescription>Find the perfect candidate for your restaurant</CardDescription>
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
                    <CardDescription>{listing.applications} applications received</CardDescription>
                  </div>
                  <div className="flex items-center bg-yellow-100 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{listing.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/view-applications">
                    <Button variant="default" className="w-full">View Applications</Button>
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