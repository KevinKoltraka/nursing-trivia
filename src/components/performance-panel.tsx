import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Brain, TrendingUp, AlertTriangle } from 'lucide-react'
import { CategoryScore } from "@/lib/types"

interface PerformancePanelProps {
  totalScore: number
  totalQuestions: number
  perfectSets: number
  categoryScores: CategoryScore[]
  onClose: () => void
}

export default function PerformancePanel({
  totalScore,
  totalQuestions,
  perfectSets,
  categoryScores,
  onClose
}: PerformancePanelProps) {
  // Calculate overall accuracy
  const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0
  
  // Sort categories by performance (worst to best)
  const sortedCategories = [...categoryScores]
    .filter(cat => cat.total > 0) // Only include categories with at least one question
    .sort((a, b) => (a.correct / a.total) - (b.correct / b.total))
  
  // Get strengths (top 3 categories with at least 2 questions)
  const strengths = [...categoryScores]
    .filter(cat => cat.total >= 2)
    .sort((a, b) => (b.correct / b.total) - (a.correct / a.total))
    .slice(0, 3)
  
  // Get weaknesses (bottom 3 categories with at least 2 questions)
  const weaknesses = [...categoryScores]
    .filter(cat => cat.total >= 2)
    .sort((a, b) => (a.correct / a.total) - (b.correct / b.total))
    .slice(0, 3)
  
  // Get achievement level
  const getAchievementLevel = () => {
    if (accuracy >= 90) return "Nursing Expert"
    if (accuracy >= 80) return "Advanced Practitioner"
    if (accuracy >= 70) return "Competent Nurse"
    if (accuracy >= 60) return "Developing Nurse"
    return "Nursing Student"
  }
  
  // Get improvement advice
  const getImprovementAdvice = () => {
    if (weaknesses.length === 0) return "Keep practicing to maintain your knowledge!"
    
    return `Focus on improving your knowledge in ${weaknesses.map(w => w.category).join(", ")}.`
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Performance Dashboard</CardTitle>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <CardDescription>
          Track your progress and identify areas for improvement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Overall Accuracy</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-green-600">{totalScore}/{totalQuestions}</div>
            <div className="text-sm text-gray-600">Questions Correct</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-yellow-600">{perfectSets}</div>
            <div className="text-sm text-gray-600">Perfect Sets</div>
          </div>
        </div>
        
        {/* Achievement Level */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Achievement Level</h3>
          </div>
          <div className="text-xl font-bold text-purple-700">{getAchievementLevel()}</div>
          <Progress value={accuracy} className="h-2 mt-2" />
        </div>
        
        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Your Strengths</h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{strength.category}</span>
                  <span className="font-medium">
                    {strength.correct}/{strength.total} ({Math.round((strength.correct / strength.total) * 100)}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Areas for Improvement */}
        {weaknesses.length > 0 && (
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{weakness.category}</span>
                  <span className="font-medium">
                    {weakness.correct}/{weakness.total} ({Math.round((weakness.correct / weakness.total) * 100)}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Category Breakdown */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Category Breakdown</h3>
          </div>
          <div className="space-y-3 mt-3">
            {sortedCategories.map((category, index) => {
              const categoryAccuracy = Math.round((category.correct / category.total) * 100)
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.category}</span>
                    <span>{category.correct}/{category.total} ({categoryAccuracy}%)</span>
                  </div>
                  <Progress 
                    value={categoryAccuracy} 
                    className={`h-2 ${
                      categoryAccuracy >= 80 ? 'bg-green-100' : 
                      categoryAccuracy >= 60 ? 'bg-yellow-100' : 
                      'bg-red-100'
                    }`} 
                  />
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Improvement Advice */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Improvement Advice</h3>
          <p>{getImprovementAdvice()}</p>
          {weaknesses.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Try focusing on one category at a time and review the fun facts for additional learning.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
