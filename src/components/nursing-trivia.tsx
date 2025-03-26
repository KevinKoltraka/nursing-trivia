"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BarChart3 } from "lucide-react"
import confetti from "canvas-confetti"
import { initialQuestions, generateNewQuestions, resetUsedQuestions, type Question } from "@/lib/questions"
import PerformancePanel from "./performance-panel"
import type { CategoryScore } from "@/lib/types"

export default function NursingTrivia() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const [questionSet, setQuestionSet] = useState(1)
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0)
  const [gameEnded, setGameEnded] = useState(false)
  const [perfectSets, setPerfectSets] = useState(0)
  const [currentSetScore, setCurrentSetScore] = useState(0)
  const [showPerformancePanel, setShowPerformancePanel] = useState(false)

  // Track category performance
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([])

  const handleAnswer = () => {
    const isCorrect = selectedOption === questions[currentQuestion].answer

    if (isCorrect) {
      setScore(score + 1)
      setCurrentSetScore(currentSetScore + 1)
      triggerConfetti()
    }

    // Update category scores
    const currentCategory = questions[currentQuestion].category || "Uncategorized"
    updateCategoryScore(currentCategory, isCorrect)

    setShowResult(true)
    setShowFunFact(true)
    setTotalQuestionsAnswered(totalQuestionsAnswered + 1)
  }

  const updateCategoryScore = (category: string, isCorrect: boolean) => {
    setCategoryScores((prev) => {
      const existingCategory = prev.find((c) => c.category === category)

      if (existingCategory) {
        return prev.map((c) =>
          c.category === category
            ? {
                ...c,
                correct: isCorrect ? c.correct + 1 : c.correct,
                total: c.total + 1,
              }
            : c,
        )
      } else {
        return [
          ...prev,
          {
            category,
            correct: isCorrect ? 1 : 0,
            total: 1,
          },
        ]
      }
    })
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const nextQuestion = () => {
    setShowResult(false)
    setShowFunFact(false)
    setSelectedOption("")

    if (currentQuestion < questions.length - 1) {
      // Continue with current set
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // End of current question set
      if (currentSetScore === 5) {
        setPerfectSets(perfectSets + 1)
        triggerConfetti()
      }

      // Load next set of questions - completely new random set
      const newQuestions = generateNewQuestions(totalQuestionsAnswered)
      setQuestions(newQuestions)
      setCurrentQuestion(0) // Reset to first question of new set
      setQuestionSet(questionSet + 1)
      setCurrentSetScore(0) // Reset current set score
    }
  }

  const endGame = () => {
    setGameEnded(true)
  }

  const resetGame = () => {
    resetUsedQuestions()
    setQuestions(initialQuestions)
    setCurrentQuestion(0)
    setSelectedOption("")
    setScore(0)
    setShowResult(false)
    setQuestionSet(1)
    setTotalQuestionsAnswered(0)
    setGameEnded(false)
    setPerfectSets(0)
    setCurrentSetScore(0)
    setCategoryScores([])
  }

  const togglePerformancePanel = () => {
    setShowPerformancePanel(!showPerformancePanel)
  }

  if (showPerformancePanel) {
    return (
      <PerformancePanel
        totalScore={score}
        totalQuestions={totalQuestionsAnswered}
        perfectSets={perfectSets}
        categoryScores={categoryScores}
        onClose={togglePerformancePanel}
      />
    )
  }

  if (gameEnded) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Game Over!</CardTitle>
          <CardDescription className="text-center">
            You scored {score} out of {totalQuestionsAnswered} questions
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Stats</h3>
            <p className="mb-2">Question sets completed: {questionSet - 1}</p>
            <p className="mb-2">Perfect sets: {perfectSets}</p>
            <p className="mb-2">Accuracy: {Math.round((score / totalQuestionsAnswered) * 100)}%</p>
          </div>

          {score === totalQuestionsAnswered ? (
            <div className="mb-4">
              <h3 className="text-xl font-bold text-green-600 mb-2">Perfect Score! 🎉</h3>
              <p>You're definitely going to impress her with your nursing knowledge!</p>
            </div>
          ) : score >= totalQuestionsAnswered * 0.8 ? (
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Amazing job! 👍</h3>
              <p>You've got some serious nursing knowledge!</p>
            </div>
          ) : score >= totalQuestionsAnswered * 0.6 ? (
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Great job! 👍</h3>
              <p>You've got solid nursing knowledge!</p>
            </div>
          ) : (
            <div className="mb-4">
              <h3 className="text-xl font-bold text-amber-600 mb-2">Nice try! 😊</h3>
              <p>Maybe you need a study session with your nursing friend!</p>
            </div>
          )}

          <Button
            onClick={togglePerformancePanel}
            variant="outline"
            className="mb-4 w-full flex items-center justify-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            View Detailed Performance
          </Button>
        </CardContent>
        <CardFooter>
          <Button onClick={resetGame} className="w-full">
            Play Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Nursing Trivia</CardTitle>
          <div className="text-sm font-medium">
            Set {questionSet}: Question {currentQuestion + 1}/5
          </div>
        </div>
        <CardDescription className="flex justify-between">
          <span>
            Score: {score}/{totalQuestionsAnswered}
          </span>
          <span>Perfect Sets: {perfectSets}</span>
        </CardDescription>
        <div className="flex justify-between items-center mt-1">
          {questions[currentQuestion].category && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {questions[currentQuestion].category}
            </div>
          )}

          {totalQuestionsAnswered > 0 && (
            <Button variant="ghost" size="sm" onClick={togglePerformancePanel} className="h-8 px-2 text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Performance
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          {questions[currentQuestion].icon}
          <h2 className="text-lg font-semibold">{questions[currentQuestion].question}</h2>
        </div>

        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <div
              key={option}
              className={`flex items-center space-x-2 rounded-lg border p-3 transition-colors ${
                showResult && option === questions[currentQuestion].answer
                  ? "bg-green-100 border-green-500"
                  : showResult && option === selectedOption && option !== questions[currentQuestion].answer
                    ? "bg-red-100 border-red-500"
                    : "hover:bg-muted"
              }`}
            >
              <RadioGroupItem value={option} id={option} disabled={showResult} />
              <Label htmlFor={option} className="flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showFunFact && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium">Fun Fact: {questions[currentQuestion].funFact}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {!showResult ? (
          <Button onClick={handleAnswer} disabled={!selectedOption} className="w-full">
            Submit Answer
          </Button>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <Button onClick={nextQuestion} className="w-full">
              Next Question
            </Button>

            {currentQuestion === 4 && (
              <Button onClick={endGame} variant="outline" className="w-full">
                End Game & See Results
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

