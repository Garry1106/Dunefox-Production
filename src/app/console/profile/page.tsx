"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LogOut, Settings, Mail, Lock, CreditCard, Users, Bell, Download, User, Globe, Key, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#E4572E]">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </motion.div>

      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-8">
        {/* Left Column - Wider for Profile and Security */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Profile Information Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center text-2xl">John Doe</CardTitle>
                <CardDescription className="text-center">Software Engineer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value="john.doe@example.com" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input value="Passionate about building SaaS products." readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value="San Francisco, CA" readOnly />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#E4572E] hover:bg-[#D3451E]">
                  <Settings className="mr-2" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Security Settings Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-10 animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-[#E4572E]" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Two-Factor Authentication</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Password</Label>
                  <Button variant="outline" className="w-full">
                    <Key className="mr-2" /> Change Password
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2" /> Log Out All Sessions
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Middle Column - Narrower for Subscription and Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Subscription Details Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="text-[#E4572E]" /> Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Plan</Label>
                  <Input value="Pro Plan" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Renewal Date</Label>
                  <Input value="January 1, 2024" readOnly />
                </div>
                <Button className="w-full bg-[#E4572E] hover:bg-[#D3451E]">Upgrade Plan</Button>
              </CardContent>
            </Card>
          )}

          {/* Notification Preferences Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-10 animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-10 animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-10 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="text-[#E4572E]" /> Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SMS Notifications</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Right Column - Narrower for Team and Data Management */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-8"
        >
          {/* Team Management Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-[#E4572E]" /> Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Team Members</Label>
                  <Input value="5 Members" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Team Role</Label>
                  <Input value="Admin" readOnly />
                </div>
                <Button className="w-full bg-[#E4572E] hover:bg-[#D3451E]">Invite Members</Button>
              </CardContent>
            </Card>
          )}

          {/* Data Export and Privacy Card */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="text-[#E4572E]" /> Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-[#E4572E] hover:bg-[#D3451E]">
                  <Download className="mr-2" /> Download Data
                </Button>
                <Button variant="outline" className="w-full">
                  <Globe className="mr-2" /> Privacy Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;