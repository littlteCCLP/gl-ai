'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const travelTags = [
  { id: '1', label: '自然景观' },
  { id: '2', label: '民俗文化' },
  { id: '3', label: '户外运动' },
  { id: '4', label: '地理研究' },
  { id: '5', label: '美食探索' },
  { id: '6', label: '摄影爱好者' },
  { id: '7', label: '历史文化' },
  { id: '8', label: '建筑艺术' },
]

const occupationTags = [
  { id: 'o1', label: '学生' },
  { id: 'o2', label: '教师' },
  { id: 'o3', label: '工程师' },
  { id: 'o4', label: '医生' },
  { id: 'o5', label: '商人' },
  { id: 'o6', label: '艺术家' },
  { id: 'o7', label: '自由职业者' },
  { id: 'o8', label: '程序员' },
  { id: 'o9', label: '设计师' },
  { id: 'o10', label: '律师' },
  { id: 'o11', label: '会计' },
  { id: 'o12', label: '销售' },
  { id: 'o13', label: '管理人员' },
  { id: 'o14', label: '研究员' },
  { id: 'o15', label: '其他' },
]

const interestTags = [
  { id: 'i1', label: '阅读' },
  { id: 'i2', label: '运动' },
  { id: 'i3', label: '烹饪' },
  { id: 'i4', label: '旅行' },
  { id: 'i5', label: '摄影' },
  { id: 'i6', label: '音乐' },
  { id: 'i7', label: '电影' },
  { id: 'i8', label: '艺术' },
]

const musicTags = [
  { id: 'm1', label: '流行' },
  { id: 'm2', label: '摇滚' },
  { id: 'm3', label: '古典' },
  { id: 'm4', label: '爵士' },
  { id: 'm5', label: '电子' },
  { id: 'm6', label: '民谣' },
  { id: 'm7', label: '嘻哈' },
  { id: 'm8', label: '其他' },
]

export function UserProfileEdit({ onClose }: { onClose: () => void }) {
  const [userProfile, setUserProfile] = useState({
    nickname: '瑞雪',
    avatarUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/95f5a967a223392503b93d8b8942eb4-QD80D9i3vTRnsXEovEKDy3APBXCHJK.png',
    selectedTags: [] as string[],
    age: '',
    gender: '',
    selectedOccupationTags: [] as string[],
    selectedInterestTags: [] as string[],
    selectedMusicTags: [] as string[],
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleTagToggle = (tagId: string, tagType: 'travel' | 'occupation' | 'interest' | 'music') => {
    setUserProfile(prev => {
      const key = tagType === 'travel' ? 'selectedTags' :
                  tagType === 'occupation' ? 'selectedOccupationTags' :
                  tagType === 'interest' ? 'selectedInterestTags' : 'selectedMusicTags'
      return {
        ...prev,
        [key]: prev[key].includes(tagId)
          ? prev[key].filter(id => id !== tagId)
          : [...prev[key], tagId]
      }
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUserProfile(prev => ({ ...prev, avatarUrl: url }))
    }
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto"
    >
      <Card className="w-full max-w-[375px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800">
          <h2 className="text-xl font-semibold">个人设置</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-200/50" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg transition-transform group-hover:scale-105">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.nickname} />
                <AvatarFallback>{userProfile.nickname[0]}</AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-md"
              >
                <Camera className="w-5 h-5 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            
            <div className="w-full mt-6">
              <Label htmlFor="nickname" className="text-xs font-medium text-gray-700">
                昵称
              </Label>
              <Input
                id="nickname"
                value={userProfile.nickname}
                onChange={(e) => setUserProfile(prev => ({ ...prev, nickname: e.target.value }))}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="age" className="text-xs font-medium text-gray-700">
                年龄
              </Label>
              <Input
                id="age"
                value={userProfile.age}
                onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                className="mt-1.5"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="gender" className="text-xs font-medium text-gray-700">
                性别
              </Label>
              <Select 
                value={userProfile.gender} 
                onValueChange={(value) => setUserProfile(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger id="gender" className="mt-1.5">
                  <SelectValue placeholder="选择性别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-gray-700">
              标签（可多选）
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {travelTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={userProfile.selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer py-1 px-2 text-xs transition-all hover:shadow-md"
                  onClick={() => handleTagToggle(tag.id, 'travel')}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors">信息完善</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-6 overflow-hidden"
                >
                  <div>
                    <Label className="text-xs font-medium text-gray-700">
                      职业
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {occupationTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={userProfile.selectedOccupationTags.includes(tag.id) ? "default" : "outline"}
                          className="cursor-pointer py-1 px-2 text-xs transition-all hover:shadow-md"
                          onClick={() => handleTagToggle(tag.id, 'occupation')}
                        >
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700">
                      兴趣爱好
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interestTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={userProfile.selectedInterestTags.includes(tag.id) ? "default" : "outline"}
                          className="cursor-pointer py-1 px-2 text-xs transition-all hover:shadow-md"
                          onClick={() => handleTagToggle(tag.id, 'interest')}
                        >
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700">
                      音乐偏好
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {musicTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={userProfile.selectedMusicTags.includes(tag.id) ? "default" : "outline"}
                          className="cursor-pointer py-1 px-2 text-xs transition-all hover:shadow-md"
                          onClick={() => handleTagToggle(tag.id, 'music')}
                        >
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" onClick={handleSave}>
            保存设置
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

