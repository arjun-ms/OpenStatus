"use client";

import { useActionState, useState } from "react";
import { actionServiceEdit, actionServiceRemove } from "@/lib/actions";
import ServiceStatusForm from "./ServiceStatusForm";
import EmptyState from "@/components/EmptyState";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

const Monitors = ({ services }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="my-6 flex justify-between items-center">
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
              <ServiceStatusForm
                onClose={() => setIsDialogOpen(!isDialogOpen)}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {services.length > 0 ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <TableComponent data={services} />
            </div>
          </div>
        </div>
      ) : (
        <EmptyState onCreateClick={() => setIsDialogOpen(!isDialogOpen)} />
      )}
    </div>
  );
};

const TableComponent = ({ data }) => {
  const { toast } = useToast();

  const handleRemove = async (serviceId) => {
    try {
      const state = await actionServiceRemove(serviceId);
      toast({
        result: "Info",
        description: state.message,
      });
    } catch (error) {
      toast({
        result: "Info",
        description: error.message,
      });
    }
  };

  return (
    <Table>
      <TableCaption>All Services</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Service ID</TableHead>
          <TableHead className="text-center">Service Name</TableHead>
          <TableHead className="text-center">Link</TableHead>
          <TableHead className="text-center">Method</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Created At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="text-center">{service.id}</TableCell>
            <TableCell className="text-center">{service.name}</TableCell>
            <TableCell className="text-center">{service.link}</TableCell>
            <TableCell className="text-center">{service.method}</TableCell>
            <TableCell className="text-center">{service.status}</TableCell>
            <TableCell className="text-center">
              {format(new Date(service.createdAt), "MM/dd/yyyy")}
            </TableCell>
            <TableCell className="text-center flex items-center justify-around">
              <EditComponent data={service} />
              <Trash2
                onClick={() => handleRemove(service.id)}
                className="cursor-pointer text-red-500"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const EditComponent = ({ data }) => {
  const [state, action, isPending] = useActionState(actionServiceEdit, null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Pencil className="cursor-pointer text-blue-500" />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-5">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Services</h4>
            <p className="text-sm text-muted-foreground">
              Set the info for the service
            </p>
          </div>
          <form
            className="grid gap-2"
            action={(formData) => action({ formData, data })}
          >
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Service Name</Label>
              <Input
                name="serviceName"
                defaultValue={data.name}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Service Link</Label>
              <Input
                name="link"
                defaultValue={data.link}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>HTTP Method</Label>
              <Select name="httpMethod" defaultValue={data.method}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Service Status</Label>
              <Select name="serviceStatus" defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPERATIONAL">OPERATIONAL</SelectItem>
                  <SelectItem value="DEGRADED_PERFORMANCE">
                    DEGRADED_PERFORMANCE
                  </SelectItem>
                  <SelectItem value="PARTIAL_OUTAGE">PARTIAL_OUTAGE</SelectItem>
                  <SelectItem value="MAJOR_OUTAGE">MAJOR_OUTAGE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Updating..." : "Update Service Status"}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Monitors;