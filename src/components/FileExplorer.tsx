"use client";

import { useState } from "react";
import {
  ChevronRight,
  File,
  Folder,
  Home,
  ImageIcon,
  Info,
  LayoutGrid,
  List,
  MoreVertical,
  Plus,
  Share2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import React from "react";
import { Sidebar } from "./Sidebar";

// Mock data structure
interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder" | "image" | "document";
  size?: string;
  modified: string;
  path: string;
}

const mockData: Record<string, FileItem[]> = {
  root: [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      modified: "Apr 10, 2025",
      path: "Documents",
    },
    {
      id: "2",
      name: "Images",
      type: "folder",
      modified: "Apr 8, 2025",
      path: "Images",
    },
    {
      id: "3",
      name: "Projects",
      type: "folder",
      modified: "Apr 5, 2025",
      path: "Projects",
    },
    {
      id: "4",
      name: "Resume.pdf",
      type: "file",
      size: "2.1 MB",
      modified: "Apr 1, 2025",
      path: "Resume.pdf",
    },
    {
      id: "5",
      name: "Notes.txt",
      type: "file",
      size: "12 KB",
      modified: "Mar 28, 2025",
      path: "Notes.txt",
    },
  ],
  Documents: [
    {
      id: "6",
      name: "Work",
      type: "folder",
      modified: "Apr 9, 2025",
      path: "Documents/Work",
    },
    {
      id: "7",
      name: "Personal",
      type: "folder",
      modified: "Apr 7, 2025",
      path: "Documents/Personal",
    },
    {
      id: "8",
      name: "Report.docx",
      type: "document",
      size: "1.8 MB",
      modified: "Apr 3, 2025",
      path: "Documents/Report.docx",
    },
    {
      id: "9",
      name: "Budget.xlsx",
      type: "document",
      size: "3.2 MB",
      modified: "Mar 25, 2025",
      path: "Documents/Budget.xlsx",
    },
  ],
  Images: [
    {
      id: "10",
      name: "Vacation",
      type: "folder",
      modified: "Apr 6, 2025",
      path: "Images/Vacation",
    },
    {
      id: "11",
      name: "profile.jpg",
      type: "image",
      size: "1.5 MB",
      modified: "Apr 2, 2025",
      path: "Images/profile.jpg",
    },
    {
      id: "12",
      name: "banner.png",
      type: "image",
      size: "2.8 MB",
      modified: "Mar 30, 2025",
      path: "Images/banner.png",
    },
  ],
  Projects: [
    {
      id: "13",
      name: "Website",
      type: "folder",
      modified: "Apr 4, 2025",
      path: "Projects/Website",
    },
    {
      id: "14",
      name: "App",
      type: "folder",
      modified: "Mar 29, 2025",
      path: "Projects/App",
    },
    {
      id: "15",
      name: "README.md",
      type: "file",
      size: "8 KB",
      modified: "Mar 27, 2025",
      path: "Projects/README.md",
    },
  ],
  "Documents/Work": [
    {
      id: "16",
      name: "Presentation.pptx",
      type: "document",
      size: "5.4 MB",
      modified: "Apr 8, 2025",
      path: "Documents/Work/Presentation.pptx",
    },
    {
      id: "17",
      name: "Contract.pdf",
      type: "file",
      size: "1.2 MB",
      modified: "Apr 5, 2025",
      path: "Documents/Work/Contract.pdf",
    },
  ],
  "Documents/Personal": [
    {
      id: "18",
      name: "Recipes.docx",
      type: "document",
      size: "1.1 MB",
      modified: "Apr 6, 2025",
      path: "Documents/Personal/Recipes.docx",
    },
    {
      id: "19",
      name: "Journal.txt",
      type: "file",
      size: "45 KB",
      modified: "Mar 31, 2025",
      path: "Documents/Personal/Journal.txt",
    },
  ],
  "Images/Vacation": [
    {
      id: "20",
      name: "beach.jpg",
      type: "image",
      size: "3.2 MB",
      modified: "Apr 1, 2025",
      path: "Images/Vacation/beach.jpg",
    },
    {
      id: "21",
      name: "mountains.jpg",
      type: "image",
      size: "2.9 MB",
      modified: "Mar 28, 2025",
      path: "Images/Vacation/mountains.jpg",
    },
  ],
  "Projects/Website": [
    {
      id: "22",
      name: "index.html",
      type: "file",
      size: "12 KB",
      modified: "Apr 3, 2025",
      path: "Projects/Website/index.html",
    },
    {
      id: "23",
      name: "styles.css",
      type: "file",
      size: "8 KB",
      modified: "Apr 2, 2025",
      path: "Projects/Website/styles.css",
    },
  ],
  "Projects/App": [
    {
      id: "24",
      name: "app.js",
      type: "file",
      size: "24 KB",
      modified: "Mar 26, 2025",
      path: "Projects/App/app.js",
    },
    {
      id: "25",
      name: "config.json",
      type: "file",
      size: "2 KB",
      modified: "Mar 25, 2025",
      path: "Projects/App/config.json",
    },
  ],
};

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getCurrentFolderName = () => {
    return currentPath.length === 0
      ? "My Drive"
      : currentPath[currentPath.length - 1];
  };

  const getCurrentPathKey = () => {
    return currentPath.length === 0 ? "root" : currentPath.join("/");
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-5 w-5 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case "document":
        return <File className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleUpload = () => {
    alert("Upload functionality would open a file picker here");
  };

  const currentFiles = mockData[getCurrentPathKey()] || [];

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Google Drive
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid
                className={`h-5 w-5 ${viewMode === "grid" ? "text-blue-600" : "text-gray-500"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List
                className={`h-5 w-5 ${viewMode === "list" ? "text-blue-600" : "text-gray-500"}`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={() => setCurrentPath([])}>
                    My Drive
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {currentPath.map((folder, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#"
                        onClick={() => navigateToBreadcrumb(index)}
                      >
                        {folder}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleUpload}>
                  File upload
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUpload}>
                  Folder upload
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-auto bg-white p-4">
          {currentFiles.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <Folder className="mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg">This folder is empty</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {currentFiles.map((file) => (
                <div
                  key={file.id}
                  className="cursor-pointer rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  onClick={() =>
                    file.type === "folder"
                      ? navigateToFolder(file.name)
                      : window.open(`#file-${file.id}`, "_blank")
                  }
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                    <p className="w-full truncate text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{file.modified}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Modified
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Size
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      file.type === "folder"
                        ? navigateToFolder(file.name)
                        : window.open(`#file-${file.id}`, "_blank")
                    }
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">{getFileIcon(file.type)}</div>
                        <span className="text-sm font-medium text-gray-700">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                      {file.modified}
                    </td>
                    <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                      {file.size || "-"}
                    </td>
                    <td className="px-3 py-2 text-right text-sm whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
