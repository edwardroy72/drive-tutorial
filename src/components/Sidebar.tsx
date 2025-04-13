import { Plus, Home, Share2, Star, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

{
  /* Sidebar */
}

export function Sidebar() {
  return (
    <div className="hidden w-64 border-r border-gray-200 bg-white p-4 md:block">
      <div className="mb-8">
        <Button className="w-full justify-start gap-2 rounded-full bg-blue-100 px-6 py-2 text-blue-600 hover:bg-blue-200">
          <Plus className="h-5 w-5" />
          New
        </Button>
      </div>

      <nav className="space-y-1">
        <a
          href="#"
          className="flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
        >
          <Home className="mr-3 h-5 w-5" />
          My Drive
        </a>
        <a
          href="#"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Share2 className="mr-3 h-5 w-5" />
          Shared with me
        </a>
        <a
          href="#"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Star className="mr-3 h-5 w-5" />
          Starred
        </a>
        <a
          href="#"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Trash2 className="mr-3 h-5 w-5" />
          Trash
        </a>
      </nav>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Storage</span>
          <span>5.4 GB of 15 GB used</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: "36%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
