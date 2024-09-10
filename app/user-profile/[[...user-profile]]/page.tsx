"use client";

import { UserProfile } from "@clerk/nextjs";
import SettingsPage from "../../Components/Content/CustomPage";
import NavigationBar from "@/app/Components/UI/NavigationBar";
const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const UserProfilePage = () => (
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Page label="account" />
    <UserProfile.Page label="security" />
    <UserProfile.Page
      label="Custom Page"
      url="/custom-page"
      labelIcon={<DotIcon />}
    >
      <SettingsPage />
    </UserProfile.Page>
  </UserProfile>
);

export default UserProfilePage;
