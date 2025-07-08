'use client'
import AdminUsersSection from "@/components/dashboard-sections/SettingsSection";
// import SettingsSection from "@/components/dashboard-sections/SettingsSection";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* <SettingsSection /> */}
      <AdminUsersSection />
    </div>
  );
} 