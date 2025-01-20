"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mic, Send, ImageIcon, Video, Menu, PlusCircle, History, User, ChevronDown, ChevronUp } from "lucide-react"
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

export default function TravelLogs() {
  const [inputMessage, setInputMessage] = useState("")
  const [showUploadSection, setShowUploadSection] = useState(false)
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "贵州三日游规划" },
    { id: "2", title: "黄果树瀑布一日游" },
  ])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("")
    }
  }

  const contentTypes = [
    {
      type: "文生文",
      placeholder: "想分享小七孔游玩旅程，帮我生成文案",
    },
    {
      type: "图生文",
      placeholder: "这是我的游玩照片，帮我生成朋友圈文案",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-[414px] mx-auto bg-transparent min-h-screen pb-20">
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe6932720fda997c3b514dd58df8362.jpg-2qwI8qmiqjugdlHJenUS9UU4ilVGNb.jpeg"
              alt="贵贵助手"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold mb-1">欢迎使用旅行记录助手</h2>
        </div>

        {/* Content Types */}
        <Card className="mx-4 p-4">
          <div className="space-y-3">
            {contentTypes.map((content, index) => (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium text-sm min-w-[2.5rem]">{content.type}</div>
                <div className="text-xs text-gray-500">{content.placeholder}</div>
              </div>
            ))}
            <div>
              <Button
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setShowUploadSection(!showUploadSection)}
              >
                <span>上传游玩图片</span>
                {showUploadSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>

              {showUploadSection && (
                <div className="mt-4">
                  <Input type="file" accept="image/*" className="w-full" />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Chat Interface */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#F8F8F8] border-t">
          <div className="max-w-[414px] mx-auto px-4 py-3">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <User className="w-5 h-5 text-gray-500" />
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
    </div>
  )
}

