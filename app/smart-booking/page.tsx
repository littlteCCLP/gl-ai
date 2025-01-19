'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { BottomNavigation } from '@/components/BottomNavigation'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function SmartBooking() {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  useEffect(() => {
    setChatMessages([{
      role: 'assistant',
      content: '您好！我是您的智能订购助手。需要我帮您预订景点门票或酒店吗？'
    }])
  }, [])

  const callQianwenAPI = async (messages: Message[]) => {
    try {
      const response = await fetch('/api/qianwen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: '你是一个专业的贵州旅游产品订购助手，熟悉贵州的景点门票、酒店住宿等旅游产品。请为用户提供专业的咨询和订购建议。'
            },
            ...messages
          ]
        }),
      })
      
      if (!response.ok) {
        throw new Error('API 请求失败')
      }
      
      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('调用通义千问API错误:', error)
      return '抱歉，我现在无法回答。请稍后再试。'
    }
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      setIsLoading(true)
      const userMessage = { role: 'user', content: inputMessage }
      setChatMessages(prev => [...prev, userMessage])
      setInputMessage('')

      try {
        const aiResponse = await callQianwenAPI([...chatMessages, userMessage])
        setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
      } catch (error) {
        console.error('发送消息错误:', error)
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '抱歉，系统暂时无法回应，请稍后再试。' 
        }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-3xl mx-auto p-4 pb-12">
      <h1 className="text-2xl font-bold mb-4">智能订购</h1>
      
      {/* 智能对话界面 */}
      <Card className="mb-6 p-4">
        <div className="h-64 overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {msg.content}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="订个酒店、找个门票、比个价格..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? '发送中...' : '发送'}
          </Button>
        </div>
      </Card>
      
      {/* 产品展示部分保持不变 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
              <Badge className="absolute top-2 left-2 bg-blue-500">{product.type}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{product.rating}</span>
                <span className="mx-2">•</span>
                <MessageCircle className="w-4 h-4 text-gray-400 mr-1" />
                <span>{product.reviews} 条评论</span>
              </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">¥{product.price}</span>
                <Button>立即预订</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <BottomNavigation currentPage="smart-booking" />
    </div>
  )
}

const products = [
  {
    name: "黄果树瀑布景区门票",
    type: "门票",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviews: 2345,
    description: "世界最大的瀑布群，壮观的自然奇观",
    price: 180
  },
  {
    name: "小七孔景区门票",
    type: "门票",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: 1890,
    description: "贵州最美的喀斯特地貌，山水画卷",
    price: 150
  },
  {
    name: "贵阳安纳塔拉度假酒店",
    type: "酒店",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    reviews: 1256,
    description: "奢华五星级度假酒店，尽享贵阳山城美景",
    price: 888
  },
  {
    name: "贵阳喜来登贵航酒店",
    type: "酒店",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    reviews: 2078,
    description: "位于市中心的商务酒店，交通便利",
    price: 668
  }
]

