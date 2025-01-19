import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Settings, BookMarked, Heart, LogOut } from 'lucide-react'
import Image from 'next/image'

export function UserProfile() {
  return (
    <Card className="fixed right-0 bottom-16 p-4 rounded-lg shadow-lg bg-white w-64 z-50">
      <div className="flex items-center gap-3 pb-4 border-b">
        <Image
          src="/placeholder.svg"
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h3 className="font-semibold">瑞雪</h3>
          <p className="text-sm text-gray-500">贵州旅行爱好者</p>
        </div>
      </div>
      
      <nav className="py-2">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="w-4 h-4" />
              个人信息
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookMarked className="w-4 h-4" />
              我的行程
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart className="w-4 h-4" />
              我的收藏
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" />
              设置
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
              <LogOut className="w-4 h-4" />
              退出登录
            </Button>
          </li>
        </ul>
      </nav>
    </Card>
  )
}

