'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Palette } from 'lucide-react'
import { BottomNavigation } from '@/components/BottomNavigation'

// 添加类型定义
type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function StayArrangement() {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const callQianwenAPI = async (messages: Message[]) => {
    try {
      const response = await fetch('/api/qianwen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
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
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-3xl mx-auto p-4 pb-10">
      <h1 className="text-2xl font-bold mb-4">旅居安排</h1>
      
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
        </div>
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="输入您的旅居安排问题..."
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
      
      {/* 旅居规划器部分保持不变 */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">旅居规划器</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="destination" className="mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              居住目的地
            </Label>
            <Select>
              <SelectTrigger id="destination">
                <SelectValue placeholder="选择目的地" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guiyang">贵阳</SelectItem>
                <SelectItem value="zunyi">遵义</SelectItem>
                <SelectItem value="anshun">安顺</SelectItem>
                <SelectItem value="kaili">凯里</SelectItem>
                <SelectItem value="xingyi">兴义</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration" className="mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              居住时间
            </Label>
            <Select>
              <SelectTrigger id="duration">
                <SelectValue placeholder="选择时间" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-7">1-7天</SelectItem>
                <SelectItem value="8-30">8-30天</SelectItem>
                <SelectItem value="1-3">1-3个月</SelectItem>
                <SelectItem value="3+">3个月以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="theme" className="mb-2 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              主题偏好
            </Label>
            <Select>
              <SelectTrigger id="theme">
                <SelectValue placeholder="选择主题" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="culture">文化体验</SelectItem>
                <SelectItem value="nature">自然风光</SelectItem>
                <SelectItem value="food">美食之旅</SelectItem>
                <SelectItem value="relaxation">休闲放松</SelectItem>
                <SelectItem value="adventure">探险刺激</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-4 w-full">生成旅居方案</Button>
      </Card>
      <BottomNavigation currentPage="stay-arrangement" />
    </div>
  )
}

