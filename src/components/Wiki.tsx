import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { CatalogVisa } from '../types'
import { catalog } from '../utils/mockData'

export function Wiki() {
  const { isDarkMode } = useDarkMode()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVisas, setSelectedVisas] = useState<string[]>([])

  const filteredCatalog = catalog.filter(visa => {
    const matchesSearch = visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || visa.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleVisaSelection = (code: string) => {
    setSelectedVisas(prev => 
      prev.includes(code) 
        ? prev.filter(v => v !== code)
        : prev.length < 2 
          ? [...prev, code] 
          : prev
    )
  }

  const selectedVisaData = selectedVisas.map(code => 
    catalog.find(v => v.code === code)
  ).filter(Boolean) as CatalogVisa[]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Visa Wiki</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Khám phá tất cả các loại visa Nhật Bản</p>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm visa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">Tất cả danh mục</option>
          <option value="Work">Công việc</option>
          <option value="Study">Du học</option>
          <option value="Family">Gia đình</option>
          <option value="Other">Khác</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            {filteredCatalog.map(visa => (
              <div key={visa.code} className={`rounded-xl shadow-lg p-6 transition-colors ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{visa.name}</h3>
                    <p className={`text-sm mb-3 transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{visa.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>{visa.category}</span>
                      <span className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>{visa.durationYears} năm</span>
                      <span className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
                      }`}>{visa.language}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleVisaSelection(visa.code)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedVisas.includes(visa.code)
                        ? 'bg-blue-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedVisas.includes(visa.code) ? 'Đã chọn' : 'Chọn so sánh'}
                  </button>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className={`font-semibold mb-2 transition-colors ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Yêu cầu cơ bản</h4>
                  <ul className="space-y-1">
                    {visa.requirements.map((req, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className={`rounded-xl shadow-lg p-6 sticky top-6 transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>So sánh visa</h3>
            
            {selectedVisas.length === 0 ? (
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Chọn 2 visa để so sánh</p>
            ) : selectedVisas.length === 1 ? (
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Chọn thêm 1 visa để so sánh</p>
            ) : (
              <div className="space-y-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b transition-colors ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <th className={`text-left py-2 transition-colors ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Tiêu chí</th>
                      {selectedVisaData.map(visa => (
                        <th key={visa.code} className={`text-left py-2 transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{visa.code}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr>
                      <td className={`py-2 font-medium transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Danh mục</td>
                      {selectedVisaData.map(visa => (
                        <td key={visa.code} className={`py-2 transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{visa.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className={`py-2 font-medium transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Thời hạn</td>
                      {selectedVisaData.map(visa => (
                        <td key={visa.code} className={`py-2 transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{visa.durationYears} năm</td>
                      ))}
                    </tr>
                    <tr>
                      <td className={`py-2 font-medium transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Tiếng Nhật</td>
                      {selectedVisaData.map(visa => (
                        <td key={visa.code} className={`py-2 transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{visa.language}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className={`py-2 font-medium transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Đưa gia đình</td>
                      {selectedVisaData.map(visa => (
                        <td key={visa.code} className={`py-2 transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{visa.dependents ? 'Có' : 'Không'}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                
                <button
                  onClick={() => setSelectedVisas([])}
                  className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                  Xóa so sánh
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
