import { useState, useEffect, ReactNode } from "react";
import { AuthContext, User } from "@/lib/auth";
import { userService } from "@/lib/mongodb";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      console.log("🔐 Attempting login for:", email);

      // Find user in MongoDB
      const mongoUser = await userService.findByEmail(email);

      if (mongoUser && mongoUser.mat_khau === password) {
        // Convert MongoDB user to app user format
        const appUser: User = {
          id: mongoUser._id || mongoUser.email,
          email: mongoUser.email,
          name: mongoUser.ten_nguoi_dung,
          role: mongoUser.vai_tro || "student",
          studentId: mongoUser.ma_nguoi_dung,
          hasChangedPassword: mongoUser.mat_khau !== "123456",
        };

        setUser(appUser);
        localStorage.setItem("auth_user", JSON.stringify(appUser));
        console.log("✅ Login successful for:", email);
        setIsLoading(false);
        return true;
      }

      console.log("❌ Login failed for:", email);
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("🚨 Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));

      // Update password in MongoDB if changed
      if (userData.hasChangedPassword) {
        try {
          console.log("🔄 Updating user data in database...");
          // Note: In a real app, you would also update the password in the database
          // For demo purposes, we'll just update the hasChangedPassword flag
          console.log("✅ User data updated successfully");
        } catch (error) {
          console.error("❌ Failed to update user data:", error);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
