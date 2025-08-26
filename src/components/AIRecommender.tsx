import { useState } from 'react'
import type { VisaProfile, VisaRecommendation } from '../types'
import { useDarkMode } from '../hooks/useDarkMode'

export function AIRecommender() {
  const { isDarkMode } = useDarkMode()
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

  const analyzeProfile = () => {
    // Mock analysis logic
    const mockRecommendations: VisaRecommendation[] = [
      {
        visaType: '高度専門職 (Highly Skilled Professional)',
        matchPercentage: 85,
        requirements: ['Bằng đại học', 'Kinh nghiệm 3+ năm', 'JLPT N2+'],
        steps: ['Chuẩn bị hồ sơ', 'Nộp đơn xin COE', 'Phỏng vấn', 'Nhận kết quả'],
        description: 'Phù hợp với profile của bạn',
        code: 'HIGHSKILL'
      },
      {
        visaType: '技術・人文知識・国際業務 (Engineer/Specialist)',
        matchPercentage: 75,
        requirements: ['Bằng đại học', 'Kinh nghiệm liên quan', 'JLPT N3+'],
        steps: ['Tìm công ty nhận việc', 'Chuẩn bị hồ sơ', 'Nộp đơn', 'Phỏng vấn'],
        description: 'Lựa chọn tốt nếu có công ty nhận',
        code: 'ENGINEER'
      },
      {
        visaType: '特定技能 (Specified Skilled Worker)',
        matchPercentage: 60,
        requirements: ['Chứng chỉ kỹ năng', 'JLPT N4+', 'Kinh nghiệm thực tế'],
        steps: ['Thi chứng chỉ kỹ năng', 'Chuẩn bị hồ sơ', 'Nộp đơn', 'Phỏng vấn'],
        description: 'Phù hợp nếu có kỹ năng đặc định',
        code: 'SSW'
      }
    ]
    setRecommendations(mockRecommendations)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>AI Visa Recommender</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Nhập thông tin để nhận gợi ý visa phù hợp nhất</p>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Thông tin cá nhân</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Quốc tịch</label>
            <input
              type="text"
              value={profile.nationality}
              onChange={(e) => setProfile({...profile, nationality: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Ví dụ: Việt Nam"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Tuổi</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Giới tính</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({...profile, gender: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Trình độ học vấn</label>
            <select
              value={profile.education}
              onChange={(e) => setProfile({...profile, education: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Chọn trình độ</option>
              <option value="highschool">Trung học phổ thông</option>
              <option value="college">Cao đẳng</option>
              <option value="university">Đại học</option>
              <option value="masters">Thạc sĩ</option>
              <option value="phd">Tiến sĩ</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Kinh nghiệm làm việc</label>
            <select
              value={profile.workExperience}
              onChange={(e) => setProfile({...profile, workExperience: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Chọn kinh nghiệm</option>
              <option value="0-1">0-1 năm</option>
              <option value="1-3">1-3 năm</option>
              <option value="3-5">3-5 năm</option>
              <option value="5-10">5-10 năm</option>
              <option value="10+">10+ năm</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Trình độ tiếng Nhật</label>
            <select
              value={profile.japaneseLevel}
              onChange={(e) => setProfile({...profile, japaneseLevel: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Chọn trình độ</option>
              <option value="N5">JLPT N5</option>
              <option value="N4">JLPT N4</option>
              <option value="N3">JLPT N3</option>
              <option value="N2">JLPT N2</option>
              <option value="N1">JLPT N1</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasJobOffer"
              checked={profile.hasJobOffer}
              onChange={(e) => setProfile({...profile, hasJobOffer: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="hasJobOffer" className={`transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Có lời mời làm việc từ công ty Nhật</label>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasRelatives"
              checked={profile.hasRelatives}
              onChange={(e) => setProfile({...profile, hasRelatives: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="hasRelatives" className={`transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Có người thân đang sinh sống tại Nhật</label>
          </div>
        </div>

        <button
          onClick={analyzeProfile}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          Phân tích và gợi ý visa
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className={`text-2xl font-semibold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Kết quả gợi ý</h2>
          
          {recommendations.map((rec, index) => (
            <div key={index} className={`rounded-xl shadow-lg p-6 transition-colors ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>{rec.visaType}</h3>
                  <p className={`transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{rec.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold transition-colors ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>{rec.matchPercentage}%</div>
                  <div className={`text-sm transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Độ phù hợp</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Yêu cầu cơ bản</h4>
                  <ul className="space-y-2">
                    {rec.requirements.map((req, i) => (
                      <li key={i} className={`flex items-center gap-2 transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`font-semibold mb-3 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Các bước thực hiện</h4>
                  <ol className="space-y-2">
                    {rec.steps.map((step, i) => (
                      <li key={i} className={`flex items-center gap-2 transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                        }`}>{i + 1}</div>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
