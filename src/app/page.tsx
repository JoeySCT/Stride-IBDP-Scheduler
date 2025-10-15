"use client";

import React from 'react';
import Header from '@/components/Header';
import Welcome from '@/components/Welcome';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PriorityCombobox } from "@/components/ui/combobox";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div> <Welcome /> </div>
      <div className="container mx-auto px-6">
        {/* Subject Selection Section */}
        <div className="glass-effect rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Select Your Subjects</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Computer Science
              </Button>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Business
              </Button>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Language & Literature
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Mathematics Analysis and Interpretations
              </Button>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Lengua & Literatura
              </Button>
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Physics
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex justify-center mb-8">
          <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            Upload Schedule
          </Button>
        </div>

        {/* Table Section */}
        <div className="glass-effect rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Assignment Deadlines</h2>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableCaption>A list of looming deadlines.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Class</TableHead>
                  <TableHead>Course Level</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead className="text-right">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Mathematics Analysis and Interpretations</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA Exploration</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mathematics Analysis and Interpretations</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA Exploration</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mathematics Analysis and Interpretations</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA Exploration</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mathematics Analysis and Interpretations</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA Exploration</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mathematics Analysis and Interpretations</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA Exploration</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
