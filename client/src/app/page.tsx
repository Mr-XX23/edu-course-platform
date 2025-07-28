
import Link from "next/link";
import {ArrowRight, Users, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/header/Navbar";


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#714af5] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      {/* <SubmissionPopup /> */}

      <div className="relative z-10">
        {/* Header */}
       <Navbar />
        {/* Hero Section */}
        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master New Skills with
              <span className="text-[#714af5]"> Expert-Led Courses</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of learners advancing their careers with our
              comprehensive online courses. Learn at your own pace with industry
              experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-[#714af5] hover:bg-[#5a3bd4] text-white px-8 py-4 text-lg group"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-6 text-center">
                <div className="bg-[#714af5] p-3 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Expert Instructors
                </h3>
                <p className="text-gray-400">
                  Learn from industry professionals with years of real-world
                  experience
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-6 text-center">
                <div className="bg-[#714af5] p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Learn at Your Pace
                </h3>
                <p className="text-gray-400">
                  Flexible scheduling that fits your lifestyle and learning
                  preferences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-6 text-center">
                <div className="bg-[#714af5] p-3 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Certified Learning
                </h3>
                <p className="text-gray-400">
                  Earn certificates upon completion to showcase your new skills
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
