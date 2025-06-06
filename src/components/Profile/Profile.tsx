import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { user, profileUpdate, profilePicLoader } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large");
      return;
    }

    try {
      const base64Image = await fileToBase64(file);
      await profileUpdate(base64Image);
    } catch (err) {
      console.error("Error updating profile picture", err);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[28rem] mx-auto p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        <div
          className="relative w-32 h-32 mx-auto cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Avatar className="w-full h-full">
            {profilePicLoader ? (
              <AvatarImage src="/loading.gif" alt="Uploading..." />
            ) : user?.profilePic ? (
              <AvatarImage src={user.profilePic} alt="Profile Picture" />
            ) : null}
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
            <Pencil className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="text-center mt-4">
          <Label className="text-lg font-medium">{user?.username}</Label>
        </div>
        <div className="text-center mt-1">
          <Label className="text-sm text-gray-600">{user?.email}</Label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
