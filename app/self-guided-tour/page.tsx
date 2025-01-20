"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Landmark,
  PartyPopper,
  Music,
  EyeOff,
  Menu,
  Mic,
  Send,
  PlusCircle,
  History,
  User,
  TableIcon as Toilet,
  Utensils,
  Info,
  Car,
} from "lucide-react"
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

interface MapMarker {
  id: string
  type: "landmark" | "toilet" | "service" | "restaurant" | "transport"
  position: { x: number; y: number }
  title: string
}

export default function SelfGuidedTour() {
  const [inputMessage, setInputMessage] = useState("")
  const [showPointsPanel, setShowPointsPanel] = useState(false)
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "黄果树瀑布导览" },
    { id: "2", title: "西江千户苗寨导览" },
  ])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("")
    }
  }

  const mapMarkers: MapMarker[] = [
    { id: "1", type: "landmark", position: { x: 30, y: 20 }, title: "观景台" },
    { id: "2", type: "landmark", position: { x: 45, y: 35 }, title: "瀑布" },
    { id: "3", type: "toilet", position: { x: 25, y: 40 }, title: "公共厕所" },
    { id: "4", type: "service", position: { x: 60, y: 30 }, title: "游客中心" },
    { id: "5", type: "restaurant", position: { x: 40, y: 60 }, title: "餐厅" },
    { id: "6", type: "transport", position: { x: 70, y: 50 }, title: "观光车站" },
    { id: "7", type: "landmark", position: { x: 55, y: 70 }, title: "文化展览" },
    { id: "8", type: "toilet", position: { x: 75, y: 65 }, title: "公共厕所" },
    { id: "9", type: "service", position: { x: 35, y: 75 }, title: "急救站" },
    { id: "10", type: "restaurant", position: { x: 50, y: 45 }, title: "小吃街" },
  ]

  const getMarkerIcon = (type: MapMarker["type"]) => {
    switch (type) {
      case "landmark":
        return <Landmark className="w-4 h-4 text-blue-500" />
      case "toilet":
        return <Toilet className="w-4 h-4 text-green-500" />
      case "service":
        return <Info className="w-4 h-4 text-purple-500" />
      case "restaurant":
        return <Utensils className="w-4 h-4 text-red-500" />
      case "transport":
        return <Car className="w-4 h-4 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 relative">
      <div className="max-w-[414px] mx-auto bg-white min-h-screen pb-20">
        {/* Main Map Area */}
        <div className="relative w-full h-[calc(100vh-80px)]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/28224c7382ad21ab032950e4a1e89a9.jpg-e7dPemHB70OoFSrwjNmQ2FnGZAUkqf.jpeg"
            alt="Scenic Area Map"
            fill
            className="object-cover"
          />

          {/* Map Markers */}
          {mapMarkers.map((marker) => (
            <div
              key={marker.id}
              className="absolute"
              style={{
                left: `${marker.position.x}%`,
                top: `${marker.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform cursor-pointer">
                {getMarkerIcon(marker.type)}
              </div>
            </div>
          ))}

          {/* Left Toolbar */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <Button
              variant="secondary"
              className="rounded-lg bg-white shadow-lg px-2 py-1.5 h-auto flex flex-col items-center gap-0.5 min-w-[48px]"
              onClick={() => setShowPointsPanel(!showPointsPanel)}
            >
              <Landmark className="h-4 w-4" />
              <span className="text-[10px]">景点</span>
            </Button>
            <Button
              variant="secondary"
              className="rounded-lg bg-white shadow-lg px-2 py-1.5 h-auto flex flex-col items-center gap-0.5 min-w-[48px]"
            >
              <PartyPopper className="h-4 w-4" />
              <span className="text-[10px]">活动</span>
            </Button>
            <Button
              variant="secondary"
              className="rounded-lg bg-white shadow-lg px-2 py-1.5 h-auto flex flex-col items-center gap-0.5 min-w-[48px]"
            >
              <Music className="h-4 w-4" />
              <span className="text-[10px]">音乐</span>
            </Button>
            <Button
              variant="secondary"
              className="rounded-lg bg-white shadow-lg px-2 py-1.5 h-auto flex flex-col items-center gap-0.5 min-w-[48px]"
            >
              <EyeOff className="h-4 w-4" />
              <span className="text-[10px]">隐藏</span>
            </Button>
          </div>

          {/* My Location Button */}
          <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 rounded-full bg-white shadow-lg">
            <MapPin className="h-5 w-5" />
            <span className="sr-only">我的位置</span>
          </Button>
        </div>

        {/* Character Image - Above Chat Interface */}
        <div className="absolute bottom-20 left-4 z-50">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-PRzooSYKfVZNusrOYmrdO7TjtrBC21.png"
            alt="Virtual Guide"
            width={140}
            height={140}
            className="select-none pointer-events-none"
          />
        </div>

        {/* Chat Interface */}
        <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t">
          <div className="max-w-[414px] mx-auto px-4 py-3">
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
    </div>
  )
}

