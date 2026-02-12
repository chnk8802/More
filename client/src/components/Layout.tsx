import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  Users,
  Users2,
  UserCog,
  Package,
  DollarSign,
  TrendingDown,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Job Jobs", path: "/jobs", icon: <Wrench size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    {
      name: "Team Management",
      path: "/technicians",
      icon: <Users2 size={20} />,
    },
    { name: "User Management", path: "/users", icon: <UserCog size={20} /> },
    { name: "Inventory & Shops", path: "/shops", icon: <Package size={20} /> },
    { name: "Payments", path: "/payments", icon: <DollarSign size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <TrendingDown size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`
        hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0
        bg-white border-r border-gray-200 transition-all duration-300
        ${sidebarOpen ? "lg:translate-x-0" : "lg:-translate-x-64"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MR</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">MRM</h1>
          </div>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
            variant="ghost"
            size="icon"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-gray-400">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md mb-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-700 text-white">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full"
            variant="destructive"
            size="sm"
          >
            <LogOut size={16} className="mr-2" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"}
      `}
      >
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm z-30">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="lg:hidden text-gray-500"
                  variant="ghost"
                  size="icon"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MR</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">MRM</h1>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span className="text-gray-400">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                  <Separator className="mb-4" />
                  <Button
                    onClick={handleLogout}
                    className="w-full"
                    variant="destructive"
                    size="sm"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>{" "}
            <Button
              className="hidden lg:block text-gray-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="icon"
            >
              <Menu size={20} />
            </Button>
            <div className="relative hidden md:block flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button className="relative" variant="ghost" size="icon">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-700 text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-full mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {navItems.find((i) => i.path === location.pathname)?.name ||
                      "Overview"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {user?.organization?.name} &bull;{" "}
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="px-4 py-2 rounded-lg border border-gray-200 bg-white flex items-center gap-2">
                    <span className="text-green-500 font-bold">●</span>
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Live Engine
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 min-h-[calc(100vh-200px)]">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
