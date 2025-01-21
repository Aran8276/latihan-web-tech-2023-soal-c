import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="overflow-x-clip">
      <div className="flex justify-center scale-[3] items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}
