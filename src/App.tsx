import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import { Sidebar } from './components/Sidebar'
import { AIRecommender } from './components/AIRecommender'
import { Checklist } from './components/Checklist'
import { Wiki } from './components/Wiki'
import { Forms } from './components/Forms'
import { DocumentCheck } from './components/DocumentCheck'
import { Timeline } from './components/Timeline'
import { Dashboard } from './components/Dashboard'

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

function App() {
  const { isDarkMode } = useDarkMode()

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Checklist />
            </div>
          } />
          <Route path="/wiki" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Wiki />
            </div>
          } />
          <Route path="/forms" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Forms />
            </div>
          } />
          <Route path="/upload" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <DocumentCheck />
            </div>
          } />
          <Route path="/timeline" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Timeline />
            </div>
          } />
          <Route path="/dashboard" element={
            <div className={`ml-64 p-8 min-h-screen transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              <Dashboard />
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
