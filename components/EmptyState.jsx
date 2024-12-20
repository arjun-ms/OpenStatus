import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";


const EmptyState = ({ onCreateClick }) => {
  return (
    <div className="text-center py-12">
      <Activity className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No monitors</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first monitor
      </p>
      <div className="mt-6">
        <Button onClick={onCreateClick}>
          <Activity className="w-4 h-4 mr-2" />
          Create monitor
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;