import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

export function Forms() {
  const { isDarkMode } = useDarkMode()
  const [activeTab, setActiveTab] = useState<'cv' | 'work' | 'questionnaire'>('cv')
  const [cvData, setCvData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    languages: ''
  })

  const [workHistory, setWorkHistory] = useState([
    { company: '', position: '', duration: '', description: '' }
  ])

  const [questionnaire, setQuestionnaire] = useState({
    purpose: '',
    duration: '',
    family: '',
    financial: '',
    plans: ''
  })

  const addWorkHistory = () => {
    setWorkHistory([...workHistory, { company: '', position: '', duration: '', description: '' }])
  }

  const updateWorkHistory = (index: number, field: string, value: string) => {
    const updated = [...workHistory]
    updated[index] = { ...updated[index], [field]: value }
    setWorkHistory(updated)
  }

  const removeWorkHistory = (index: number) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index))
  }

  const exportPDF = async (type: string) => {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    const element = document.getElementById(`${type}-pdf`)!
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`${type}-form.pdf`)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Form Builder</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Tạo các form cần thiết cho visa</p>
      </div>

      <div className={`rounded-xl shadow-lg transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'cv', label: 'CV Form' },
              { id: 'work', label: 'Work History' },
              { id: 'questionnaire', label: 'Questionnaire' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : isDarkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'cv' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>CV Form</h2>
                <button
                  onClick={() => exportPDF('cv')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Xuất PDF
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Họ và tên</label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => setCvData({...cvData, name: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Email</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => setCvData({...cvData, email: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Số điện thoại</label>
                  <input
                    type="tel"
                    value={cvData.phone}
                    onChange={(e) => setCvData({...cvData, phone: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="+84 123 456 789"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Địa chỉ</label>
                  <input
                    type="text"
                    value={cvData.address}
                    onChange={(e) => setCvData({...cvData, address: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Hà Nội, Việt Nam"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Học vấn</label>
                <textarea
                  value={cvData.education}
                  onChange={(e) => setCvData({...cvData, education: e.target.value})}
                  rows={3}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Mô tả trình độ học vấn..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Kinh nghiệm làm việc</label>
                <textarea
                  value={cvData.experience}
                  onChange={(e) => setCvData({...cvData, experience: e.target.value})}
                  rows={3}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Mô tả kinh nghiệm làm việc..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Kỹ năng</label>
                  <textarea
                    value={cvData.skills}
                    onChange={(e) => setCvData({...cvData, skills: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Liệt kê các kỹ năng..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Ngoại ngữ</label>
                  <textarea
                    value={cvData.languages}
                    onChange={(e) => setCvData({...cvData, languages: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Liệt kê các ngoại ngữ..."
                  />
                </div>
              </div>

              <div id="cv-pdf" className={`border rounded-lg p-6 transition-colors ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Preview CV</h3>
                <div className={`space-y-3 transition-colors ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <p><strong>Họ và tên:</strong> {cvData.name || 'Chưa nhập'}</p>
                  <p><strong>Email:</strong> {cvData.email || 'Chưa nhập'}</p>
                  <p><strong>Số điện thoại:</strong> {cvData.phone || 'Chưa nhập'}</p>
                  <p><strong>Địa chỉ:</strong> {cvData.address || 'Chưa nhập'}</p>
                  <p><strong>Học vấn:</strong> {cvData.education || 'Chưa nhập'}</p>
                  <p><strong>Kinh nghiệm:</strong> {cvData.experience || 'Chưa nhập'}</p>
                  <p><strong>Kỹ năng:</strong> {cvData.skills || 'Chưa nhập'}</p>
                  <p><strong>Ngoại ngữ:</strong> {cvData.languages || 'Chưa nhập'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'work' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Work History</h2>
                <button
                  onClick={() => exportPDF('work')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Xuất PDF
                </button>
              </div>

              {workHistory.map((work, index) => (
                <div key={index} className={`border rounded-lg p-4 transition-colors ${
                  isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>Công việc {index + 1}</h3>
                    {workHistory.length > 1 && (
                      <button
                        onClick={() => removeWorkHistory(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Xóa
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Công ty</label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) => updateWorkHistory(index, 'company', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Tên công ty"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Vị trí</label>
                      <input
                        type="text"
                        value={work.position}
                        onChange={(e) => updateWorkHistory(index, 'position', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Chức vụ"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Thời gian</label>
                      <input
                        type="text"
                        value={work.duration}
                        onChange={(e) => updateWorkHistory(index, 'duration', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="2020-2023"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Mô tả công việc</label>
                      <textarea
                        value={work.description}
                        onChange={(e) => updateWorkHistory(index, 'description', e.target.value)}
                        rows={2}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Mô tả công việc..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addWorkHistory}
                className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                + Thêm công việc
              </button>

              <div id="work-pdf" className={`border rounded-lg p-6 transition-colors ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Preview Work History</h3>
                <div className="space-y-4">
                  {workHistory.map((work, index) => (
                    <div key={index} className={`p-3 border rounded transition-colors ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <p className={`font-medium transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{work.company || 'Chưa nhập'} - {work.position || 'Chưa nhập'}</p>
                      <p className={`text-sm transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{work.duration || 'Chưa nhập'}</p>
                      <p className={`text-sm transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{work.description || 'Chưa nhập'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questionnaire' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Questionnaire</h2>
                <button
                  onClick={() => exportPDF('questionnaire')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Xuất PDF
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Mục đích đến Nhật Bản</label>
                  <textarea
                    value={questionnaire.purpose}
                    onChange={(e) => setQuestionnaire({...questionnaire, purpose: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Mô tả mục đích..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Thời gian dự định ở lại</label>
                  <input
                    type="text"
                    value={questionnaire.duration}
                    onChange={(e) => setQuestionnaire({...questionnaire, duration: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Ví dụ: 3-5 năm"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Kế hoạch gia đình</label>
                  <textarea
                    value={questionnaire.family}
                    onChange={(e) => setQuestionnaire({...questionnaire, family: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Kế hoạch về gia đình..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Khả năng tài chính</label>
                  <textarea
                    value={questionnaire.financial}
                    onChange={(e) => setQuestionnaire({...questionnaire, financial: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Mô tả khả năng tài chính..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Kế hoạch tương lai</label>
                  <textarea
                    value={questionnaire.plans}
                    onChange={(e) => setQuestionnaire({...questionnaire, plans: e.target.value})}
                    rows={3}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Kế hoạch tương lai..."
                  />
                </div>
              </div>

              <div id="questionnaire-pdf" className={`border rounded-lg p-6 transition-colors ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Preview Questionnaire</h3>
                <div className={`space-y-3 transition-colors ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <p><strong>Mục đích:</strong> {questionnaire.purpose || 'Chưa nhập'}</p>
                  <p><strong>Thời gian:</strong> {questionnaire.duration || 'Chưa nhập'}</p>
                  <p><strong>Gia đình:</strong> {questionnaire.family || 'Chưa nhập'}</p>
                  <p><strong>Tài chính:</strong> {questionnaire.financial || 'Chưa nhập'}</p>
                  <p><strong>Kế hoạch:</strong> {questionnaire.plans || 'Chưa nhập'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
