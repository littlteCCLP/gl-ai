"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Mic, Send, PlusCircle, History, User, ChevronDown, ChevronUp, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function StayArrangement() {
  const [inputMessage, setInputMessage] = useState("")
  const [selectedDays, setSelectedDays] = useState([30])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedAccommodation, setSelectedAccommodation] = useState<string[]>([])
  const [selectedPreferenceTypes, setSelectedPreferenceTypes] = useState<string[]>([])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [companions, setCompanions] = useState(1)
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: "1", title: "贵州三日游规划" },
    { id: "2", title: "黄果树瀑布一日游" },
  ])
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setInputMessage("")
    }
  }

  const destinations = {
    贵阳市: ["南明区", "云岩区", "花溪区", "乌当区", "白云区", "观山湖区", "清镇市"],
    遵义市: ["红花岗区", "汇川区", "播州区", "桐梓县", "绥阳县"],
    安顺市: ["西秀区", "平坝区", "普定县", "镇宁布依族苗族自治县"],
    毕节市: ["七星关区", "大方县", "威宁彝族回族苗族自治县"],
    铜仁市: ["碧江区", "万山区", "江口县", "玉屏侗族自治县"],
    黔东南州: ["凯里市", "黄平县", "施秉县", "三穗县"],
    黔南州: ["都匀市", "福泉市", "荔波县", "贵定县"],
    黔西南州: ["兴义市", "兴仁市", "安龙县", "晴隆县"],
    六盘水市: ["钟山区", "六枝特区", "水城县", "盘州市"],
  }

  const accommodationPreferences = ["近商圈", "交通便利", "近自然/郊区", "近景点"]

  const housingTypes = ["公寓常租", "民宿预定", "酒店长租", "包吃包住"]

  const themePreferences = ["文化体验", "自然风光", "美食探索", "休闲放松", "疗康养", "户外运动"]

  const presetQuestions = [
    "我想去贵州避暑，帮我规划一个月的旅居行程",
    "帮我找一个在贵州包吃包住的旅居地",
    "帮我规划一个去村寨、古镇、乡村各住10天的旅居安排",
  ]

  const handleDestinationChange = (value: string) => {
    setSelectedDestinations((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const removeDestination = (value: string) => {
    setSelectedDestinations((prev) => prev.filter((item) => item !== value))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-[414px] mx-auto bg-white min-h-screen">
        {/* Welcome Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe6932720fda997c3b514dd58df8362.jpg-2qwI8qmiqjugdlHJenUS9UU4ilVGNb.jpeg"
              alt="贵贵助手"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h1 className="text-lg font-bold mb-1">欢迎使用旅居规划助手</h1>
          <p className="text-xs text-gray-500">让我们一起规划您的完美旅居！</p>
        </div>

        {/* Stay Preferences */}
        <Card className="mx-4 mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Always visible preferences */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">旅居时间</label>
                <div className="flex items-center space-x-2">
                  <Slider
                    defaultValue={[30]}
                    max={365}
                    min={30}
                    step={1}
                    value={selectedDays}
                    onValueChange={setSelectedDays}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">{selectedDays[0]}天</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">目的地（可多选）</label>
                <Select onValueChange={handleDestinationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择目的地" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(destinations).map(([city, districts]) => (
                      <SelectGroup key={city}>
                        <SelectLabel>{city}</SelectLabel>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDestinations.map((destination) => (
                    <Badge key={destination} variant="secondary" className="px-2 py-1">
                      {destination}
                      <button onClick={() => removeDestination(destination)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">喜好类型</label>
              <div className="flex flex-wrap gap-2">
                {housingTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedPreferenceTypes.includes(type) ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedPreferenceTypes((prev) =>
                        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
                      )
                    }}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Collapsible preferences */}
            <div>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                size="sm"
                className="w-full justify-between"
              >
                <span>更多偏好设置</span>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {isExpanded && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">居住地偏好</label>
                    <div className="flex flex-wrap gap-2">
                      {accommodationPreferences.map((pref) => (
                        <Badge
                          key={pref}
                          variant={selectedAccommodation.includes(pref) ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedAccommodation((prev) =>
                              prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
                            )
                          }}
                        >
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">主题偏好</label>
                    <div className="flex flex-wrap gap-2">
                      {themePreferences.map((theme) => (
                        <Badge
                          key={theme}
                          variant={selectedThemes.includes(theme) ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedThemes((prev) =>
                              prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme],
                            )
                          }}
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">预算（元）</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="最低预算" className="w-1/2" />
                      <span>至</span>
                      <Input type="number" placeholder="最高预算" className="w-1/2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">同行人数（人）</label>
                    <Input
                      type="number"
                      min={1}
                      value={companions}
                      onChange={(e) => setCompanions(Number.parseInt(e.target.value) || 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <Button className="w-full">生成我的旅居方案</Button>
          </CardContent>
        </Card>

        {/* Preset Questions */}
        <Card className="mx-4 mb-6">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {presetQuestions.map((question, index) => (
                <li key={index} className="text-sm text-black cursor-pointer hover:underline">
                  {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-[#F8F8F8] w-full max-w-[414px]">
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

