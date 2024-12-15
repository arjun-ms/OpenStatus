// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { useRouter } from 'next/router';

// // Validation schema
// const ServiceSchema = z.object({
//   serviceName: z
//     .string()
//     .min(2, { message: "Service name must be at least 2 characters" }),
//   link: z.string().url({ message: "Invalid URL" }),
//   method: z.enum(["GET", "POST"]),
//   serviceStatus: z.enum([
//     "Operational",
//     "Degraded_Performance",
//     "Partial_Outage",
//     "Major_Outage",
//   ]),
// });

// const submitServiceStatus = async (e) => {
//   const router = useRouter();
  
//   e.preventDefault();

//   // Collect form data
//   const formData = new FormData(e.target);
//   const data = {
//     serviceName: formData.get("serviceName"),
//     link: formData.get("link"),
//     method: formData.get("method"),
//     serviceStatus: formData.get("serviceStatus"),
//   };

//   try {
//     // Validate the data using Zod schema
//     const validatedData = ServiceSchema.parse(data);

//     // Make the API call
//     const response = await fetch("/api/status", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(validatedData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit service status");
//     }

//     // Handle successful response
//     const result = await response.json();
//     alert("Service status updated successfully: " + result.message);

//     // Redirect to the 'monitors' page
//     router.push('/monitors'); // Redirect after successful form submission

//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       // Zod validation errors
//       alert(
//         "Validation error: " +
//           err.errors.map((error) => error.message).join(", ")
//       );
//     } else {
//       // General errors
//       console.error("Error submitting service status:", err);
//       alert("Failed to submit service status");
//     }
//   }
// };

// export default function ServiceStatusForm() {
//   const router = useRouter();

//   return (
//     <div className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Service Status Form</h2>
//       <form onSubmit={submitServiceStatus} className="space-y-4">
//         {/* Service Name Input */}
//         <div className="space-y-2">
//           <Label htmlFor="serviceName">Service Name</Label>
//           <Input
//             type="text"
//             id="serviceName"
//             name="serviceName"
//             placeholder="Enter service name"
//             required
//           />
//         </div>

//         {/* Link Input */}
//         <div className="space-y-2">
//           <Label htmlFor="link">Service Link</Label>
//           <Input
//             type="url"
//             id="link"
//             name="link"
//             placeholder="https://example.com"
//             required
//           />
//         </div>

//         {/* Method Dropdown */}
//         <div className="space-y-2">
//           <Label>HTTP Method</Label>
//           <Select name="method" required>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Method" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="GET">GET</SelectItem>
//               <SelectItem value="POST">POST</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Service Status Dropdown */}
//         <div className="space-y-2">
//           <Label>Service Status</Label>
//           <Select name="serviceStatus" required>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Operational">Operational</SelectItem>
//               <SelectItem value="Degraded_Performance">
//                 Degraded Performance
//               </SelectItem>
//               <SelectItem value="Partial_Outage">Partial Outage</SelectItem>
//               <SelectItem value="Major_Outage">Major Outage</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Submit Button */}
//         <Button type="submit" className="w-full">
//           Update Service Status
//         </Button>
//       </form>
//          
//     </div>
//   );
// }


//! Claude
'use client';

import React, { useState } from 'react';
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

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';


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

export default function ServiceStatusForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceName: '',
    link: '',
    method: 'GET',
    serviceStatus: 'Operational'
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitServiceStatus = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      // Validate the data using Zod schema
      const validatedData = ServiceSchema.parse(formData);

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

      // // Redirect to the 'monitors' page
      // router.push('/monitors');

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      // Use router.refresh() instead of router.push()
      router.refresh();

    } catch (err) {
      if (err instanceof z.ZodError) {
        // Zod validation errors
        const validationErrors = err.errors.map((error) => error.message);
        setErrors(validationErrors);
      } else {
        // General errors
        console.error("Error submitting service status:", err);
        setErrors(["Failed to submit service status"]);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Service Status Form</h2>
      <form onSubmit={submitServiceStatus} className="space-y-4">
        {/* Error Display */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
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
            value={formData.serviceName}
            onChange={(e) => handleInputChange('serviceName', e.target.value)}
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
            value={formData.link}
            onChange={(e) => handleInputChange('link', e.target.value)}
            required
          />
        </div>

        {/* Method Dropdown */}
        <div className="space-y-2">
          <Label>HTTP Method</Label>
          <Select 
            value={formData.method}
            onValueChange={(value) => handleInputChange('method', value)}
          >
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
          <Select 
            value={formData.serviceStatus}
            onValueChange={(value) => handleInputChange('serviceStatus', value)}
          >
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