"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Bell, 
  Pill, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Volume2, 
  MessageSquare,
  Globe,
  Settings,
  Phone,
  X
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function MedicinesPage() {
  const [schedule, setSchedule] = useState<{
    [key: string]: {
      morning: boolean
      afternoon: boolean
      evening: boolean
    }
  }>({
    metformin: { morning: true, afternoon: false, evening: true },
    lisinopril: { morning: true, afternoon: false, evening: false }
  })

  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    language: 'hindi' as 'hindi' | 'tamil' | 'bengali' | 'odia',
    notificationType: 'both' as 'voice' | 'notification' | 'both',
    volume: 80,
    repeatUntilMarked: true,
    repeatInterval: 5, // minutes
    maxRepeats: 10 // maximum number of repeats
  })

  const [showCallDemo, setShowCallDemo] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Pre-recorded audio URLs - MATCHING YOUR FILE NAMES
  const audioFiles = {
    hindi: "/audio/hindi.mp3",
    tamil: "/audio/tamila.mp3",
    bengali: "/audio/bengoli.mp3",
    odia: "/audio/odia.mp3"
  }

  const toggleTime = (medicine: string, time: string) => {
    setSchedule(prev => {
      const currentMedicineSchedule = prev[medicine]
      const updatedMedicineSchedule = {
        ...currentMedicineSchedule,
        [time]: !currentMedicineSchedule[time as keyof typeof currentMedicineSchedule],
      }
      return { ...prev, [medicine]: updatedMedicineSchedule }
    })
  }

  const playVoiceReminder = () => {
    // For demo: Show the call simulation popup
    setShowCallDemo(true)
    
    // Try to play the actual audio file
    if (audioRef.current) {
      // Check if audio file exists for selected language
      if (audioFiles[voiceSettings.language]) {
        audioRef.current.src = audioFiles[voiceSettings.language]
        audioRef.current.volume = voiceSettings.volume / 100
        audioRef.current.loop = voiceSettings.repeatUntilMarked
        
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true)
        }).catch((error) => {
          console.log("Audio playback failed:", error)
          setIsPlayingAudio(false)
          // Fallback to browser TTS if audio file fails
          speakWithTTS()
        })
      } else {
        // If no audio file, use TTS fallback
        speakWithTTS()
      }
    }
  }

  const speakWithTTS = () => {
    // Browser TTS fallback
    if ('speechSynthesis' in window) {
      const message = getVoiceMessage()
      const speech = new SpeechSynthesisUtterance(message)
      
      // Set language based on selection
      const langMap = {
        hindi: 'hi-IN',
        tamil: 'ta-IN',
        bengali: 'bn-IN',
        odia: 'or-IN'
      }
      speech.lang = langMap[voiceSettings.language] || 'hi-IN'
      speech.rate = 0.8 // Slower for clarity
      speech.volume = voiceSettings.volume / 100
      
      window.speechSynthesis.speak(speech)
      setIsPlayingAudio(true)
      
      // If repeat until marked, set up repeating
      if (voiceSettings.repeatUntilMarked) {
        speech.onend = () => {
          setTimeout(() => {
            if (showCallDemo) {
              speakWithTTS()
            }
          }, voiceSettings.repeatInterval * 60 * 1000)
        }
      }
    } else {
      setIsPlayingAudio(false)
    }
  }

  const stopVoiceReminder = () => {
    setShowCallDemo(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    // Stop any TTS
    window.speechSynthesis.cancel()
    setIsPlayingAudio(false)
  }

  const markMedicineAsTaken = (medicineName: string) => {
    // In real app, this would update backend
    alert(`${medicineName} marked as taken!`)
    stopVoiceReminder()
  }

  // Simulated voice reminder text based on language
  const getVoiceMessage = () => {
    const messages = {
      hindi: "नमस्ते! आपकी दवा का समय हो गया है। कृपया मेटफॉर्मिन की गोली लें।",
      tamil: "வணக்கம்! உங்கள் மருந்து நேரம் வந்துவிட்டது. தயவுசெய்து மெட்ஃபார்மின் மாத்திரை எடுத்துக் கொள்ளுங்கள்.",
      bengali: "নমস্কার! আপনার ওষুধের সময় হয়েছে। দয়া করে মেটফর্মিন ট্যাবলেট নিন।",
      odia: "ନମସ୍କାର! ଆପଣଙ୍କର ଔଷଧ ସମୟ ହୋଇଛି। ଦୟାକରି ମେଟଫର୍ମିନ୍ ଟାବଲେଟ୍ ନିଅନ୍ତୁ।"
    }
    return messages[voiceSettings.language] || messages.hindi
  }

  // Language options with flags - UPDATED FOR YOUR FILES
  const languageOptions = [
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'tamil', label: 'தமிழ்', flag: '🇮🇳' },
    { value: 'bengali', label: 'বাংলা', flag: '🇧🇩' },
    { value: 'odia', label: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ]

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Hidden audio element for voice reminders */}
      <audio ref={audioRef} />
      
      {/* Call Demo Popup */}
      {showCallDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-in fade-in duration-300">
            {/* Call Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">📞 Health Reminder Call</h3>
                <p className="text-white/80">Incoming voice reminder</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {languageOptions.find(lang => lang.value === voiceSettings.language)?.flag}
                  {' '}
                  {languageOptions.find(lang => lang.value === voiceSettings.language)?.label}
                </span>
              </div>
            </div>

            {/* Call Body */}
            <div className="p-6">
              {/* Simulated voice message */}
              <div className="bg-gray-100 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Volume2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      {isPlayingAudio && (
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Voice Message Playing</p>
                    <p className="text-sm text-gray-600">
                      {isPlayingAudio ? "Audio is playing..." : "Audio will play..."}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border">
                  <p className="text-gray-700">{getVoiceMessage()}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      {isPlayingAudio && (
                        <div className="h-full bg-green-500 animate-pulse" style={{ width: '70%' }}></div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {voiceSettings.repeatUntilMarked ? "🔁 Repeating" : "Playing"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg"
                  onClick={() => markMedicineAsTaken("Metformin")}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  ✅ Mark Medicine as Taken
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 h-12"
                  onClick={() => {
                    alert("Reminder snoozed for 10 minutes")
                    stopVoiceReminder()
                  }}
                >
                  ⏰ Snooze for 10 Minutes
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12"
                  onClick={stopVoiceReminder}
                >
                  <X className="h-5 w-5 mr-2" />
                  Stop Reminder
                </Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  {voiceSettings.repeatUntilMarked 
                    ? `This reminder will repeat every ${voiceSettings.repeatInterval} minutes until marked as taken`
                    : "This reminder will play once"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Voice Reminder Settings Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 rounded-lg p-2">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Voice Reminder Settings</h2>
                  <p className="text-sm text-gray-600">Configure how you receive medicine reminders</p>
                </div>
              </div>
              
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={playVoiceReminder}
              >
                <Phone className="h-4 w-4 mr-2" />
                Test Voice Call Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Voice Language
                </label>
                <Select
                  value={voiceSettings.language}
                  onValueChange={(value: 'hindi' | 'tamil' | 'bengali' | 'odia') => setVoiceSettings(prev => ({ 
                    ...prev, 
                    language: value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reminder Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Reminder Type
                </label>
                <Select
                  value={voiceSettings.notificationType}
                  onValueChange={(value: 'voice' | 'notification' | 'both') => setVoiceSettings(prev => ({ 
                    ...prev, 
                    notificationType: value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <MessageSquare className="h-4 w-4" />
                        <span>Voice + Notification</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="voice">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <span>Voice Call Only</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="notification">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span>Notification Only</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Volume Control */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Voice Volume
                  </span>
                  <span className="text-blue-600 font-medium">{voiceSettings.volume}%</span>
                </label>
                <Slider
                  value={[voiceSettings.volume]}
                  onValueChange={(value) => setVoiceSettings(prev => ({ 
                    ...prev, 
                    volume: value[0] 
                  }))}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Repeat Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    🔁 Repeat until marked as taken
                  </label>
                  <Switch
                    checked={voiceSettings.repeatUntilMarked}
                    onCheckedChange={(checked) => setVoiceSettings(prev => ({ 
                      ...prev, 
                      repeatUntilMarked: checked 
                    }))}
                  />
                </div>
                
                {voiceSettings.repeatUntilMarked && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Repeat every (minutes)
                    </label>
                    <Select
                      value={voiceSettings.repeatInterval.toString()}
                      onValueChange={(value) => setVoiceSettings(prev => ({ 
                        ...prev, 
                        repeatInterval: parseInt(value) 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Reminder Alert */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-400 rounded-full p-2">
              <Bell className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Next Reminder</h3>
              <p className="text-gray-700">Metformin 500mg - Morning dose</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-orange-600 font-semibold">In 2 hours</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{voiceSettings.notificationType === 'voice' ? '📞 Voice Call' : 
                    voiceSettings.notificationType === 'notification' ? '🔔 Notification' : 
                    '📞🔔 Voice + Notification'}</span>
              <span>•</span>
              <span>{languageOptions.find(lang => lang.value === voiceSettings.language)?.label}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="bg-blue-500 rounded-full p-2">
                  <Pill className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">6/8</p>
                </div>
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Doses</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <div className="bg-orange-500 rounded-full p-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Missed Doses</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <div className="bg-red-500 rounded-full p-2">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Medicines */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Today's Medicines</h2>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Mark All as Taken</Button>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Metformin */}
            <Card className="border border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 rounded-lg p-3">
                      <Pill className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Metformin</h3>
                      <p className="text-gray-600">500mg • 30 days remaining</p>
                      <p className="text-sm text-gray-500">Prescribed by Dr. Sarah Johnson</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit">✓ Active</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Morning</p>
                      <p className="text-sm text-gray-600">8:00 AM</p>
                    </div>
                    <Switch
                      checked={schedule.metformin.morning}
                      onCheckedChange={() => toggleTime("metformin", "morning")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Afternoon</p>
                      <p className="text-sm text-gray-600">2:00 PM</p>
                    </div>
                    <Switch
                      checked={schedule.metformin.afternoon}
                      onCheckedChange={() => toggleTime("metformin", "afternoon")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Evening</p>
                      <p className="text-sm text-gray-600">8:00 PM</p>
                    </div>
                    <Switch
                      checked={schedule.metformin.evening}
                      onCheckedChange={() => toggleTime("metformin", "evening")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lisinopril */}
            <Card className="border border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 rounded-lg p-3">
                      <Pill className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Lisinopril</h3>
                      <p className="text-gray-600">10mg • 45 days remaining</p>
                      <p className="text-sm text-gray-500">Prescribed by Dr. Michael Chen</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit">✓ Active</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Morning</p>
                      <p className="text-sm text-gray-600">9:00 AM</p>
                    </div>
                    <Switch
                      checked={schedule.lisinopril.morning}
                      onCheckedChange={() => toggleTime("lisinopril", "morning")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Evening</p>
                      <p className="text-sm text-gray-600">9:00 PM</p>
                    </div>
                    <Switch
                      checked={schedule.lisinopril.evening}
                      onCheckedChange={() => toggleTime("lisinopril", "evening")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}