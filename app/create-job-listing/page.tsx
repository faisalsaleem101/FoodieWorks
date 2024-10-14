"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  Calendar,
  Wand2,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JobDescriptionModal from "./JobDescriptionModal";

const apiKey = "AIzaSyDJc3FZ_UlF-6jO7RU0IuEwbWjtg_N6g5s";
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Function to call Gemini API
async function callGeminiAPI(message: string) {
  try {
    const result = await model.generateContent([message]);
    return result?.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export default function CreateJobListing() {
  const [jobType, setJobType] = useState("");
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobType: "",
    salary: "",
    location: "",
    qualifications: "",
    benefits: "",
    startDate: "",
    applicationDeadline: "",
    description: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Create a job description for a ${jobDetails.jobTitle} position. 
      This is a ${jobDetails.jobType} role with a salary range of ${jobDetails.salary}, 
      located in ${jobDetails.location}. The qualifications needed are: ${jobDetails.qualifications}. 
      Benefits include: ${jobDetails.benefits}. The start date is ${jobDetails.startDate} 
      and the application deadline is ${jobDetails.applicationDeadline}. 
      Please write a comprehensive and engaging job description based on this information.`;

      const generatedDescription = await callGeminiAPI(prompt);
      setJobDetails((prev) => ({
        ...prev,
        description: generatedDescription || "",
      }));
    } catch (error) {
      console.error("Error generating description:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setJobDetails((prev) => ({ ...prev, description: newDescription }));
  };

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
          Create Job Listing
        </h1>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill in the details for your new job listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Head Chef, Sous Chef, Line Cook"
                value={jobDetails.jobTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select
                onValueChange={(value) => {
                  setJobType(value);
                  setJobDetails((prev) => ({ ...prev, jobType: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="salary"
                    className="pl-10"
                    placeholder="e.g., 50,000 - 70,000"
                    value={jobDetails.salary}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="location"
                    className="pl-10"
                    placeholder="e.g., New York, NY"
                    value={jobDetails.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                placeholder="List required skills, experience, and education"
                rows={3}
                value={jobDetails.qualifications}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-10"
                    value={jobDetails.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">
                  Application Deadline
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="applicationDeadline"
                    type="date"
                    className="pl-10"
                    value={jobDetails.applicationDeadline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea
                id="benefits"
                placeholder="List any benefits or perks associated with this position"
                rows={3}
                value={jobDetails.benefits}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description">Job Description</Label>
                <div className="space-x-2">
                  <Button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Description"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    <Maximize2 className="mr-2 h-4 w-4" />
                    Expand
                  </Button>
                </div>
              </div>
              <Textarea
                id="description"
                placeholder="Job description will be generated here"
                rows={5}
                value={jobDetails.description}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Job Listing</Button>
        </CardFooter>
      </Card>

      <JobDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={jobDetails.description}
        onDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
}
