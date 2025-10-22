"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Welcome from '@/components/Welcome';
import FileUpload from '@/components/FileUpload';
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

/**
 * Main Home Component - IB Scheduler List Application
 * 
 * This component serves as the main interface for the IB student schedule management system.
 * It provides:
 * - Subject selection interface organized by IB subject groups
 * - Assignment deadline management table
 * - Modern glass morphism UI with theme support
 * 
 * Key Features:
 * - Responsive design for all device sizes
 * - Interactive subject selection buttons
 * - Priority management for assignments
 * - Clean, accessible table layout
 */
export default function Home() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const MAX_SELECTIONS = 6;

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        // Remove subject if already selected
        return prev.filter(s => s !== subject);
      } else if (prev.length < MAX_SELECTIONS) {
        // Add subject if under limit
        return [...prev, subject];
      }
      // Don't add if at limit
      return prev;
    });
  };

  const handleFileProcessed = (data: any[]) => {
    setUploadedData(data);
    setUploadError('');
    console.log('Excel data processed:', data);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadedData([]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mb-8"> <Welcome /> </div>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Subject Selection Section */}
        <div className="glass-effect rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-light mb-4 text-center text-foreground tracking-wide">Select Your Subjects</h2>
          <p className="text-center text-foreground/70 mb-8 text-sm">Choose your IB subjects to customize your schedule and assignment tracking</p>
          <div className="text-center mb-6">
            <span className="text-sm text-foreground/60">
              Selected: {selectedSubjects.length}/{MAX_SELECTIONS} subjects
            </span>
          </div>
          <div className="space-y-8">
            {/* Mathematics & Sciences */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-center text-foreground/80">Mathematics & Sciences</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Math AA') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Math AA')}
                  disabled={!selectedSubjects.includes('Math AA') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Math AA
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Math AI') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Math AI')}
                  disabled={!selectedSubjects.includes('Math AI') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Math AI
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Physics') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Physics')}
                  disabled={!selectedSubjects.includes('Physics') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Physics
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Chemistry') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Chemistry')}
                  disabled={!selectedSubjects.includes('Chemistry') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Chemistry
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Biology') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Biology')}
                  disabled={!selectedSubjects.includes('Biology') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Biology
                </Button>
              </div>
            </div>

            {/* Languages & Literature */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-center text-foreground/80">Languages & Literature</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Language & Literature') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Language & Literature')}
                  disabled={!selectedSubjects.includes('Language & Literature') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Language & Literature
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Lengua & Literatura') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Lengua & Literatura')}
                  disabled={!selectedSubjects.includes('Lengua & Literatura') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Lengua & Literatura
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('French') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('French')}
                  disabled={!selectedSubjects.includes('French') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  French
                </Button>
              </div>
            </div>

            {/* Social Sciences */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-center text-foreground/80">Social Sciences</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('History') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('History')}
                  disabled={!selectedSubjects.includes('History') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  History
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Psychology') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Psychology')}
                  disabled={!selectedSubjects.includes('Psychology') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Psychology
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Business') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Business')}
                  disabled={!selectedSubjects.includes('Business') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Business
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Economics') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Economics')}
                  disabled={!selectedSubjects.includes('Economics') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Economics
                </Button>
              </div>
            </div>

            {/* Arts & Technology */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-center text-foreground/80">Arts & Technology</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Computer Science') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Computer Science')}
                  disabled={!selectedSubjects.includes('Computer Science') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Computer Science
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Design Technology') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Design Technology')}
                  disabled={!selectedSubjects.includes('Design Technology') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Design Technology
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Music') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Music')}
                  disabled={!selectedSubjects.includes('Music') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Music
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Art') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Art')}
                  disabled={!selectedSubjects.includes('Art') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Art
                </Button>
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 ${
                    selectedSubjects.includes('Film') 
                      ? 'bg-primary/20 border-primary text-foreground dark:bg-blue-400/20 dark:border-blue-300 dark:text-blue-200' 
                      : ''
                  }`}
                  onClick={() => handleSubjectToggle('Film')}
                  disabled={!selectedSubjects.includes('Film') && selectedSubjects.length >= MAX_SELECTIONS}
                >
                  Film
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center mb-12">
          <p className="text-center text-foreground/70 mb-4 text-sm">Upload your school schedule or import from your school's system</p>
          <FileUpload 
            onFileProcessed={handleFileProcessed}
            onError={handleUploadError}
          />
          {uploadError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {uploadError}
            </div>
          )}
          {uploadedData.length > 0 && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
              Successfully loaded {uploadedData.length} rows from Excel file
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-3xl font-light mb-8 text-center text-foreground tracking-wide">Assignment Deadlines</h2>
          <div className="overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm">
            <Table>
              <TableCaption className="text-muted-foreground/80">A list of looming deadlines.</TableCaption>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="w-[140px] font-medium">Class</TableHead>
                  <TableHead className="font-medium">Course Level</TableHead>
                  <TableHead className="font-medium">Assignment</TableHead>
                  <TableHead className="text-right font-medium">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">Mathematics Analysis and Approaches</TableCell>
                  <TableCell>Higher Level</TableCell>
                  <TableCell>IA: Statistical Analysis of Climate Data</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">Physics</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>Lab Report: Pendulum Investigation</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">English A: Language & Literature</TableCell>
                  <TableCell>Higher Level</TableCell>
                  <TableCell>Individual Oral: Global Issues Analysis</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">History</TableCell>
                  <TableCell>Higher Level</TableCell>
                  <TableCell>IA: Causes of World War I</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">Computer Science</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA: Student Management System</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">Chemistry</TableCell>
                  <TableCell>Higher Level</TableCell>
                  <TableCell>Lab Report: Organic Synthesis</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">Economics</TableCell>
                  <TableCell>Standard Level</TableCell>
                  <TableCell>IA: Market Analysis of Renewable Energy</TableCell>
                  <TableCell className="text-right"><div className="flex justify-end"><PriorityCombobox /></div></TableCell>
                </TableRow>
                <TableRow className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium">French B</TableCell>
                  <TableCell>Higher Level</TableCell>
                  <TableCell>Written Assignment: Cultural Comparison</TableCell>
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
