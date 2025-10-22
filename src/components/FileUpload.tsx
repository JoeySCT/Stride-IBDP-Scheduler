"use client";

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

/**
 * FileUploadProps interface defines the props for the FileUpload component
 */
interface FileUploadProps {
  onFileProcessed: (data: any[]) => void;
  onError: (error: string) => void;
}

/**
 * FileUpload Component - Excel File Upload with Validation
 * 
 * Features:
 * - Excel file validation (.xlsx, .xls)
 * - File processing with xlsx library
 * - Visual feedback for upload status
 * - Error handling for invalid files
 * - Glass morphism styling consistent with app theme
 * 
 * @param onFileProcessed - Callback when file is successfully processed
 * @param onError - Callback when file processing fails
 */
export default function FileUpload({ onFileProcessed, onError }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'application/excel',
      'application/x-excel',
      'application/x-msexcel'
    ];

    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      onError('Please select a valid Excel file (.xlsx or .xls)');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setFileName(file.name);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Get the first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Filter out empty rows
      const filteredData = jsonData.filter((row: any) => 
        Array.isArray(row) && row.some((cell: any) => cell !== undefined && cell !== '')
      );

      if (filteredData.length === 0) {
        throw new Error('The Excel file appears to be empty or contains no valid data');
      }

      setUploadStatus('success');
      onFileProcessed(filteredData);
      
    } catch (error) {
      console.error('Error processing Excel file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process Excel file';
      onError(errorMessage);
      setUploadStatus('error');
    }
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Upload className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Processing...';
      case 'success':
        return `Successfully uploaded: ${fileName}`;
      case 'error':
        return 'Upload failed';
      default:
        return 'Upload Schedule';
    }
  };

  const getButtonVariant = () => {
    switch (uploadStatus) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          variant={getButtonVariant()}
          className="glass-button hover:scale-105 transition-all duration-300 text-lg px-8 py-4 bg-cyan-100/80 dark:bg-primary/20 border-cyan-300 dark:border-primary text-cyan-800 dark:text-white hover:bg-cyan-200/90 dark:hover:bg-primary/30 hover:text-cyan-800 dark:hover:text-white"
          onClick={handleFileSelect}
          disabled={uploadStatus === 'uploading'}
        >
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            {getStatusText()}
          </div>
        </Button>

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Excel file processed successfully</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span>Please try uploading a valid Excel file</span>
          </div>
        )}

        {uploadStatus !== 'idle' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetUpload}
            className="text-foreground/60 hover:text-foreground"
          >
            Upload another file
          </Button>
        )}
      </div>
    </div>
  );
}
