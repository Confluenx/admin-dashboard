"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";

const statusOptions = ["Active", "Suspended", "Pending", "Inactive"];

export default function ScoutDetailsPage() {
  const { scoutId } = useParams();
  const [scout, setScout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScout() {
      setLoading(true);
      try {
        const res = await apiRequest(`/admin/scout/${scoutId}`, { method: "GET" });
        setScout(res?.data);
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
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            disabled={statusLoading}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!scout) {
    return <div className="flex justify-center items-center h-screen">Failed to load scout details.</div>;
  }

  const data = scout;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border">
            <Image src={data.profileImg} alt={data.name} fill className="object-cover" />
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
          <p className="text-gray-700">{data.title}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">About</h3>
          <p className="text-gray-700">{data.about}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Location</h3>
          <p className="text-gray-700">{data.location?.city}, {data.location?.country}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Sports</h3>
          <p className="text-gray-700">{data.sports?.join(", ")}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Looking For</h3>
          <p className="text-gray-700">{data.lookFor?.join(", ")}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Position</h3>
          <p className="text-gray-700">{data.position}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Account Type</h3>
          <p className="text-gray-700">{data.accountType}</p>
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
    </div>
  );
} 