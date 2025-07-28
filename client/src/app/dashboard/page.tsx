'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';

export default function DashboardPage() {
  const router = useRouter();
  const { user, session } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (!session?.loggedIn) {
      router.push('/auth/login');
      return;
    }

    // Route based on user role
    const userRole = getUserRole(); // You'll need to implement this
    
    switch (userRole) {
      case 'super-admin':
        router.push('/dashboard/super-admin');
        break;
      case 'institute':
        router.push('/dashboard/institute');
        break;
      case 'teacher':
        router.push('/dashboard/teacher');
        break;
      case 'student':
        router.push('/dashboard/student');
        break;
      default:
        router.push('/auth/login');
    }
  }, [session, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}

// Helper function to determine user role
function getUserRole() {

  // if (user.role === 'super-admin') return 'super-admin';
  // if (user.instituteId) return 'institute';
  // if (user.teacherId) return 'teacher';
  // if (user.studentId) return 'student';
  return 'institute'; // Default role for now, adjust as needed
}