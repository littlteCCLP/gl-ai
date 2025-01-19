'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Mic, Send, Star, MessageCircle, PlusCircle, History, User, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SmartBooking() {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [conversations, setConversations] = useState<{ id: string; title: string }[]>([
    { id: '1', title: '黄果树瀑布门票咨询' },
    { id: '2', title: '贵阳住宿推荐' },
  ])
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: inputMessage }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `您说: ${inputMessage}` }])
      }, 1000)
      setInputMessage('')
    }
  }

  const quickQuestions = [
    "订购小七孔的门票",
    "明天去贵阳，订一晚市区性价比高的酒店",
    "我在西江千户苗寨，帮我订一个好吃的酸汤鱼餐厅"
  ]

  const favorites = [
    "黔南州小众3日轻松游",
    "贵州5日常规游",
    "小七孔景区",
    "天泰酒店"
  ]

  const toggleFavorite = (favorite: string) => {
    setSelectedFavorites(prev => 
      prev.includes(favorite) 
        ? prev.filter(f => f !== favorite)
        : [...prev, favorite]
    )
  }

  const categories = [
    { id: 'tickets', name: '票务', color: 'bg-blue-500' },
    { id: 'hotels', name: '酒店', color: 'bg-blue-500' },
    { id: 'food', name: '美食', color: 'bg-purple-100 text-purple-600' },
    { id: 'transport', name: '交通', color: 'bg-purple-100 text-purple-600' }
  ]

  const products = [
    {
      id: '1',
      name: '黄果树瀑布景区门票',
      price: 180,
      originalPrice: 200,
      rating: 4.8,
      reviews: 2345,
      image: '/placeholder.svg?height=200&width=200',
      tag: '特惠'
    },
    {
      id: '2',
      name: '青岩古镇景区门票',
      price: 120,
      originalPrice: 150,
      rating: 4.7,
      reviews: 1890,
      image: '/placeholder.svg?height=200&width=200',
      tag: '热门'
    },
    {
      id: '3',
      name: '梵净山景区门票',
      price: 160,
      originalPrice: 180,
      rating: 4.9,
      reviews: 2156,
      image: '/placeholder.svg?height=200&width=200',
      tag: '推荐'
    },
    {
      id: '4',
      name: '西江千户苗寨门票',
      price: 140,
      originalPrice: 160,
      rating: 4.6,
      reviews: 1678,
      image: '/placeholder.svg?height=200&width=200',
      tag: '热卖'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-[414px] mx-auto bg-white min-h-screen">
        {/* AI Assistant Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-QD80D9i3vTRnsXEovEKDy3APBXCHJK.png"
              alt="AI Assistant"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">智能订购小助手</p>
              <p className="text-xs text-gray-500">提供快速订票、订酒店，一站式采购下单</p>
            </div>
          </div>
        </div>

        {/* Preset Questions */}
        <Card className="mx-4 my-4">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {quickQuestions.map((question, index) => (
                <li key={index} className="text-xs text-black cursor-pointer hover:underline">
                  {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* My Favorites */}
        <div className="mx-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">我的收藏</h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((favorite, index) => (
              <Badge
                key={index}
                variant={selectedFavorites.includes(favorite) ? "default" : "secondary"}
                className="cursor-pointer flex items-center gap-1"
                onClick={() => toggleFavorite(favorite)}
              >
                {favorite}
                {selectedFavorites.includes(favorite) && <Check className="w-3 h-3" />}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="px-4 grid grid-cols-4 gap-3 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              className={`${category.color} ${
                category.id === 'food' || category.id === 'transport' 
                  ? 'text-purple-600 bg-purple-100 border-purple-100' 
                  : 'text-white'
              } h-auto py-3 text-sm`}
              variant={category.id === 'food' || category.id === 'transport' ? 'outline' : 'default'}
            >
              {category.name}
            </Button>
          ))}
        </div>


        {/* Hot Recommendations */}
        <div className="px-4">
          <h2 className="text-lg font-bold mb-4">热门推荐</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full aspect-square object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-500">
                    {product.tag}
                  </Badge>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span>·</span>
                    <span>{product.reviews}条评论</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-red-500">¥{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">¥{product.originalPrice}</span>
                    </div>
                    <Button size="sm" className="text-xs px-2 py-1">
                      预订
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

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
    </div>
  )
}

