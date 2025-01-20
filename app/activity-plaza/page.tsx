"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, ChevronRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

const categories = [
  { id: "outdoor", title: "户外活动", image: "/placeholder.svg?height=200&width=200" },
  { id: "culture", title: "文化展览", image: "/placeholder.svg?height=200&width=200" },
  { id: "music", title: "音乐演出", image: "/placeholder.svg?height=200&width=200" },
  { id: "sports", title: "体育赛事", image: "/placeholder.svg?height=200&width=200" },
]

export default function ActivityPlaza() {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "贵州",
    category: "全部",
    distance: "不限",
    time: "15天内",
  })
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-4 shadow-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-600/50 transition-colors absolute left-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-medium text-center">本地活动</h1>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center px-4 py-3 space-x-6 overflow-x-auto scrollbar-hide">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="flex items-center gap-1 text-sm flex-shrink-0">
              <select
                className="text-sm border-none bg-transparent focus:ring-0 appearance-none pl-0 pr-5 hover:text-blue-600 transition-colors"
                value={selectedFilters[filter.id as keyof typeof selectedFilters]}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [filter.id]: e.target.value,
                  }))
                }
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                  backgroundSize: "12px",
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
      </div>

      {/* Activity List */}
      <div className="px-4 py-4">
        <div className="space-y-4">
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
        {categories.map((category) => (
          <div key={category.id} className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{category.title}</h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 transition-colors">
                更多
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.title} ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium truncate">{`${category.title}活动 ${i}`}</h3>
                    <p className="text-white/80 text-xs mt-1">查看详情</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

