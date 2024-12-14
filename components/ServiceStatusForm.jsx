import { z } from "zod";
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

// Validation schema
const ServiceSchema = z.object({
  serviceName: z.string().min(2, { message: "Service name must be at least 2 characters" }),
  link: z.string().url({ message: "Invalid URL" }),
  method: z.enum(["GET", "POST"]),
  serviceStatus: z.enum(["Operational", "Degraded Performance", "Partial Outage", "Major Outage"])
});



export default function ServiceStatusForm() {
  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Service Status Form</h2>
      <form action={()=>submitServiceStatus} className="space-y-4">
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
          <Label>HTTP Method</Label>
          <Select name="method" required>
            <SelectTrigger>
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
          <Label>Service Status</Label>
          <Select name="serviceStatus" required>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operational">Operational</SelectItem>
              <SelectItem value="Degraded Performance">Degraded Performance</SelectItem>
              <SelectItem value="Partial Outage">Partial Outage</SelectItem>
              <SelectItem value="Major Outage">Major Outage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Update Service Status
        </Button>
      </form>
    </div>
  );
}