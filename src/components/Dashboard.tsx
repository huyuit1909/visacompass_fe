import { useDarkMode } from '../hooks/useDarkMode'
import { Pie, Line } from 'react-chartjs-2'
import { nationalityData, approvalTrend } from '../utils/mockData'

export function Dashboard() {
  const { isDarkMode } = useDarkMode()

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151'
        }
      }
    }
  }

  const pieOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: 'bottom' as const
      }
    }
  }

  const lineOptions = {
    ...chartOptions,
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb'
        }
      },
      y: {
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb'
        }
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Dashboard</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Thống kê và phân tích visa</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-lg p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Phân bố quốc tịch</h3>
          <div className="h-64">
            <Pie data={nationalityData} options={pieOptions} />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className={`transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Việt Nam</span>
              <span className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={`transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Hoa Kỳ</span>
              <span className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>20%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={`transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Ấn Độ</span>
              <span className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>15%</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-6 transition-colors ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Xu hướng tỷ lệ đậu</h3>
          <div className="h-64">
            <Line data={approvalTrend} options={lineOptions} />
          </div>
          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900">
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              📈 Tỷ lệ đậu visa đang có xu hướng tăng dần qua các tháng
            </p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-semibold mb-6 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Thống kê tổng quan</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className={`text-center p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Tổng số hồ sơ</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
            <div className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Tỷ lệ đậu</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-3xl font-bold text-orange-600 mb-2">21</div>
            <div className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Ngày xử lý TB</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Loại visa chính</div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-semibold mb-6 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Phân tích theo loại visa</h3>
        
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div>
              <h4 className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Highly Skilled Professional</h4>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Visa kỹ năng cao</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>85%</div>
              <div className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Tỷ lệ đậu</div>
            </div>
          </div>
          
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div>
              <h4 className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Engineer/Specialist</h4>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Visa kỹ sư</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>72%</div>
              <div className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Tỷ lệ đậu</div>
            </div>
          </div>
          
          <div className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div>
              <h4 className={`font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Specified Skilled Worker</h4>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Visa kỹ năng đặc định</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>65%</div>
              <div className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Tỷ lệ đậu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
