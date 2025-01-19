'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, User } from 'lucide-react'
import Image from 'next/image'
import { UserProfile } from './UserProfile'

export function BottomNavigation({ currentPage }: { currentPage: string }) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <Link 
            href={`/${currentPage}`} 
            className="flex flex-col items-center min-w-[64px]"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">首页</span>
          </Link>
          
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 -top-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition-transform hover:scale-105">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe6932720fda997c3b514dd58df8362.jpg-2qwI8qmiqjugdlHJenUS9UU4ilVGNb.jpeg"
                alt="贵贵 Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex flex-col items-center min-w-[64px]"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </div>
      
      {showProfile && <UserProfile />}
    </>
  )
}

