import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { UploadedFile } from '../types'

export function DocumentCheck() {
  const { isDarkMode } = useDarkMode()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [analysis, setAnalysis] = useState<string[]>([])
  const [status, setStatus] = useState<'idle'|'good'|'missing'|'errors'>('idle')

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (!f) return
    const list: UploadedFile[] = Array.from(f).map(x=>({ id: crypto.randomUUID(), name: x.name, size: x.size, type: x.type }))
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Document Upload & Check</h1>
        <p className={`text-lg transition-colors ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Tải lên và kiểm tra hồ sơ visa</p>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Tải lên tài liệu</h2>
        
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <input 
            type="file" 
            multiple 
            onChange={onUpload} 
            className="hidden" 
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="cursor-pointer"
          >
            <div className="text-6xl mb-4">📁</div>
            <p className={`text-lg font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Click để chọn file hoặc kéo thả vào đây</p>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Hỗ trợ: PDF, JPG, PNG, DOC, DOCX</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <h3 className={`font-semibold mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Đã tải lên ({files.length} files)</h3>
            <div className="space-y-3">
              {files.map(f => (
                <div key={f.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <p className={`font-medium transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{f.name}</p>
                      <p className={`text-sm transition-colors ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{f.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium transition-colors ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>{(f.size/1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={runCheck} 
          disabled={files.length === 0} 
          className={`mt-6 w-full px-6 py-3 rounded-lg font-medium transition-colors ${
            files.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          Phân tích hồ sơ
        </button>
      </div>

      {status !== 'idle' && (
        <div className={`rounded-xl shadow-lg p-6 transition-colors ${
          status === 'good' 
            ? isDarkMode ? 'bg-green-900 border border-green-700' : 'bg-green-50 border border-green-200'
            : isDarkMode ? 'bg-yellow-900 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`text-2xl ${
              status === 'good' ? 'text-green-500' : 'text-yellow-500'
            }`}>
              {status === 'good' ? '✅' : '⚠️'}
            </div>
            <h3 className={`text-xl font-semibold transition-colors ${
              status === 'good' 
                ? isDarkMode ? 'text-green-200' : 'text-green-800'
                : isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
            }`}>
              {status === 'good' ? 'Hồ sơ đầy đủ!' : 'Cần bổ sung'}
            </h3>
          </div>
          
          <div className={`transition-colors ${
            status === 'good' 
              ? isDarkMode ? 'text-green-100' : 'text-green-700'
              : isDarkMode ? 'text-yellow-100' : 'text-yellow-700'
          }`}>
            <ul className="space-y-2">
              {analysis.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {status === 'good' && (
            <div className={`mt-4 p-3 rounded-lg transition-colors ${
              isDarkMode ? 'bg-green-800' : 'bg-green-100'
            }`}>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-green-200' : 'text-green-800'
              }`}>
                🎉 Hồ sơ của bạn đã sẵn sàng để nộp! Tỷ lệ đậu dự kiến: 85%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
