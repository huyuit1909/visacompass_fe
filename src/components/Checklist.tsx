import { useState } from 'react'
import type { ChecklistItem } from '../types'
import { useDarkMode } from '../hooks/useDarkMode'

export function Checklist() {
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
  )
}
