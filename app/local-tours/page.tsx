"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Send, Menu, PlusCircle, History, User, Calendar, Star, ChevronRight, ArrowLeft } from "lucide-react"
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
import { cn } from "@/lib/utils"

export default function LocalTours() {
  const [inputMessage, setInputMessage] = useState("")
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "贵州三日游规划" },
    { id: "2", title: "黄果树瀑布一日游" },
  ])
  const [selectedFilters, setSelectedFilters] = useState({
    location: "贵州",
    category: "全部",
    distance: "不限",
    time: "15天内",
  })
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const outdoorRef = useRef<HTMLDivElement>(null)
  const cultureRef = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLDivElement>(null)
  const sportsRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("")
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  const filterOptions = [
    {
      id: "location",
      label: "贵州",
      options: ["贵州", "贵阳市", "遵义市", "六盘水市", "安顺市", "毕节市", "铜仁市", "黔西南州", "黔东南州", "黔南州"],
    },
    {
      id: "category",
      label: "全部",
      options: [
        "全部",
        "户外活动",
        "音乐演出",
        "体育赛事",
        "时令活动",
        "非遗表演",
        "博览展会",
        "剧场演出",
        "光影演出",
        "非遗活动",
      ],
    },
    {
      id: "distance",
      label: "不限",
      options: ["不限", "1km内", "5km内", "10km内", "20km内", "50km内", "大于50km"],
    },
    {
      id: "time",
      label: "15天内",
      options: ["15天内", "1个月内", "3个月内"],
    },
  ]

  const categoryButtons = [
    { name: "户外活动", ref: outdoorRef },
    { name: "文化展览", ref: cultureRef },
    { name: "音乐演出", ref: musicRef },
    { name: "体育赛事", ref: sportsRef },
    { name: "时令活动", ref: null },
    { name: "非遗表演", ref: null },
    { name: "博览展会", ref: null },
    { name: "剧场演出", ref: null },
    { name: "光影演出", ref: null },
  ]

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const activities = [
    {
      id: "1",
      date: "01.17",
      weekday: "周三",
      title: "XX演唱会",
      location: "贵阳市观山湖区某某广场",
      time: "2025/01/17 19:30-21:30",
      price: 256,
      image: "/placeholder.svg?height=200&width=400",
      tag: "超值优惠",
      isFavorite: false,
    },
    {
      id: "2",
      date: "01.18",
      weekday: "周四",
      title: "民俗庙会节",
      location: "贵阳市云岩区某某寺庙",
      time: "2025/01/18 全天",
      price: 0,
      image: "/placeholder.svg?height=200&width=400",
      tag: "免费",
      isFavorite: false,
    },
    {
      id: "3",
      date: "01.18",
      weekday: "周四",
      title: "XX演唱会",
      location: "贵阳市观山湖区某某广场",
      time: "2025/01/18 19:30-21:30",
      price: 256,
      image: "/placeholder.svg?height=200&width=400",
      isFavorite: false,
    },
  ]

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

        {/* Activity Plaza Content */}
        <div className="px-4 py-4 w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 shadow-md relative rounded-t-lg">
            <h1 className="text-lg font-medium text-center">本地活动</h1>
          </div>

          {/* Filters */}
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="flex items-center px-2 py-2 space-x-4 overflow-x-auto scrollbar-hide">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="flex items-center gap-1 text-xs flex-shrink-0">
                  <select
                    className="text-xs border-none bg-transparent focus:ring-0 appearance-none pl-0 pr-4 hover:text-blue-600 transition-colors"
                    value={selectedFilters[filter.id as keyof typeof selectedFilters]}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [filter.id]: e.target.value,
                      }))
                    }
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundSize: "8px",
                    }}
                  >
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Category buttons */}
            <div className="flex overflow-x-auto py-2 px-2 space-x-2 scrollbar-hide">
              {categoryButtons.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-shrink-0 text-xs px-3 py-1 rounded-full transition-all duration-200",
                    selectedCategory === category.name
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-gray-600 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    setSelectedCategory(category.name === selectedCategory ? null : category.name)
                    if (category.ref) scrollToSection(category.ref)
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-4 mt-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
                <div className="flex border-b p-4">
                  <div className="text-center mr-4 bg-gray-50 px-3 py-1 rounded-lg">
                    <div className="text-sm font-medium">{activity.date}</div>
                    <div className="text-xs text-gray-500">{activity.weekday}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-medium truncate">{activity.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => toggleFavorite(activity.id)}
                      >
                        <Star
                          className={cn(
                            "h-5 w-5 transition-colors",
                            favorites.includes(activity.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                          )}
                        />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    <div className="text-xs text-gray-500 truncate">{activity.location}</div>
                  </div>
                </div>
                <div className="relative aspect-[2/1]">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {activity.tag && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                      {activity.tag}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-500 font-medium text-lg">
                      {activity.price > 0 ? `¥${activity.price}` : "免费"}
                    </span>
                    {activity.price > 0 && <span className="text-xs text-gray-400">起</span>}
                  </div>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600 transition-colors shadow-sm">
                    预定
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Category Sections */}
          <div ref={outdoorRef} className="mt-8">
            <h2 className="text-lg font-bold mb-4">户外活动</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={`户外活动 ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate">{`户外活动 ${i}`}</h3>
                    <p className="text-white/80 text-xs mt-1">查看详情</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={cultureRef} className="mt-8">
            <h2 className="text-lg font-bold mb-4">文化展览</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={`文化展览 ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate">{`文化展览 ${i}`}</h3>
                    <p className="text-white/80 text-xs mt-1">查看详情</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={musicRef} className="mt-8">
            <h2 className="text-lg font-bold mb-4">音乐演出</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={`音乐演出 ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate">{`音乐演出 ${i}`}</h3>
                    <p className="text-white/80 text-xs mt-1">查看详情</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={sportsRef} className="mt-8">
            <h2 className="text-lg font-bold mb-4">体育赛事</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={`体育赛事 ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate">{`体育赛事 ${i}`}</h3>
                    <p className="text-white/80 text-xs mt-1">查看详情</p>
                  </div>
                </div>
              ))}
            </div>
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

