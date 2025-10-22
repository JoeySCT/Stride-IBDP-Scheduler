"use client";

import React, { useState, useMemo } from 'react';
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
 * Assignment interface for parsed Excel data
 */
interface Assignment {
  class: string;
  assignment: string;
  date: string;
  priority?: string;
}

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
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const MAX_SELECTIONS = 6;

  // Placeholder assignments when no Excel file is uploaded
  const placeholderAssignments: Assignment[] = [
    {
      class: "Mathematics Analysis and Approaches",
      assignment: "IA: Statistical Analysis of Climate Data",
      date: "March 15, 2024",
      priority: "High"
    },
    {
      class: "Physics",
      assignment: "Lab Report: Pendulum Investigation",
      date: "February 28, 2024",
      priority: "Medium"
    },
    {
      class: "English A: Language & Literature",
      assignment: "Individual Oral: Global Issues Analysis",
      date: "April 5, 2024",
      priority: "High"
    },
    {
      class: "History",
      assignment: "IA: Causes of World War I",
      date: "March 22, 2024",
      priority: "Medium"
    },
    {
      class: "Computer Science",
      assignment: "IA: Student Management System",
      date: "April 12, 2024",
      priority: "High"
    },
    {
      class: "Chemistry",
      assignment: "Lab Report: Organic Synthesis",
      date: "March 8, 2024",
      priority: "Low"
    },
    {
      class: "Economics",
      assignment: "IA: Market Analysis of Renewable Energy",
      date: "April 18, 2024",
      priority: "Medium"
    },
    {
      class: "French B",
      assignment: "Written Assignment: Cultural Comparison",
      date: "March 29, 2024",
      priority: "Low"
    }
  ];

  // Function to parse Excel data and extract assignments
  const parseExcelData = (data: any[]): Assignment[] => {
    if (!data || data.length === 0) return [];

    // Find header row (first non-empty row)
    const headerRowIndex = data.findIndex((row: any) => 
      Array.isArray(row) && row.some((cell: any) => 
        cell && typeof cell === 'string' && cell.toLowerCase().includes('class')
      )
    );

    if (headerRowIndex === -1) {
      throw new Error('Could not find header row with "class" column in Excel file');
    }

    const headers = data[headerRowIndex];
    const dataRows = data.slice(headerRowIndex + 1);

    // Find column indices
    const classIndex = headers.findIndex((header: any) => 
      header && typeof header === 'string' && header.toLowerCase().includes('class')
    );
    const assignmentIndex = headers.findIndex((header: any) => 
      header && typeof header === 'string' && header.toLowerCase().includes('assignment')
    );
    const dateIndex = headers.findIndex((header: any) => 
      header && typeof header === 'string' && 
      (header.toLowerCase().includes('date') || header.toLowerCase().includes('due'))
    );

    if (classIndex === -1 || assignmentIndex === -1 || dateIndex === -1) {
      throw new Error('Excel file must contain columns: class, assignment, and date');
    }

    // Parse data rows
    const parsedAssignments: Assignment[] = [];
    
    dataRows.forEach((row: any, index: number) => {
      if (!Array.isArray(row)) return;
      
      const classValue = row[classIndex];
      const assignmentValue = row[assignmentIndex];
      const dateValue = row[dateIndex];

      // Skip empty rows
      if (!classValue || !assignmentValue || !dateValue) return;

      // Format date
      let formattedDate = dateValue.toString();
      if (dateValue instanceof Date) {
        formattedDate = dateValue.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else if (typeof dateValue === 'number') {
        // Handle Excel date serial numbers
        const excelDate = new Date((dateValue - 25569) * 86400 * 1000);
        formattedDate = excelDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      parsedAssignments.push({
        class: classValue.toString(),
        assignment: assignmentValue.toString(),
        date: formattedDate,
        priority: 'Medium' // Default priority
      });
    });

    return parsedAssignments;
  };

  // Get assignments to display (from Excel or placeholder) and filter by selected subjects
  const displayAssignments = useMemo(() => {
    const sourceAssignments = assignments.length > 0 ? assignments : placeholderAssignments;
    
    // If no subjects are selected, show all assignments
    if (selectedSubjects.length === 0) {
      return sourceAssignments;
    }
    
    // Filter assignments based on selected subjects
    return sourceAssignments.filter(assignment => {
      // Check if the assignment's class matches any of the selected subjects
      return selectedSubjects.some(subject => {
        // Handle various ways the class name might match the subject
        const classLower = assignment.class.toLowerCase();
        const subjectLower = subject.toLowerCase();
        
        // Direct match
        if (classLower.includes(subjectLower) || subjectLower.includes(classLower)) {
          return true;
        }
        
        // Handle specific IB subject mappings
        const subjectMappings: { [key: string]: string[] } = {
          'Math AA': ['mathematics analysis', 'math aa', 'analysis and approaches'],
          'Math AI': ['mathematics applications', 'math ai', 'applications and interpretation'],
          'Physics': ['physics'],
          'Chemistry': ['chemistry'],
          'Biology': ['biology'],
          'Language & Literature': ['language and literature', 'english a', 'mla'],
          'Lengua & Literatura': ['lengua y literatura', 'spanish a'],
          'French': ['french'],
          'History': ['history'],
          'Psychology': ['psychology'],
          'Business': ['business'],
          'Economics': ['economics'],
          'Computer Science': ['computer science', 'cs'],
          'Design Technology': ['design technology', 'dt'],
          'Music': ['music'],
          'Art': ['art', 'visual arts'],
          'Film': ['film']
        };
        
        const mappedTerms = subjectMappings[subject] || [];
        return mappedTerms.some(term => classLower.includes(term));
      });
    });
  }, [assignments, selectedSubjects]);

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
    try {
      const parsedAssignments = parseExcelData(data);
      setAssignments(parsedAssignments);
      setUploadedData(data);
      setUploadError('');
      console.log('Excel data processed:', parsedAssignments);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to parse Excel data';
      handleUploadError(errorMessage);
    }
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadedData([]);
    setAssignments([]); // Clear assignments on error
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mb-8"> <Welcome /> </div>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Subject Selection Section */}
        <div className="glass-effect rounded-2xl p-10 mb-12">
          <h2 className="text-3xl font-light mb-4 text-center text-foreground tracking-wide">Select Your Subjects</h2>
          <p className="text-center text-foreground/70 mb-8 text-sm">Choose your IB subjects to customize your schedule and assignment tracking</p>
          <div className="text-center mb-4">
            <span className="text-sm text-foreground/60">
              Selected: {selectedSubjects.length}/{MAX_SELECTIONS} subjects
            </span>
          </div>
          <div className="space-y-8">
            {/* Mathematics & Sciences */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-center text-foreground/80">Mathematics & Sciences</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
                <Button 
                  variant="outline" 
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
                  className={`glass-button hover:scale-105 transition-all duration-300 text-xs px-3 py-2 h-auto min-h-[40px] whitespace-normal text-center leading-tight ${
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
          {assignments.length > 0 && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
              Successfully loaded {assignments.length} assignments from Excel file
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="glass-effect rounded-2xl p-10">
          <h2 className="text-3xl font-light mb-8 text-center text-foreground tracking-wide">Assignment Deadlines</h2>
          <div className="overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm">
            <Table>
              <TableCaption className="text-muted-foreground/80">A list of looming deadlines.</TableCaption>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="w-[200px] font-medium">Class</TableHead>
                  <TableHead className="font-medium">Assignment</TableHead>
                  <TableHead className="w-[140px] font-medium">Due Date</TableHead>
                  <TableHead className="w-[120px] font-medium">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayAssignments.map((assignment, index) => (
                  <TableRow key={index} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">{assignment.class}</TableCell>
                    <TableCell>{assignment.assignment}</TableCell>
                    <TableCell>{assignment.date}</TableCell>
                    <TableCell><PriorityCombobox /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
