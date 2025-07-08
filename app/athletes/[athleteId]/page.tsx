'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AthleteDetailsPage() {
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAthlete() {
      setLoading(true);
      try {
        const res = await apiRequest(`/admin/athlete/${athleteId}`, { method: "GET" });
        setAthlete(res?.data?.athlete);
      } catch (error) {
        setAthlete(null);
      } finally {
        setLoading(false);
      }
    }
    if (athleteId) fetchAthlete();
  }, [athleteId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!athlete) {
    return <div className="flex justify-center items-center h-screen">Failed to load athlete details.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="absolute top-4 left-4">
        <Button variant="outline" className="mb-4" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="p-8 mt-16">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border">
            <Image
              src={athlete.profileImg || "/logo.png"}
              alt={athlete.name || "Athlete"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{athlete.name}</h2>
            <p className="text-gray-600">{athlete.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
              athlete.accountStatus === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
              {athlete.accountStatus}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">About</h3>
          <p className="text-gray-700 capitalize">{athlete.about || "—"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Location</h3>
          <p className="text-gray-700 capitalize">
            {athlete.location?.city || "—"}, {athlete.location?.country || "—"}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Skill</h3>
          <p className="text-gray-700 capitalize">{athlete.skill || "—"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Position</h3>
          <p className="text-gray-700 capitalize">{athlete.position || "—"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Account Type</h3>
          <p className="text-gray-700 capitalize">{athlete.accountType || "—"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Email Verified</h3>
          <p className="text-gray-700">{athlete.emailVerified ? "Yes" : "No"}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          <ul className="text-gray-700 text-sm list-disc ml-5">
            <li>Push: {athlete.pushNotification ? "Enabled" : "Disabled"}</li>
            <li>Email: {athlete.emailNotification ? "Enabled" : "Disabled"}</li>
            <li>Sound/Vibration: {athlete.soundVibration ? "Enabled" : "Disabled"}</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Statistics</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-2 border-1 border-gray-200 rounded-md p-4">
            <div className="border-1 border-gray-200 rounded-md">
              <span className="font-medium">Height:</span> {athlete.statistic?.height || "—"}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {athlete.statistic?.weight || "—"}
            </div>
            <div>
              <span className="font-medium">Body Fat:</span> {athlete.statistic?.bodyFat || "—"}
            </div>
            <div>
              <span className="font-medium">BMI:</span> {athlete.statistic?.BMI || "—"}
            </div>
            <div>
              <span className="font-medium">Max Height:</span> {athlete.statistic?.maxHeight || "—"}
            </div>
            <div>
              <span className="font-medium">VO2 Max:</span> {athlete.statistic?.v02Max || "—"}
            </div>
            <div>
              <span className="font-medium">Sprint Speed:</span> {athlete.statistic?.sprintSpeed || "—"}
            </div>
            <div>
              <span className="font-medium">Vertical Jump:</span> {athlete.statistic?.verticalJump || "—"}
            </div>
            <div>
              <span className="font-medium">Agility:</span> {athlete.statistic?.agility || "—"}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-6">
          Joined: {new Date(athlete.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}