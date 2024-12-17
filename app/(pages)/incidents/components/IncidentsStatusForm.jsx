import { useEffect } from "react";
import { useActionState } from "react";
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
import { useRouter } from "next/navigation";

export default function IncidentStatusForm({ onClose }) {
  const [returnData, action, isPending] = useActionState(actionIncidentCreate, null);
  const router = useRouter();

  // Handle successful form submission
  useEffect(() => {
    if (returnData && !returnData.error) {
      // Navigate to incidents page
      router.push("/incidents/");
      // Close the dialog
      if (onClose) {
        onClose();
      }
    }
  }, [returnData, router, onClose]);

  return (
    <form action={action} className="space-y-4">
      {/* Error Display */}
      {returnData && returnData.error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-center">
          {returnData.message}
        </div>
      )}

      {/* Service Name Input */}
      <div className="space-y-2">
        <Label htmlFor="serviceName">Service Name</Label>
        <Input
          type="text"
          id="serviceName"
          name="serviceName"
          placeholder="Enter service name"
          required
        />
      </div>

      {/* Incident Input */}
      <div className="space-y-2">
        <Label htmlFor="status">Incident</Label>
        <Input
          type="text"
          id="incident"
          name="incident"
          placeholder="Enter incident happened"
          required
        />
      </div>

      {/* Incident Status Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="IncidentStatus">Incident Status</Label>
        <Select name="IncidentStatus" defaultValue="Ongoing">
          <SelectTrigger id="status">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Schedule">Scheduled</SelectItem>
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