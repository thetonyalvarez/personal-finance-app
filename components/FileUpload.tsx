'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FileUploadProps {
  onUpload: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        const data = parseCsv(text);
        onUpload(data);
      }
    };
    reader.readAsText(file);
  };

  const parseCsv = (text: string): any[] => {
    // This is a simple CSV parser. For production, use a robust CSV parsing library.
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index].trim();
        return obj;
      }, {} as any);
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="csv-file">Upload CSV File</Label>
        <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        Upload and Process
      </Button>
    </div>
  );
};

export default FileUpload;