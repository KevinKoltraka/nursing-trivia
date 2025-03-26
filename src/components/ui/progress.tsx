import { cn } from "@/lib/utils"

interface ProgressProps {
  value?: number
  className?: string
}

export function Progress({ value = 0, className }: ProgressProps) {
  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)}>
      <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

