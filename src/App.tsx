import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Globe2, Sun, Moon, Home as HomeIcon, FolderKanban, Info, 
  Search, GraduationCap, Briefcase, DollarSign, ExternalLink, 
  Settings, Brain, CheckSquare, FileText, Upload as UploadIcon, Calendar, 
  BarChart3, Users, Target, ArrowRight, Star, Clock, AlertCircle,
  CheckCircle, XCircle, Download, Share2, Edit3, Eye, Plus
} from 'lucide-react'
import { useState } from 'react'
import { Pie, Line } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)
import React from 'react'

// Custom hook for dark mode
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  React.useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('theme')
      setIsDarkMode(saved === 'dark')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return { isDarkMode, setIsDarkMode }
}

// Types
interface VisaProfile {
  nationality: string
  age: number
  gender: string
  maritalStatus: string
  education: string
  workExperience: string
  industry: string
  japaneseLevel: string
  hasJobOffer: boolean
  hasRelatives: boolean
}

interface VisaRecommendation {
  visaType: string
  matchPercentage: number
  requirements: string[]
  steps: string[]
  description: string
  code: string
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  isCompleted: boolean
  notes: string
  category: string
}

// Mock data
const visaTypes = [
  {
    code: 'HIGHSKILL',
    name: '高度専門職 (Highly Skilled Professional)',
    description: 'Dành cho chuyên gia có kỹ năng cao',
    requirements: ['Bằng đại học', 'Kinh nghiệm 3+ năm', 'JLPT N2+'],
    benefits: ['Thời hạn dài', 'Ưu đãi thuế', 'Đưa gia đình'],
    restrictions: ['Yêu cầu điểm cao', 'Chỉ định ngành nghề']
  },
  {
    code: 'ENGINEER',
    name: '技術・人文知識・国際業務 (Engineer/Specialist)',
    description: 'Dành cho kỹ sư và chuyên gia',
    requirements: ['Bằng đại học', 'Kinh nghiệm liên quan', 'JLPT N3+'],
    benefits: ['Thời hạn 3-5 năm', 'Có thể gia hạn', 'Linh hoạt công việc'],
    restrictions: ['Phải có công ty nhận', 'Không được thay đổi ngành']
  },
  {
    code: 'SSW',
    name: '特定技能 (Specified Skilled Worker)',
    description: 'Dành cho lao động kỹ năng',
    requirements: ['Chứng chỉ kỹ năng', 'JLPT N4+', 'Kinh nghiệm thực tế'],
    benefits: ['Thời hạn 5 năm', 'Có thể gia hạn', 'Đưa gia đình'],
    restrictions: ['Chỉ 14 ngành được phép', 'Phải thi chứng chỉ']
  }
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { isDarkMode, setIsDarkMode } = useDarkMode()
  
  const changeLanguage = (lang: string) => {
    try {
      console.log('Changing language to:', lang)
      i18n.changeLanguage(lang)
      console.log('Current language:', i18n.language)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <div className="join">
      <button 
        className={`btn btn-sm join-item border transition-colors ${
          i18n.language === 'vi' 
            ? isDarkMode ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-700'
            : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-50 text-gray-700'
        } ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} 
        onClick={() => changeLanguage('vi')}
      >
        VI
      </button>
      <button 
        className={`btn btn-sm join-item border transition-colors ${
          i18n.language === 'ja' 
            ? isDarkMode ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-700'
            : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-50 text-gray-700'
        } ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} 
        onClick={() => changeLanguage('ja')}
      >
        日本語
      </button>
      <button 
        className={`btn btn-sm join-item border transition-colors ${
          i18n.language === 'en' 
            ? isDarkMode ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-700'
            : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-50 text-gray-700'
        } ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} 
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  )
}

function Sidebar() {
  const { t } = useTranslation()
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <div className={`w-64 h-screen fixed left-0 top-0 shadow-sm transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 border-r border-gray-700' 
        : 'bg-white border-r border-gray-100'
    }`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className={`p-2.5 rounded-xl transition-colors ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
          }`}>
            <Brain className={`w-6 h-6 transition-colors ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <h1 className={`text-xl font-semibold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Visa Compass</h1>
        </div>
        
        <nav className="space-y-1">
          <Link to="/" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-blue-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-blue-900 group-hover:bg-blue-800' : 'bg-blue-100 group-hover:bg-blue-200'
            }`}>
              <HomeIcon className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-blue-400' : 'text-blue-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-blue-400' 
                : 'text-gray-700 group-hover:text-blue-700'
            }`}>{t('nav.home')}</span>
          </Link>
          <Link to="/checklist" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-green-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-green-900 group-hover:bg-green-800' : 'bg-green-100 group-hover:bg-green-200'
            }`}>
              <CheckSquare className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-green-400' : 'text-green-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-green-400' 
                : 'text-gray-700 group-hover:text-green-700'
            }`}>{t('nav.checklist')}</span>
          </Link>
          <Link to="/wiki" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-purple-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-purple-900 group-hover:bg-purple-800' : 'bg-purple-100 group-hover:bg-purple-200'
            }`}>
              <FileText className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-purple-400' : 'text-purple-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-purple-400' 
                : 'text-gray-700 group-hover:text-purple-700'
            }`}>{t('nav.wiki')}</span>
          </Link>
          <Link to="/forms" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-orange-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-orange-900 group-hover:bg-orange-800' : 'bg-orange-100 group-hover:bg-orange-200'
            }`}>
              <Edit3 className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-orange-400' : 'text-orange-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-orange-400' 
                : 'text-gray-700 group-hover:text-orange-700'
            }`}>{t('nav.forms')}</span>
          </Link>
          <Link to="/upload" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-yellow-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-yellow-900 group-hover:bg-yellow-800' : 'bg-yellow-100 group-hover:bg-yellow-200'
            }`}>
              <UploadIcon className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-yellow-400' 
                : 'text-gray-700 group-hover:text-yellow-700'
            }`}>{t('nav.upload')}</span>
          </Link>
          <Link to="/timeline" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-indigo-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-indigo-900 group-hover:bg-indigo-800' : 'bg-indigo-100 group-hover:bg-indigo-200'
            }`}>
              <Calendar className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-indigo-400' 
                : 'text-gray-700 group-hover:text-indigo-700'
            }`}>{t('nav.timeline')}</span>
          </Link>
          <Link to="/dashboard" className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-teal-50 text-gray-700'
          }`}>
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-teal-900 group-hover:bg-teal-800' : 'bg-teal-100 group-hover:bg-teal-200'
            }`}>
              <BarChart3 className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-teal-400' : 'text-teal-700'
              }`} />
            </div>
            <span className={`font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-teal-400' 
                : 'text-gray-700 group-hover:text-teal-700'
            }`}>{t('nav.dashboard')}</span>
          </Link>
        </nav>
        
        <div className={`mt-auto space-y-3 pt-8 border-t transition-colors ${
          isDarkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className={`rounded-lg p-2 transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <LanguageSwitcher />
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`flex items-center gap-3 p-2 rounded-lg w-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-200' 
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <div className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </div>
            <span className="text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function AIRecommender() {
  const [profile, setProfile] = useState<VisaProfile>({
    nationality: '',
    age: 25,
    gender: '',
    maritalStatus: '',
    education: '',
    workExperience: '',
    industry: '',
    japaneseLevel: '',
    hasJobOffer: false,
    hasRelatives: false
  })
  
  const [recommendations, setRecommendations] = useState<VisaRecommendation[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeProfile = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      const mockRecommendations: VisaRecommendation[] = [
        {
          visaType: '高度専門職 (Highly Skilled Professional)',
          matchPercentage: 85,
          code: 'HIGHSKILL',
          requirements: ['Bằng đại học', 'Kinh nghiệm 3+ năm', 'JLPT N2+'],
          steps: ['Chuẩn bị hồ sơ', 'Nộp đơn xin COE', 'Phỏng vấn', 'Nhận visa'],
          description: 'Phù hợp với hồ sơ của bạn do có bằng cấp cao và kinh nghiệm'
        },
        {
          visaType: '技術・人文知識・国際業務 (Engineer/Specialist)',
          matchPercentage: 75,
          code: 'ENGINEER',
          requirements: ['Bằng đại học', 'Kinh nghiệm liên quan', 'JLPT N3+'],
          steps: ['Tìm công ty nhận', 'Chuẩn bị hồ sơ', 'Nộp đơn', 'Nhận visa'],
          description: 'Lựa chọn tốt nếu bạn có công ty Nhật nhận việc'
        }
      ]
      setRecommendations(mockRecommendations)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">AI Visa Recommender</h2>
        </div>
        <p className="text-gray-600 mb-8">Nhập thông tin để nhận gợi ý visa phù hợp nhất</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe2 className="w-4 h-4" />
                Quốc tịch
              </label>
              <input 
                type="text" 
                placeholder="e.g., Vietnamese, American" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.nationality}
                onChange={(e) => setProfile({...profile, nationality: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Tuổi</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Giới tính</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value})}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Tình trạng hôn nhân</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.maritalStatus}
                onChange={(e) => setProfile({...profile, maritalStatus: e.target.value})}
              >
                <option value="">Chọn tình trạng</option>
                <option value="single">Độc thân</option>
                <option value="married">Đã kết hôn</option>
                <option value="divorced">Đã ly hôn</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="w-4 h-4" />
                Bằng cấp cao nhất
              </label>
              <input 
                type="text" 
                placeholder="e.g., Bachelor's Degree in CS" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.education}
                onChange={(e) => setProfile({...profile, education: e.target.value})}
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                Kinh nghiệm làm việc
              </label>
              <input 
                type="text" 
                placeholder="e.g., 5 years" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.workExperience}
                onChange={(e) => setProfile({...profile, workExperience: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Ngành nghề</label>
              <input 
                type="text" 
                placeholder="e.g., Software Engineering" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.industry}
                onChange={(e) => setProfile({...profile, industry: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Trình độ tiếng Nhật</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={profile.japaneseLevel}
                onChange={(e) => setProfile({...profile, japaneseLevel: e.target.value})}
              >
                <option value="">Chọn trình độ</option>
                <option value="N5">JLPT N5</option>
                <option value="N4">JLPT N4</option>
                <option value="N3">JLPT N3</option>
                <option value="N2">JLPT N2</option>
                <option value="N1">JLPT N1</option>
                <option value="none">Không có</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={profile.hasJobOffer}
                onChange={(e) => setProfile({...profile, hasJobOffer: e.target.checked})}
              />
              <span className="text-gray-700">Có công ty Nhật nhận việc</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={profile.hasRelatives}
                onChange={(e) => setProfile({...profile, hasRelatives: e.target.checked})}
              />
              <span className="text-gray-700">Có người thân tại Nhật</span>
            </label>
          </div>
          
          <button 
            type="button" 
            onClick={analyzeProfile}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                AI đang phân tích...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Brain className="w-6 h-6" />
                Phân tích hồ sơ với AI
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Kết quả phân tích AI</h3>
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <motion.div 
                key={rec.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{rec.visaType}</h4>
                    <p className="text-gray-600">{rec.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{rec.matchPercentage}%</div>
                    <div className="text-sm text-gray-500">Phù hợp</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Yêu cầu
                    </h5>
                    <ul className="space-y-2">
                      {rec.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Các bước thực hiện
                    </h5>
                    <ol className="space-y-2">
                      {rec.steps.map((step, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải hướng dẫn chi tiết
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Home() {
  const { isDarkMode } = useDarkMode()
  return (
    <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <AIRecommender />
    </div>
  )
}

// Placeholder components for other routes
function Checklist() {
  const { isDarkMode } = useDarkMode()
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', title: 'Hộ chiếu còn hạn', description: 'Còn hạn ít nhất 6 tháng', isCompleted: false, notes: '', category: 'Bắt buộc' },
    { id: '2', title: 'Ảnh 3x4', description: 'Phông trắng, chụp trong 3 tháng', isCompleted: false, notes: '', category: 'Bắt buộc' },
    { id: '3', title: 'Đơn xin visa', description: 'Theo mẫu của cơ quan', isCompleted: false, notes: '', category: 'Mẫu' },
  ])
  const [newItem, setNewItem] = useState('')

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i))
  }

  const addItem = () => {
    if (!newItem.trim()) return
    setItems(prev => [{ id: Date.now().toString(), title: newItem.trim(), description: '', isCompleted: false, notes: '', category: 'Khác' }, ...prev])
    setNewItem('')
  }

  const updateNotes = (id: string, notes: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, notes } : i))
  }

  const exportPDF = async () => {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    const element = document.getElementById('checklist-pdf')!
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save('visa-checklist.pdf')
  }

  return (
    <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className={`text-3xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Dynamic Checklist</h2>
          <button onClick={exportPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Xuất PDF</button>
        </div>

        <div className={`rounded-xl shadow p-4 flex gap-3 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <input 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)} 
            placeholder="Thêm mục cần chuẩn bị..." 
            className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 text-gray-900 placeholder-gray-500'
            }`} 
          />
          <button onClick={addItem} className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors">Thêm</button>
        </div>

        <div id="checklist-pdf" className={`rounded-xl shadow p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className={`border rounded-lg p-4 transition-colors ${
                isDarkMode ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={item.isCompleted} onChange={() => toggleItem(item.id)} className="mt-1 w-5 h-5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{item.title}</h3>
                      <span className={`text-xs transition-colors ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{item.category}</span>
                    </div>
                    {item.description && <p className={`text-sm mt-1 transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{item.description}</p>}
                    <textarea 
                      value={item.notes} 
                      onChange={(e) => updateNotes(item.id, e.target.value)} 
                      placeholder="Ghi chú cá nhân..." 
                      className={`mt-3 w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Wiki() {
  type CatalogVisa = {
    code: string
    name: string
    category: 'Work' | 'Study' | 'Family' | 'Other'
    summary: string
    requirements: string[]
    durationYears: number | string
    language: string
    dependents: boolean
  }

  const catalog: CatalogVisa[] = [
    { code: 'HIGHSKILL', name: '高度専門職 (Highly Skilled Professional)', category: 'Work', summary: 'Dành cho chuyên gia điểm cao, ưu đãi lớn.', requirements: ['ĐH trở lên', 'Điểm HSP đủ', 'Kinh nghiệm 3+ năm'], durationYears: '1-5', language: 'JLPT N2+', dependents: true },
    { code: 'ENGINEER', name: '技術・人文知識・国際業務 (Engineer/Specialist)', category: 'Work', summary: 'Visa lao động trí thức phổ biến.', requirements: ['ĐH đúng chuyên ngành', 'Công ty nhận việc'], durationYears: '1-5', language: 'JLPT N3+', dependents: true },
    { code: 'SSW', name: '特定技能 (Specified Skilled Worker)', category: 'Work', summary: 'Kỹ năng đặc định 12/14 ngành.', requirements: ['Thi kỹ năng', 'JLPT N4+'], durationYears: 5, language: 'JLPT N4+', dependents: true },
    { code: 'STUDENT', name: '留学 (Student)', category: 'Study', summary: 'Du học, trường tiếng/đại học.', requirements: ['COE trường', 'Chứng minh tài chính'], durationYears: '1-2', language: 'Khuyến nghị N5+', dependents: false },
    { code: 'SPOUSE', name: '日本人の配偶者等 (Spouse of Japanese)', category: 'Family', summary: 'Vợ/chồng người Nhật.', requirements: ['Giấy kết hôn', 'Chứng minh quan hệ'], durationYears: '1-5', language: 'Không bắt buộc', dependents: true },
  ]

  const categories: Array<CatalogVisa['category'] | 'All'> = ['All', 'Work', 'Study', 'Family', 'Other']
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = catalog.filter(v => (
    (category === 'All' || v.category === category) &&
    (v.name.toLowerCase().includes(query.toLowerCase()) || v.code.toLowerCase().includes(query.toLowerCase()))
  ))

  const toggleSelect = (code: string) => {
    setSelected(prev => prev.includes(code)
      ? prev.filter(c => c !== code)
      : prev.length >= 2 ? [prev[1], code] : [...prev, code]
    )
  }

  const compareVisas = selected.map(code => catalog.find(v => v.code === code)!).filter(Boolean)

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Visa Wiki & So sánh</h2>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex gap-3 w-full md:w-auto">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Tìm theo tên hoặc mã visa..." className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <select value={category} onChange={(e)=>setCategory(e.target.value as any)} className="p-3 border border-gray-300 rounded-lg">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="text-sm text-gray-600">Đã chọn: {selected.join(' , ') || 'Chọn tối đa 2 visa để so sánh'}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {filtered.map(v => (
            <div key={v.code} className={`bg-white rounded-xl border ${selected.includes(v.code)?'border-blue-500':'border-gray-200'} shadow p-5`}> 
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">{v.category}</div>
                  <h3 className="text-lg font-semibold text-gray-800">{v.name}</h3>
                  <div className="text-sm text-gray-500">Code: {v.code}</div>
                </div>
                <button onClick={()=>toggleSelect(v.code)} className={`px-3 py-1 rounded-lg text-sm ${selected.includes(v.code)?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'} transition-colors`}>{selected.includes(v.code)?'Đã chọn':'Chọn so sánh'}</button>
              </div>
              <p className="mt-3 text-gray-700 text-sm">{v.summary}</p>
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
                {v.requirements.map((r,i)=>(<li key={i}>{r}</li>))}
              </ul>
            </div>
          ))}
        </div>

        {compareVisas.length === 2 && (
          <div className="bg-white rounded-xl shadow p-6 mt-8">
            <h3 className="text-2xl font-bold mb-4">Bảng so sánh</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-3"></th>
                    {compareVisas.map(v => (<th key={v.code} className="p-3">{v.name}<div className="text-xs text-gray-400">{v.code}</div></th>))}
                  </tr>
                </thead>
                <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
                  <tr>
                    <td className="p-3 font-medium">Danh mục</td>
                    {compareVisas.map(v=> <td key={v.code} className="p-3">{v.category}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Thời hạn</td>
                    {compareVisas.map(v=> <td key={v.code} className="p-3">{v.durationYears} năm</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Yêu cầu tiếng Nhật</td>
                    {compareVisas.map(v=> <td key={v.code} className="p-3">{v.language}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Đưa người phụ thuộc</td>
                    {compareVisas.map(v=> <td key={v.code} className="p-3">{v.dependents? 'Có':'Không'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Điều kiện chính</td>
                    {compareVisas.map(v=> <td key={v.code} className="p-3"><ul className="list-disc pl-5 text-sm text-gray-600">{v.requirements.map((r,i)=>(<li key={i}>{r}</li>))}</ul></td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Forms() {
  const [fullName, setFullName] = useState('Nguyen Van A')
  const [email, setEmail] = useState('mail@example.com')
  const [phone, setPhone] = useState('+81-90-1234-5678')
  const [summary, setSummary] = useState('Kỹ sư phần mềm với 5 năm kinh nghiệm trong phát triển web.')
  const [work, setWork] = useState([{ company: 'ABC Corp', role: 'Software Engineer', period: '2019 - 2024', desc: 'Phát triển ứng dụng React/Node.' }])

  const exportCV = async () => {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    const el = document.getElementById('cv-preview')!
    const canvas = await html2canvas(el)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save('CV.pdf')
  }

  const addWork = () => setWork(prev => [...prev, { company: '', role: '', period: '', desc: '' }])

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Form Builder</h2>
          <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <input className="w-full p-3 border rounded-lg" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Họ tên" />
            <div className="grid grid-cols-2 gap-3">
              <input className="p-3 border rounded-lg" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
              <input className="p-3 border rounded-lg" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" />
            </div>
            <textarea className="w-full p-3 border rounded-lg" rows={3} value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Tóm tắt" />
          </div>

          <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Kinh nghiệm làm việc</h3>
              <button onClick={addWork} className="px-3 py-1 bg-gray-800 text-white rounded">Thêm</button>
            </div>
            {work.map((w, idx) => (
              <div key={idx} className="grid gap-3">
                <input className="p-3 border rounded-lg" value={w.company} onChange={e=>setWork(prev=>prev.map((x,i)=>i===idx?{...x, company:e.target.value}:x))} placeholder="Công ty" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="p-3 border rounded-lg" value={w.role} onChange={e=>setWork(prev=>prev.map((x,i)=>i===idx?{...x, role:e.target.value}:x))} placeholder="Vai trò" />
                  <input className="p-3 border rounded-lg" value={w.period} onChange={e=>setWork(prev=>prev.map((x,i)=>i===idx?{...x, period:e.target.value}:x))} placeholder="Thời gian" />
                </div>
                <textarea className="p-3 border rounded-lg" rows={2} value={w.desc} onChange={e=>setWork(prev=>prev.map((x,i)=>i===idx?{...x, desc:e.target.value}:x))} placeholder="Mô tả công việc" />
                <hr className="my-2" />
              </div>
            ))}
          </div>

          <button onClick={exportCV} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Xuất CV (PDF)</button>
        </div>

        <div id="cv-preview" className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <div className="text-sm text-gray-600">{email} • {phone}</div>
          <h2 className="mt-4 font-semibold">Tóm tắt</h2>
          <p className="text-gray-700">{summary}</p>
          <h2 className="mt-4 font-semibold">Kinh nghiệm</h2>
          <div className="space-y-2">
            {work.map((w, idx) => (
              <div key={idx}>
                <div className="font-medium">{w.role} • {w.company}</div>
                <div className="text-xs text-gray-500">{w.period}</div>
                <div className="text-gray-700 text-sm">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentCheck() {
  type Uploaded = { id: string; name: string; size: number; type: string }
  const [files, setFiles] = useState<Uploaded[]>([])
  const [analysis, setAnalysis] = useState<string[]>([])
  const [status, setStatus] = useState<'idle'|'good'|'missing'|'errors'>('idle')

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (!f) return
    const list: Uploaded[] = Array.from(f).map(x=>({ id: crypto.randomUUID(), name: x.name, size: x.size, type: x.type }))
    setFiles(prev => [...prev, ...list])
  }

  const runCheck = () => {
    // mock analysis
    const hasId = files.some(f => /passport|id|residence/i.test(f.name))
    const hasPhoto = files.some(f => /photo|jpg|png/i.test(f.name))
    const hasForm = files.some(f => /form|application|申請/i.test(f.name))

    const notes: string[] = []
    if (!hasId) notes.push('Thiếu bản scan hộ chiếu/Residence Card')
    if (!hasPhoto) notes.push('Thiếu ảnh 3x4 nền trắng trong 3 tháng')
    if (!hasForm) notes.push('Thiếu đơn xin cấp visa đúng mẫu')

    setAnalysis(notes.length ? notes : ['Hồ sơ có vẻ đầy đủ.'])
    setStatus(notes.length ? 'missing' : 'good')
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Document Upload & Check</h2>

        <div className="bg-white rounded-xl shadow p-6">
          <input type="file" multiple onChange={onUpload} className="block" />
          {files.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">Đã tải lên</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {files.map(f => (
                  <li key={f.id} className="flex justify-between">
                    <span>{f.name}</span>
                    <span className="text-gray-500">{(f.size/1024).toFixed(1)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={runCheck} disabled={files.length===0} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">Phân tích hồ sơ</button>
        </div>

        {status !== 'idle' && (
          <div className={`rounded-xl p-6 ${status==='good'?'bg-green-50 border border-green-200':'bg-yellow-50 border border-yellow-200'}`}>
            <h3 className="font-semibold mb-3">Kết quả</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {analysis.map((n,i)=>(<li key={i}>{n}</li>))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function Timeline() {
  const [coe, setCoe] = useState<string>('')
  const [apply, setApply] = useState<string>('')
  const [milestones, setMilestones] = useState<{label:string; date:string}[]>([])

  const buildTimeline = async () => {
    const { addDays, format, parseISO } = await import('date-fns')
    if (!coe) return
    const coeDate = parseISO(coe)
    const applyDate = apply ? parseISO(apply) : addDays(coeDate, -60)
    const reminder1 = addDays(applyDate, -14)
    const reminder2 = addDays(coeDate, -14)
    const pickup = addDays(applyDate, 21)

    setMilestones([
      { label: 'Nộp hồ sơ (dự kiến)', date: format(applyDate, 'yyyy-MM-dd') },
      { label: 'Nhắc chuẩn bị hồ sơ', date: format(reminder1, 'yyyy-MM-dd') },
      { label: 'Nhắc trước hết hạn COE', date: format(reminder2, 'yyyy-MM-dd') },
      { label: 'Ngày hết hạn COE', date: format(coeDate, 'yyyy-MM-dd') },
      { label: 'Dự kiến nhận kết quả', date: format(pickup, 'yyyy-MM-dd') },
    ])
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Visa Timeline</h2>

        <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600">Ngày hết hạn COE</label>
            <input type="date" value={coe} onChange={e=>setCoe(e.target.value)} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Ngày nộp dự kiến</label>
            <input type="date" value={apply} onChange={e=>setApply(e.target.value)} className="w-full p-3 border rounded-lg" />
          </div>
          <div className="flex items-end">
            <button onClick={buildTimeline} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg">Tạo timeline</button>
          </div>
        </div>

        {milestones.length>0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Mốc thời gian</h3>
            <ol className="relative border-s border-gray-200 ml-3">
              {milestones.map((m,i)=> (
                <li key={i} className="mb-6 ms-6">
                  <span className="absolute -start-1.5 mt-1 flex h-3 w-3 rounded-full bg-blue-600"></span>
                  <div className="text-sm text-gray-500">{m.date}</div>
                  <div className="font-medium text-gray-800">{m.label}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

function Dashboard() {
  const nationalityData = {
    labels: ['VN', 'US', 'IN', 'PH', 'TH'],
    datasets: [{ data: [45, 20, 15, 10, 10], backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6'] }]
  }

  const approvalTrend = {
    labels: ['T1','T2','T3','T4','T5','T6'],
    datasets: [{ label: 'Tỷ lệ đậu (%)', data: [60,62,65,64,68,72], borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.2)' }]
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Quốc tịch người dùng</h3>
            <Pie data={nationalityData} />
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Xu hướng tỉ lệ đậu</h3>
            <Line data={approvalTrend} />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/upload" element={<DocumentCheck />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
