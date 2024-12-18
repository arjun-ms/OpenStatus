import { useEffect, useActionState } from "react";
import { actionIncidentCreate } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IncidentCreateForm({ onClose }) {
  const [state, action, isPending] = useActionState(actionIncidentCreate, null);

  useEffect(() => {
    if (state && !state.error) {
      // Close the dialog
      onClose();
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      {/* Error Display */}
      {state && state.error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
          {state.message}
        </div>
      )}

      {/* Incident Name Input */}
      <div className="space-y-2">
        <Label htmlFor="status">Incident</Label>
        <Input
          type="text"
          name="incidentName"
          placeholder="Enter incident name"
          required
        />
      </div>

      {/* Service Id Input */}
      <div className="space-y-2">
        <Label htmlFor="serviceId">Service Id</Label>
        <Input
          type="number"
          name="serviceId"
          placeholder="Enter service Id number"
          required
        />
      </div>

      {/* Incident Status Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="incidentStatus">Incident Status</Label>
        <Select name="incidentStatus" defaultValue="ONGOING">
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

      {/* Submit Button */}
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "Updating..." : "Update Incident Status"}
      </Button>
    </form>
  );
}
