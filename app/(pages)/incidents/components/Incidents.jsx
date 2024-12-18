"use client";

import { useActionState, useState } from "react";
import { actionIncidentEdit } from "@/lib/actions";
import IncidentCreateForm from "@/app/(pages)/incidents/components/IncidentCreateForm";
import EmptyIncidents from "@/components/EmptyIncidents";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { format } from "date-fns";

const Incidents = ({ incidents }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="my-6 flex justify-between items-center">
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
              <IncidentCreateForm
                onClose={() => setIsDialogOpen(!isDialogOpen)}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {incidents.length > 0 ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <TableComponent data={incidents} />
            </div>
          </div>
        </div>
      ) : (
        <EmptyIncidents onCreateClick={() => setIsDialogOpen(!isDialogOpen)} />
      )}
    </div>
  );
};

const TableComponent = ({ data }) => {
  return (
    <Table>
      <TableCaption>All Incidents</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Incident ID</TableHead>
          <TableHead className="text-center">Incident Name</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Related Service ID</TableHead>
          <TableHead className="text-center">Related Service</TableHead>
          <TableHead className="text-center">Created At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((incident) => (
          <TableRow key={incident.id}>
            <TableCell className="text-center">{incident.id}</TableCell>
            <TableCell className="text-center">{incident.name}</TableCell>
            <TableCell
              className={`text-center ${
                incident.status === "ONGOING"
                  ? "text-orange-600"
                  : incident.status === "RESOLVED"
                  ? "text-green-600"
                  : incident.status === "SCHEDULED"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {incident.status}
            </TableCell>
            <TableCell className="text-center">{incident.service.id}</TableCell>
            <TableCell className="text-center">
              {incident.service.name}
            </TableCell>
            <TableCell className="text-center">
              {format(new Date(incident.createdAt), "MM/dd/yyyy")}
            </TableCell>
            <TableCell className="text-center flex items-center justify-around">
              <EditComponent data={incident} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const EditComponent = ({ data }) => {
  const { toast } = useToast();

  const [state, action, isPending] = useActionState(actionIncidentEdit, null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Pencil className="cursor-pointer text-blue-500" />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-5">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Incident</h4>
            <p className="text-sm text-muted-foreground">
              Edit the status for the incident
            </p>
          </div>
          <form
            className="grid gap-2"
            action={(formData) => action({ formData, data })}
          >
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Status</Label>
              <Select name="status" defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONGOING">ONGOING</SelectItem>
                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                  <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Updating..." : "Update Incident Status"}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Incidents;
