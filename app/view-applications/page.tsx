"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Application {
  id: number;
  name: string;
  role: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  appliedDate: string;
  rating: number;
}

const applications: Application[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Line Cook",
    experience: "3 years",
    location: "New York, NY",
    email: "john@example.com",
    phone: "+1 234 567 8901",
    appliedDate: "2023-04-15",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Sous Chef",
    experience: "5 years",
    location: "Los Angeles, CA",
    email: "jane@example.com",
    phone: "+1 987 654 3210",
    appliedDate: "2023-04-16",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Pastry Chef",
    experience: "4 years",
    location: "Chicago, IL",
    email: "mike@example.com",
    phone: "+1 567 890 1234",
    appliedDate: "2023-04-17",
    rating: 4.2,
  },
];

export default function ViewApplications() {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-orange-800 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-orange-800 mb-8">
          View Applications
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applicants</CardTitle>
              <CardDescription>
                Select an applicant to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {applications.map((app, index) => (
                  <motion.li
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedApplication(app)}
                    >
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${app.id}`}
                          alt={app.name}
                        />
                        <AvatarFallback>
                          {app.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-semibold">{app.name}</p>
                        <p className="text-sm text-gray-500">{app.role}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {app.rating.toFixed(1)}
                        </span>
                      </div>
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedApplication ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedApplication.name}
                      </CardTitle>
                      <CardDescription>
                        {selectedApplication.role}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">
                        {selectedApplication.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{selectedApplication.experience} experience</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{selectedApplication.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{selectedApplication.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{selectedApplication.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                        <span>
                          Applied on {selectedApplication.appliedDate}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Cooking",
                          "Food Safety",
                          "Team Management",
                          "Menu Planning",
                          "Inventory Management",
                        ].map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Actions</h3>
                    <div className="flex space-x-2">
                      <Button>Schedule Interview</Button>
                      <Link href={`/messaging/${selectedApplication.id}`}>
                        <Button variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  Select an applicant to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
