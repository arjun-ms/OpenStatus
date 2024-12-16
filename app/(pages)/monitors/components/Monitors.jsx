"use client";
import { useState } from "react";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServiceStatusForm from "@/components/ServiceStatusForm";

const Monitors = () => {
  const [monitors, setMonitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateMonitor = () => {
    toast({
      title: "Coming soon!",
      description: "Monitor creation will be implemented in the next version.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monitors</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of all your monitors.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Service Status Form</DialogTitle>
                <ServiceStatusForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {monitors && monitors?.length > 0 ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search monitors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        ) : (
          <EmptyState onCreateClick={() => setIsDialogOpen(true)} />
        )}
      </main>
    </div>
  );
};

export default Monitors;
