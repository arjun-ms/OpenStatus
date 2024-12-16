"use client";
import { useState, useEffect } from "react";
import EmptyState from "@/components/EmptyIncidents";
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
import IncidentStatusForm from "@/app/(pages)/incidents/components/IncidentsStatusForm";
import { fetchAllIncidents } from "@/lib/actions";

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
import EmptyIncidents from "@/components/EmptyIncidents";

const Incidents = ({ data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [incidents, setIncidents] = useState([]);
  console.log(data);

  // for displaying Incidents
  useEffect(() => {
    async function loadIncidents() {
      const result = await fetchAllIncidents();
      if (result.success) {
        setIncidents(result.data);
      }
    }
    loadIncidents();
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of all your incidents.
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
                <DialogTitle>Incidents Form</DialogTitle>
                <IncidentStatusForm onClose={handleCloseDialog} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {incidents.length > 0 ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                {/* table to display all the incidents */}
                <Table>
                  <TableCaption>All Incidents</TableCaption>
                  <TableHeader>
                    <TableRow>
                      
                      <TableHead className="text-center">Incident Name</TableHead>
                      <TableHead className="w-[100px] text-center">
                        Service Name
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="text-center">
                          {incident.title}
                        </TableCell>
                        <TableCell className="text-center">
                          {incident.service.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {incident.status}
                        </TableCell>
                        <TableCell className="text-center">
                          {format(new Date(incident.createdAt), "dd/MM/yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <EmptyIncidents onCreateClick={() => setIsDialogOpen(true)} />
        )}
      </main>
    </div>
  );
};

export default Incidents;
