'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Mic, Send, Menu, PlusCircle, History, User, Compass } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from 'next/link'
import { TravelCategories } from '@/components/TravelCategories'

export default function TravelPlanning() {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: '1', title: '贵州三日游规划' },
    { id: '2', title: '黄果树瀑布一日游' },
  ])
  const [showCategories, setShowCategories] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: inputMessage }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `You said: ${inputMessage}` }])
      }, 1000)
      setInputMessage('')
    }
  }

  const initialQuestions = [
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-blue-600 font-bold text-xs">目的地</span>
      </div>,
      question: "想去贵州玩，帮我规划一下行程？",
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-green-600 font-bold text-xs">预算</span>
      </div>,
      question: "想去一次贵州，预算5000元，能怎么玩？",
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-red-600 font-bold text-xs">时间</span>
      </div>,
      question: "想春节去贵州玩，建议行程安排几天比较合适？",
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      {/* Main Content */}
      <div className="flex-1 p-4 pb-24 max-w-[375px] mx-auto w-full">
        {/* Logo and Welcome Message */}
        <div className="text-center mb-4">
          <div className="w-20 h-20 mx-auto mb-2 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe6932720fda997c3b514dd58df8362.jpg-2qwI8qmiqjugdlHJenUS9UU4ilVGNb.jpeg"
              alt="贵贵 Logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-lg font-bold mb-1">欢迎使用旅游规划助手</h1>
          <p className="text-xs text-gray-600">让我们一起规划您的完美旅程！</p>
        </div>

        {/* Travel Preferences */}
        <Card className="mb-4 p-3 transition-all duration-300">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="destination" className="text-xs mb-1">
                  目的地
                </Label>
                <Input id="destination" placeholder="输入目的地" className="text-xs" />
              </div>
              
              <div>
                <Label htmlFor="theme" className="text-xs mb-1">
                  游玩主题
                </Label>
                <Select>
                  <SelectTrigger id="theme" className="text-xs">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nature" className="text-xs">自然观光</SelectItem>
                    <SelectItem value="culture" className="text-xs">人文历史</SelectItem>
                    <SelectItem value="leisure" className="text-xs">休闲体验</SelectItem>
                    <SelectItem value="adventure" className="text-xs">探险刺激</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-xs mb-1">
                  游玩时间
                </Label>
                <Select>
                  <SelectTrigger id="duration" className="text-xs">
                    <SelectValue placeholder="选择时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3" className="text-xs">1-3天</SelectItem>
                    <SelectItem value="4-7" className="text-xs">4-7天</SelectItem>
                    <SelectItem value="7+" className="text-xs">7天以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="transport" className="text-xs mb-1">
                  交通方式
                </Label>
                <Select>
                  <SelectTrigger id="transport" className="text-xs">
                    <SelectValue placeholder="选择交通方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car" className="text-xs">自驾</SelectItem>
                    <SelectItem value="public" className="text-xs">公共交通</SelectItem>
                    <SelectItem value="tour" className="text-xs">跟团</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="budget" className="text-xs mb-1">
                预算 (元)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="0"
                  defaultValue={0}
                  min={0}
                  className="text-xs"
                />
                <span className="text-xs">至</span>
                <Input
                  type="number"
                  placeholder="2000"
                  defaultValue={2000}
                  min={0}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Initial Questions */}
        <Card className="mb-3 bg-white border border-gray-200">
          <CardContent className="p-2 space-y-0 divide-y divide-gray-200">
            {initialQuestions.map((q, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 py-2 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="flex-shrink-0">
                  {q.icon}
                </div>
                <span className="text-xs text-gray-700">{q.question}</span>
              </div>
            ))}
          </CardContent>
          <div className="p-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500 w-full flex justify-between items-center"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span className="flex items-center">
                <Compass className="w-4 h-4 mr-2" />
                更多贵州旅游指南
              </span>
              {showCategories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            {showCategories && (
              <div className="mt-2">
                <TravelCategories />
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-[#F8F8F8] w-full max-w-[414px] mx-auto">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <Menu className="w-5 h-5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <Link href="/" className="w-full">
                    <DropdownMenuLabel className="flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe6932720fda997c3b514dd58df8362.jpg-2qwI8qmiqjugdlHJenUS9UU4ilVGNb.jpeg"
                        alt="贵贵 Logo"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm">贵贵助手</span>
                    </DropdownMenuLabel>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>我的</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>新建对话</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>历史对话</DropdownMenuLabel>
                  {conversations.map((conv) => (
                    <DropdownMenuItem key={conv.id} className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      <span className="truncate">{conv.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="在这里输入问题"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-200 focus:ring-0 focus:border-gray-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mic className="w-5 h-5 text-gray-400" />
              </div>
              <Button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-transparent"
                variant="ghost"
              >
                <Send className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

