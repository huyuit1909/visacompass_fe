import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDarkMode } from '../hooks/useDarkMode'
import { 
  Brain, HomeIcon, CheckSquare, FileText, Edit3, 
  UploadIcon, Calendar, BarChart3, Sun, Moon
} from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Sidebar() {
  const { t } = useTranslation()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

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
