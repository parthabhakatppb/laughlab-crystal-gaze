
import { MainLayout } from "../components/layouts/MainLayout";
import { UserProfile } from "../components/profile/UserProfile";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="py-8">
        <UserProfile />
      </div>
    </MainLayout>
  );
}
