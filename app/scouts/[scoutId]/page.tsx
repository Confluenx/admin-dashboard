"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@/components/ui/select";

const statusOptions = ["Active", "Suspended", "Pending", "Inactive"];

export default function ScoutDetailsPage() {
  const { scoutId } = useParams();
  const [scout, setScout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchScout() {
      setLoading(true);
      try {
        const res = await apiRequest(`/admin/scout/${scoutId}`, { method: "GET" });
        setScout(res?.data?.scout);
      } catch (error) {
        setScout(null);
      } finally {
        setLoading(false);
      }
    }
    if (scoutId) fetchScout();
  }, [scoutId]);

  function StatusChanger({ initialStatus, scoutId }: { initialStatus: string, scoutId: string }) {
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const [statusLoading, setStatusLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChangeStatus = async () => {
      setStatusLoading(true);
      setSuccess("");
      setError("");
      try {
        await apiRequest("/admin/scouts-change-status", {
          method: "POST",
          body: JSON.stringify({
            user: scoutId,
            status: selectedStatus,
          }),
          headers: { "Content-Type": "application/json" },
        });
        setSuccess("Status updated successfully!");
      } catch (err) {
        setError("Failed to update status.");
      } finally {
        setStatusLoading(false);
      }
    };

    return (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Change Account Status</h3>
        <div className="flex items-center gap-2 mt-2">
          <Select
            defaultValue={initialStatus}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            disabled={statusLoading}
          >
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </Select>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium disabled:opacity-50"
            onClick={handleChangeStatus}
            disabled={statusLoading}
          >
            {statusLoading ? "Updating..." : "Change status"}
          </button>
        </div>
        {success && <div className="text-green-600 text-xs mt-1">{success}</div>}
        {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
      </div>
    );
  }

  const data = scout;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="absolute top-4 left-4">
        <Button variant="outline" className="mb-4" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </div>

      { loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) }

      {!loading && scout && (  
        <div className="bg-white p-8 w-full">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border">
              <Image src={data.profileImg || "/logo.png"} alt={data.name || "Scout"} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h2>
              <p className="text-gray-600">{data.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">{data.accountStatus}</span>
            </div>
          </div>
          <StatusChanger initialStatus={data.accountStatus} scoutId={data._id} />
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Title</h3>
            <p className="text-gray-700 capitalize">{data.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">About</h3>
            <p className="text-gray-700 capitalize">{data.about}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Location</h3>
            <p className="text-gray-700 capitalize">{data.location?.city}, {data.location?.country}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Sports</h3>
            <p className="text-gray-700 capitalize">{data.sports?.join(", ")}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Looking For</h3>
            <p className="text-gray-700 capitalize">{data.lookFor?.join(", ")}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Position</h3>
            <p className="text-gray-700 capitalize">{data.position}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Account Type</h3>
            <p className="text-gray-700 capitalize">{data.accountType}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <ul className="text-gray-700 text-sm list-disc ml-5">
              <li>Push: {data.pushNotification ? 'Enabled' : 'Disabled'}</li>
              <li>Email: {data.emailNotification ? 'Enabled' : 'Disabled'}</li>
              <li>Sound/Vibration: {data.soundVibration ? 'Enabled' : 'Disabled'}</li> 
            </ul>
          </div>
          <div className="text-xs text-gray-400 mt-6">Joined: {new Date(data.createdAt).toLocaleString()}</div>
        </div>
      ) }
      { !scout && (
        <div className="flex justify-center items-center h-screen">Failed to load scout details.</div>
      ) }
    </div>
  );
} 