"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, RefreshCw, Copy, Calendar, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface DailyPromptData {
    date: string
    prompt: string
    theme: string
    mood: string
}

export function DailyPrompt() {
    const [promptData, setPromptData] = useState<DailyPromptData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchDailyPrompt = async (forceRefresh = false): Promise<void> => {
        try {
            setIsRefreshing(forceRefresh)
            const response = await fetch(`/api/daily-prompt${forceRefresh ? "?refresh=true" : ""}`)

            if (!response.ok) {
                throw new Error(`Failed to fetch daily prompt: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setPromptData(data)
        } catch (error) {
            console.error('Error fetching daily prompt:', error)
            toast.error("Failed to load daily prompt. Please try again.")
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        fetchDailyPrompt().catch(error => {
            console.error('Error in useEffect fetchDailyPrompt:', error)
        })
    }, [])

    const copyPrompt = async (): Promise<void> => {
        try {
            if (promptData?.prompt) {
                await navigator.clipboard.writeText(promptData.prompt)
                toast.success("Daily prompt copied to clipboard!")
            }
        } catch (error) {
            console.error('Error copying to clipboard:', error)
            toast.error("Failed to copy to clipboard.")
        }
    }

    const handleRefresh = (): void => {
        fetchDailyPrompt(true).catch(error => {
            console.error('Error refreshing prompt:', error)
        })
    }

    const handleTryAgain = (): void => {
        fetchDailyPrompt(true).catch(error => {
            console.error('Error trying again:', error)
        })
    }

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (isLoading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <CardTitle className="text-lg">Daily Poetry Prompt</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Powered by Gemini
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!promptData) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                        </div>
                        <CardTitle className="text-lg">Daily Poetry Prompt</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Powered by Gemini
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">Unable to load today's prompt.</p>
                    <Button variant="outline" onClick={handleTryAgain} className="mt-4">
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-yellow-200">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <CardTitle className="text-lg">Daily Poetry Prompt</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Powered by Gemini
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={copyPrompt}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(promptData.date)}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {promptData.theme}
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {promptData.mood}
                    </Badge>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border border-yellow-200 shadow-sm">
                    <p className="text-gray-800 leading-relaxed font-medium">{promptData.prompt}</p>
                </div>

                <CardDescription className="text-xs flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Generated fresh daily using Google Gemini AI and cached for optimal performance. Use the refresh button to
                    generate a new variation.
                </CardDescription>
            </CardContent>
        </Card>
    )
}