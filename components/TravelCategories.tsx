import { Compass, Landmark, Utensils, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"

const categories = [
  { name: '目的地', icon: <Compass className="w-6 h-6" /> },
  { name: '景点推荐', icon: <Landmark className="w-6 h-6" /> },
  { name: '风味贵州', icon: <Utensils className="w-6 h-6" /> },
  { name: '民俗民风', icon: <Users className="w-6 h-6" /> },
]

export function TravelCategories() {
  return (
    <div className="flex overflow-x-auto pb-4 space-x-4 w-full">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-lg"
        >
          {category.icon}
          <span className="mt-2 text-xs text-center">{category.name}</span>
        </Button>
      ))}
    </div>
  )
}

