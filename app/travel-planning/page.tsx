"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Mic, Send, Menu, PlusCircle, History, User, Compass } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { TravelCategories } from "@/components/TravelCategories"

export default function TravelPlanning() {
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [showCategories, setShowCategories] = useState(false)
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "贵州三日游规划" },
    { id: "2", title: "黄果树瀑布一日游" },
  ])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { role: "user", content: inputMessage }])
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { role: "assistant", content: `You said: ${inputMessage}` }])
      }, 1000)
      setInputMessage("")
    }
  }

  const initialQuestions = [
    "想去贵州玩，帮我规划一下行程？",
    "想去一次贵州，预算5000元，能怎么玩？",
    "想春节去贵州玩，建议行程安排几天比较合适？",
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
          <h1 className="text-lg font-bold mb-1">欢迎使用旅游规划</h1>
          {/* <p className="text-xs text-gray-600">让我们一起规划您的完美旅程！</p> */}
        </div>

        {/* Travel Preferences */}
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="destination" className="text-xs">
                  目的地
                </Label>
                <Input id="destination" placeholder="输入目的地" className="w-full" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="theme" className="text-xs">
                  游玩主题
                </Label>
                <Select>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nature">自然观光</SelectItem>
                    <SelectItem value="culture">人文历史</SelectItem>
                    <SelectItem value="food">美食体验</SelectItem>
                    <SelectItem value="adventure">户外冒险</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="duration" className="text-xs">
                  游玩时间
                </Label>
                <Select>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="选择时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3天</SelectItem>
                    <SelectItem value="4-7">4-7天</SelectItem>
                    <SelectItem value="7+">7天以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="transport" className="text-xs">
                  交通方式
                </Label>
                <Select>
                  <SelectTrigger id="transport">
                    <SelectValue placeholder="选择交通方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">自驾</SelectItem>
                    <SelectItem value="public">公共交通</SelectItem>
                    <SelectItem value="tour">跟团</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="budget" className="text-xs">
                预算 (元)/人
              </Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="0" defaultValue={0} min={0} id="budget-min" className="w-1/2" />
                <span className="text-xs">至</span>
                <Input type="number" placeholder="2000" defaultValue={2000} min={0} id="budget-max" className="w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Initial Questions */}
        <Card className="mb-3 bg-white border border-gray-200">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {initialQuestions.map((q, index) => (
                <li key={index} className="text-sm text-black cursor-pointer hover:bg-gray-50 transition-all py-2">
                  {q}
                </li>
              ))}
            </ul>
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
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-200 focus:ring-0 focus:border-gray-200 bg-blue-50"
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

