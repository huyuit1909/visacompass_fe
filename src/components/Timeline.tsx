import { useState } from 'react'
import type { TimelineMilestone } from '../types'
import { useDarkMode } from '../hooks/useDarkMode'

export function Timeline() {
  const { isDarkMode } = useDarkMode()
  const [coe, setCoe] = useState<string>('')
  const [apply, setApply] = useState<string>('')
  const [milestones, setMilestones] = useState<TimelineMilestone[]>([])

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Visa Timeline</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Quản lý thời gian và lịch trình visa</p>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Thiết lập timeline</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Ngày hết hạn COE</label>
            <input 
              type="date" 
              value={coe} 
              onChange={e => setCoe(e.target.value)} 
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`} 
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Ngày nộp dự kiến</label>
            <input 
              type="date" 
              value={apply} 
              onChange={e => setApply(e.target.value)} 
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`} 
            />
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={buildTimeline} 
              disabled={!coe}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                !coe
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              Tạo timeline
            </button>
          </div>
        </div>
      </div>

      {milestones.length > 0 && (
        <div className={`rounded-xl shadow-lg p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-6 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Mốc thời gian quan trọng</h3>
          
          <div className="relative">
            <div className={`absolute left-3 top-0 bottom-0 w-0.5 transition-colors ${
              isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`}></div>
            
            <div className="space-y-6">
              {milestones.map((milestone, i) => (
                <div key={i} className="relative flex items-start">
                  <div className={`absolute left-0 w-6 h-6 rounded-full border-4 transition-colors ${
                    isDarkMode ? 'bg-gray-800 border-blue-500' : 'bg-white border-blue-500'
                  }`}></div>
                  
                  <div className="ml-12 flex-1">
                    <div className={`text-sm transition-colors ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{milestone.date}</div>
                    <div className={`font-medium text-lg transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{milestone.label}</div>
                    
                    {i === 0 && (
                      <div className={`mt-2 p-3 rounded-lg transition-colors ${
                        isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
                      }`}>
                        <p className={`text-sm transition-colors ${
                          isDarkMode ? 'text-blue-200' : 'text-blue-700'
                        }`}>
                          ⏰ Đây là mốc thời gian quan trọng nhất. Hãy chuẩn bị hồ sơ đầy đủ trước ngày này.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {milestones.length === 0 && (
        <div className={`rounded-xl shadow-lg p-12 text-center transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-6xl mb-4">📅</div>
          <h3 className={`text-xl font-semibold mb-2 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Chưa có timeline</h3>
          <p className={`transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Nhập ngày hết hạn COE để tạo timeline tự động
          </p>
        </div>
      )}
    </div>
  )
}
