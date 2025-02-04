'use client'

import { useClerk } from "@clerk/nextjs";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  BarChart2,
  HelpCircle,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserProducts } from "@/actions/user";
import { motion } from 'framer-motion';
import Image from "next/image";

// Nav items with updated href for all items except Dashboard
const navItems = [
  { icon: LayoutDashboard, label: 'Console', href: '/console' },
  { icon: Package, label: 'Services', href: '/console/services' },
  { icon: BarChart2, label: 'Analytics', href: '/console/analytics' },
  { icon: HelpCircle, label: 'Support', href: '/console/support' },
  { icon: User, label: 'Profile', href: '/console/profile' },
];

export function Sidebar() {
  const { signOut, user } = useClerk(); // Use Clerk to get current user's clerkId
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const pathname = usePathname();

  // Fetch products for the user when the component mounts
  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const userProducts = await getUserProducts(user.id); // Use the user's clerkId
          setProducts(userProducts); // Set the products in state
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchProducts(); // Call the function to fetch the products
    }
  }, [user]); // Only run effect when user data is available

  // Skeleton Loader for Sidebar Items
  const SkeletonSidebarItem = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 p-2 rounded-lg"
    >
      <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
      {!collapsed && <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />}
    </motion.div>
  );

  // Skeleton Loader for Products
  const SkeletonProductItem = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 p-2 rounded-lg"
    >
      {!collapsed && <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />}
    </motion.div>
  );

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-gray-100 text-black transition-all duration-300 border-r',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-gray-700">
        {!collapsed && <Image
                    src="/images/logo.png" // Replace with your actual logo path
                    alt="Dunefox Logo"
                    width={110} // Adjust size as needed
                    height={100}
                    className="" // Optional: Add rounded corners or other styles
                  />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-black hover:bg-[#EB6C33] hover:text-white"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {loading ? (
            // Render skeleton items while loading
            Array.from({ length: navItems.length }).map((_, index) => (
              <li key={index}>
                <SkeletonSidebarItem />
              </li>
            ))
          ) : (
            // Render actual nav items once loaded
            navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                (item.href === '/console' && pathname === '/console') ||
                pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 p-2 rounded-lg transition-colors',
                      'hover:bg-[#EB6C33] hover:text-white',
                      isActive ? 'bg-[#EB6C33] text-white' : 'text-black-300'
                    )}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })
          )}

          {/* Horizontal Line Below Profile */}
          {!collapsed && <hr className="border-gray-300 my-4" />}

          {/* Label for Services Section */}
          {!collapsed && <h3 className="text-lg font-semibold text-gray-800">Services</h3>}

          {/* Render skeleton products while loading */}
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <SkeletonProductItem />
              </li>
            ))
          ) : (
            // Render actual products once loaded
            products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/console/dashboard/${product.name.toLowerCase()}`} // Link to the product-specific page
                  className={cn(
                    'flex items-center space-x-2 p-2 rounded-lg transition-colors',
                    'hover:bg-[#EB6C33] hover:text-white',
                    pathname === `/console/services/${product.name}` ? 'bg-[#EB6C33] text-white' : 'text-black-300'
                  )}
                >
                  {!collapsed && <span>{product.name}</span>} {/* Display product name */}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>

      {/* Sign Out Button */}
      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="flex justify-start items-center space-x-2 w-full p-2 rounded-lg text-black-300 hover:bg-[#EB6C33] hover:text-white"
          onClick={() => signOut()}
        >
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}