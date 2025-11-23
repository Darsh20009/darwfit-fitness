import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Zap, Apple, Dumbbell, BookOpen, TrendingUp, User, Brain, LogOut } from "lucide-react";

const menuItems = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: Zap, label: "حاسبة السعرات", href: "/calories" },
  { icon: Apple, label: "خطة التغذية", href: "/nutrition-plan" },
  { icon: Dumbbell, label: "برامج التمارين", href: "/exercise-plan" },
  { icon: BookOpen, label: "أذكار", href: "/azkar" },
  { icon: TrendingUp, label: "مسار التقدم", href: "/progress" },
  { icon: User, label: "الملف الشخصي", href: "/profile" },
  { icon: Brain, label: "مدربك الذكي", href: "/ai-coach" },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center py-6">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black">D</span>
              </div>
              <span className="font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Darwfit
              </span>
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>المنصة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/login">
                  <LogOut />
                  <span>تسجيل الخروج</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
