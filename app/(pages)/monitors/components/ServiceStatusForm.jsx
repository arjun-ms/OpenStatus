import { useEffect } from "react";
import { useActionState } from "react";
import { actionService } from "@/lib/actions";
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

export default function ServiceStatusForm({ onClose }) {
  const [returnData, action, isPending] = useActionState(actionService, null);
  const router = useRouter();

  // Handle successful form submission
  useEffect(() => {
    if (returnData && !returnData.error) {
      // Navigate to monitors page
      router.push("/monitors/");
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

      {/* Link Input */}
      <div className="space-y-2">
        <Label htmlFor="link">Service Link</Label>
        <Input
          type="url"
          id="link"
          name="link"
          placeholder="https://example.com"
          required
        />
      </div>

      {/* Method Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="httpMethod">HTTP Method</Label>
        <Select name="httpMethod" defaultValue="GET">
          <SelectTrigger id="httpMethod">
            <SelectValue placeholder="Select Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Status Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="serviceStatus">Service Status</Label>
        <Select name="serviceStatus" defaultValue="OPERATIONAL">
          <SelectTrigger id="serviceStatus">
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

      {/* Submit Button */}
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "Updating..." : "Update Service Status"}
      </Button>
    </form>
  );
}