'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Menu, MapPin, Home, ShoppingCart, Users, BookOpen, Compass, Mic, Send } from 'lucide-react'
import { UserProfileEdit } from '@/components/UserProfileEdit'
import Link from "next/link"
import Image from "next/image"

export default function AiAssistant() {
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [userProfile, setUserProfile] = useState({
    nickname: '瑞雪',
    avatarUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-QD80D9i3vTRnsXEovEKDy3APBXCHJK.png',
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      setUserProfile({
        nickname: parsedProfile.nickname,
        avatarUrl: parsedProfile.avatarUrl,
      })
    }
  }, [])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Handle message sending
      setInputMessage('')
    }
  }

  const handleCloseProfileEdit = () => {
    setShowProfileEdit(false)
    // Refresh user profile data
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      setUserProfile({
        nickname: parsedProfile.nickname,
        avatarUrl: parsedProfile.avatarUrl,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b max-w-[375px] mx-auto">
        <div className="flex items-center justify-between px-4 h-14">
          <Menu className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors duration-200" />
          <button 
            onClick={() => setShowProfileEdit(true)}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <Avatar className="w-full h-full">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.nickname} />
              <AvatarFallback>{userProfile.nickname[0]}</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </header>

      {showProfileEdit && <UserProfileEdit onClose={handleCloseProfileEdit} />}

      {/* Main Content - Scrollable */}
      <main className="flex-1 pt-14 pb-20 overflow-y-auto">
        <div className="px-4">
          {/* Welcome Message */}
          <div className="text-center py-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2">您好，{userProfile.nickname}</h1>
            <p className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">我是私人旅游助手"贵贵"，一起探索贵州的魅力吧！</p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3">
            {featureCards.map((card, index) => (
              <Link href={card.link || "#"} key={index}>
                <Card className="p-3 hover:shadow-md transition-all duration-300 cursor-pointer h-full group">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">{card.title}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8F8F8] max-w-[375px] mx-auto">
        <div className="px-4 py-3">
          <div className="relative flex items-center bg-white rounded-full shadow-sm">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="在这里输入问题"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-200 focus:ring-0 focus:border-gray-200"
            />
            <button className="absolute left-4 p-2 -ml-2">
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <Button 
              onClick={handleSendMessage}
              className="absolute right-4 p-2 -mr-2 hover:bg-transparent"
              variant="ghost"
            >
              <Send className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const featureCards = [
  { 
    title: "旅游规划", 
    description: "请按目的地、主题、游玩时间、交通方式、预算来对话", 
    icon: <MapPin className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />, 
    bgColor: "bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300",
    link: "/travel-planning"
  },
  { 
    title: "旅居安排", 
    description: "请按居住目的地、主题、时间、预算来对话", 
    icon: <Home className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors duration-300" />, 
    bgColor: "bg-red-100 group-hover:bg-red-200 transition-colors duration-300",
    link: "/stay-arrangement"
  },
  { 
    title: "智能订购", 
    description: "找酒店、找门票、比价格、快下单", 
    icon: <ShoppingCart className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />, 
    bgColor: "bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300",
    link: "/smart-booking"
  },
  { 
    title: "本地活动", 
    description: "探索本地隐藏活动", 
    icon: <Users className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300" />, 
    bgColor: "bg-yellow-100 group-hover:bg-yellow-200 transition-colors duration-300",
    link: "/local-tours"  
  },
  {
    title: "旅行记录",
    description: "给我一张你的旅游图片，快速生成旅游日志",
    icon: <BookOpen className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />,
    bgColor: "bg-green-100 group-hover:bg-green-200 transition-colors duration-300",
    link: "/travel-logs"
  },
  {
    title: "智能导览",
    description: "在线智能导游，快速了解景区",
    icon: <Compass className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />,
    bgColor: "bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300",
    link: "/self-guided-tour"
  },
]

