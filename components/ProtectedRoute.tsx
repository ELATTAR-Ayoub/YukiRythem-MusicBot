
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// route
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user.ID == null) {
      router.push('/signin')
    }
  }, [router, user])

  return <>{user ? null : children}</>
}

export default ProtectedRoute