'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Mic, Send, Menu, PlusCircle, History, User, Compass, X } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BottomNavigation } from '@/components/BottomNavigation'
import Image from 'next/image'
import Link from 'next/link'
import { TravelCategories } from '@/components/TravelCategories'

export default function TravelPlanning() {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)
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
      type: "destination"
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-green-600 font-bold text-xs">预算</span>
      </div>,
      question: "想去一次贵州，预算5000元，能怎么玩？",
      type: "budget"
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-purple-600 font-bold text-xs">主题</span>
      </div>,
      question: "除了看山看水，贵州还有什么特色文化体验吗？",
      type: "theme"
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-orange-600 font-bold text-xs">交通</span>
      </div>,
      question: "周末计划从贵阳到黔南玩，可以怎么去？",
      type: "transport"
    },
    {
      icon: <div className="w-12 h-6 flex items-center justify-center" style={{ fontFamily: 'STKaiti, STSong, SimSun, serif' }}>
        <span className="text-red-600 font-bold text-xs">时间</span>
      </div>,
      question: "想春节去贵州玩，建议行程安排几天比较合适？",
      type: "duration"
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

        {/* Initial Questions */}
        <Card className="mb-3 bg-white border border-gray-200">
          <div className="p-2 space-y-0 divide-y divide-gray-200">
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
          </div>
          <div className="p-2 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500"
              onClick={() => setShowCategories(true)}
            >
              <Compass className="w-4 h-4 mr-2" />
              更多贵州旅游指南
            </Button>
          </div>
        </Card>
        
        {/* Travel Preferences */}
        <Card className={`mb-4 ${isExpanded ? 'p-3' : 'p-2'} transition-all duration-300`}>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">旅行偏好</h2>
            <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" size="icon">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <Label htmlFor="destination" className="text-xs mb-1">
                  目的地
                </Label>
                <Select>
                  <SelectTrigger id="destination" className="text-xs">
                    <SelectValue placeholder="选择目的地" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guizhou" className="text-xs">贵州省</SelectItem>
                    <SelectItem value="guiyang" className="text-xs">贵阳市</SelectItem>
                    <SelectItem value="zunyi" className="text-xs">遵义市</SelectItem>
                    <SelectItem value="anshun" className="text-xs">安顺市</SelectItem>
                    <SelectItem value="qianxinan" className="text-xs">黔西南州</SelectItem>
                    <SelectItem value="qiandongnan" className="text-xs">黔东南州</SelectItem>
                    <SelectItem value="qiannan" className="text-xs">黔南州</SelectItem>
                    <SelectItem value="bijie" className="text-xs">毕节市</SelectItem>
                    <SelectItem value="tongren" className="text-xs">铜仁市</SelectItem>
                    <SelectItem value="liupanshui" className="text-xs">六盘水市</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="folklore" className="text-xs">民俗风情</SelectItem>
                    <SelectItem value="leisure" className="text-xs">休闲体验</SelectItem>
                    <SelectItem value="outdoor" className="text-xs">户外运动</SelectItem>
                    <SelectItem value="citytech" className="text-xs">城市科技</SelectItem>
                    <SelectItem value="entertainment" className="text-xs">文娱活动</SelectItem>
                    <SelectItem value="study" className="text-xs">研学出行</SelectItem>
                    <SelectItem value="wine" className="text-xs">酒文化体验</SelectItem>
                    <SelectItem value="food" className="text-xs">美食体验</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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
              
              <div className="md:col-span-2">
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

              <div className="md:col-span-2 mt-4">
                <Button className="w-full">
                  生成行程规划
                </Button>
              </div>
            </div>
          )}
        </Card>
        {showCategories && (
          <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-lg" style={{ maxHeight: '50%' }}>
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="sm" onClick={() => setShowCategories(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(50% - 40px)' }}>
              <TravelCategories />
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8F8F8] w-full mx-auto">
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

