import { promises as fs } from "fs"
import path from "path"

const CACHE_DIR = path.join(process.cwd(), "cache")
const DAILY_PROMPT_FILE = path.join(CACHE_DIR, "daily-prompt.json")

interface DailyPromptCache {
    date: string
    prompt: string
    theme: string
    mood: string
}

export async function ensureCacheDir() {
    try {
        await fs.access(CACHE_DIR)
    } catch {
        await fs.mkdir(CACHE_DIR, { recursive: true })
    }
}

export async function getDailyPrompt(): Promise<DailyPromptCache | null> {
    try {
        await ensureCacheDir()
        const data = await fs.readFile(DAILY_PROMPT_FILE, "utf-8")
        const cached = JSON.parse(data) as DailyPromptCache

        // Check if it's still today's prompt
        const today = new Date().toISOString().split("T")[0]
        if (cached.date === today) {
            return cached
        }
    } catch (error) {
        // File doesn't exist or is corrupted, will generate new prompt
    }

    return null
}

export async function saveDailyPrompt(prompt: DailyPromptCache): Promise<void> {
    try {
        await ensureCacheDir()
        await fs.writeFile(DAILY_PROMPT_FILE, JSON.stringify(prompt, null, 2))
    } catch (error) {
        console.error("Failed to save daily prompt:", error)
    }
}

// Alternative KV implementation (uncomment if using Upstash KV)
/*
import { kv } from '@vercel/kv'

export async function getDailyPromptKV(): Promise<DailyPromptCache | null> {
  try {
    const today = new Date().toISOString().split("T")[0]
    const cached = await kv.get(`daily-prompt:${today}`)
    return cached as DailyPromptCache | null
  } catch (error) {
    console.error("Failed to get daily prompt from KV:", error)
    return null
  }
}

export async function saveDailyPromptKV(prompt: DailyPromptCache): Promise<void> {
  try {
    const today = new Date().toISOString().split("T")[0]
    // Set with 24 hour expiration
    await kv.setex(`daily-prompt:${today}`, 86400, prompt)
  } catch (error) {
    console.error("Failed to save daily prompt to KV:", error)
  }
}
*/
