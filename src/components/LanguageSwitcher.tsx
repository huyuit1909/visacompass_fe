import { useTranslation } from 'react-i18next'
import { useDarkMode } from '../hooks/useDarkMode'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { isDarkMode } = useDarkMode()
  
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
