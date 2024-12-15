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
  serviceName: z
    .string()
    .min(2, { message: "Service name must be at least 2 characters" }),
  link: z.string().url({ message: "Invalid URL" }),
  method: z.enum(["GET", "POST"]),
  serviceStatus: z.enum([
    "Operational",
    "Degraded_Performance",
    "Partial_Outage",
    "Major_Outage",
  ]),
});

const submitServiceStatus = async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(e.target);
  const data = {
    serviceName: formData.get("serviceName"),
    link: formData.get("link"),
    method: formData.get("method"),
    serviceStatus: formData.get("serviceStatus"),
  };

  try {
    // Validate the data using Zod schema
    const validatedData = ServiceSchema.parse(data);

    // Make the API call
    const response = await fetch("/api/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit service status");
    }

    // Handle successful response
    const result = await response.json();
    alert("Service status updated successfully: " + result.message);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Zod validation errors
      alert(
        "Validation error: " +
          err.errors.map((error) => error.message).join(", ")
      );
    } else {
      // General errors
      console.error("Error submitting service status:", err);
      alert("Failed to submit service status");
    }
  }
};

export default function ServiceStatusForm() {
  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Service Status Form</h2>
      <form onSubmit={submitServiceStatus} className="space-y-4">
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
              <SelectItem value="Degraded_Performance">
                Degraded Performance
              </SelectItem>
              <SelectItem value="Partial_Outage">Partial Outage</SelectItem>
              <SelectItem value="Major_Outage">Major Outage</SelectItem>
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
