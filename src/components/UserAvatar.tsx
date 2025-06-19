import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  LogOut,
  Shield,
  Building2,
  UserCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const UserAvatar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "pctsv":
        return <Building2 className="h-4 w-4" />;
      case "security":
        return <UserCheck className="h-4 w-4" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4" />;
      case "student":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "student":
        return "Sinh viên";
      case "teacher":
        return "Giảng viên";
      case "admin":
        return "Quản trị viên";
      case "pctsv":
        return "Phòng CTSV";
      case "security":
        return "Bảo vệ";
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800";
      case "teacher":
        return "bg-green-100 text-green-800";
      case "admin":
        return "bg-red-100 text-red-800";
      case "pctsv":
        return "bg-purple-100 text-purple-800";
      case "security":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDashboardLink = () => {
    switch (user.role) {
      case "admin":
        return "/admin";
      case "pctsv":
        return "/pctsv";
      case "security":
        return "/security";
      default:
        return "/dashboard";
    }
  };

  const shouldShowDashboard = () => {
    return ["admin", "pctsv", "security"].includes(user.role);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            />
            <AvatarFallback className="bg-cmc-600 text-white text-sm font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-900 leading-none">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getRoleName(user.role)}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={5}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                />
                <AvatarFallback className="bg-cmc-600 text-white text-xs font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${getRoleBadgeColor(user.role)} text-xs`}>
                <span className="flex items-center space-x-1">
                  {getRoleIcon(user.role)}
                  <span>{getRoleName(user.role)}</span>
                </span>
              </Badge>
              {user.studentId && (
                <Badge variant="outline" className="text-xs">
                  {user.studentId}
                </Badge>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {shouldShowDashboard() && (
          <DropdownMenuItem asChild>
            <Link to={getDashboardLink()} className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Thông tin tài khoản</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="flex items-center text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
