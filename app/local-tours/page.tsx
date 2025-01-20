"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Send, Menu, PlusCircle, History, User, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LocalTours() {
  const [inputMessage, setInputMessage] = useState("")
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "贵州三日游规划" },
    { id: "2", title: "黄果树瀑布一日游" },
  ])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("")
    }
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-gradient-to-b from-blue-50 to-white">
      {/* Assistant Profile */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-qlVJBivoBTTaFxbewv3rEw3Qj874Di.png"
            alt="Assistant Avatar"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-base font-medium mb-6">本地活动小助手</h2>

        {/* Quick Questions Card */}
        <Card className="w-full max-w-sm mb-6 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            <Button className="w-full justify-start px-4 py-4 bg-blue-100 bg-opacity-50 hover:bg-blue-200 text-black rounded-none h-auto">
              <span className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></span>
              给我推荐一下附近的活动？
            </Button>
            <Button className="w-full justify-start px-4 py-4 bg-pink-100 bg-opacity-50 hover:bg-pink-200 text-black rounded-none h-auto">
              <span className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></span>
              喜欢溯溪，帮我推荐一些相关的活动
            </Button>
            <Button className="w-full justify-start px-4 py-4 bg-green-100 bg-opacity-50 hover:bg-green-200 text-black rounded-none h-auto">
              <span className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></span>
              这周末去贵阳玩，可以参加那些活动？
            </Button>
          </div>
        </Card>

        {/* Activity Plaza Link */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <Link href="/activity-plaza" className="text-blue-500 text-sm">
            活动广场
          </Link>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-blue-50 w-full max-w-[414px]">
        <div className="px-4 py-3">
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
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-qlVJBivoBTTaFxbewv3rEw3Qj874Di.png"
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
            <div className="relative flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="在这里输入问题"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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

