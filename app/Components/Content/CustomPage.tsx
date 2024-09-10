// app/components/SettingsPage.tsx
"use client";
import { useUser } from "@clerk/nextjs";

export default function SettingsPage() {
  const { user } = useUser();
  return (
    <div>
      <h1>Settings</h1>
      {user ? (
        <p>Settings for {user.firstName}</p>
      ) : (
        <p>Please sign in to see settings.</p>
      )}
    </div>
  );
}
