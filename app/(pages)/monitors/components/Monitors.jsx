"use client";
import { useState, useEffect } from "react";
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
import ServiceStatusForm from "@/app/(pages)/monitors/components/ServiceStatusForm";
import { fetchAllServices } from "@/lib/actions";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { format } from "date-fns";

const Monitors = ({data}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [services, setServices] = useState([]);
  console.log(data)


  // for displaying monitors
  useEffect(() => {
    async function loadServices() {
      const result = await fetchAllServices();
      if (result.success) {
        setServices(result.data);
      }
    }
    loadServices();
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
                <ServiceStatusForm onClose={handleCloseDialog} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {services.length > 0 ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">

                {/* table to display all the services */}
                <Table>
                  <TableCaption>All Services</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-center">
                        Name
                      </TableHead>
                      <TableHead className="text-center">Method</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="text-center">
                          {service.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {service.method}
                        </TableCell>
                        <TableCell className="text-center">
                          {service.status}
                        </TableCell>
                        <TableCell className="text-center">
                          {format(new Date(service.createdAt), "MM/dd/yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
