import type { CatalogVisa } from '../types'

export const visaTypes = [
  {
    code: 'HIGHSKILL',
    name: '高度専門職 (Highly Skilled Professional)',
    description: 'Dành cho chuyên gia có kỹ năng cao',
    requirements: ['Bằng đại học', 'Kinh nghiệm 3+ năm', 'JLPT N2+'],
    benefits: ['Thời hạn dài', 'Ưu đãi thuế', 'Đưa gia đình'],
    restrictions: ['Yêu cầu điểm cao', 'Chỉ định ngành nghề']
  },
  {
    code: 'ENGINEER',
    name: '技術・人文知識・国際業務 (Engineer/Specialist)',
    description: 'Dành cho kỹ sư và chuyên gia',
    requirements: ['Bằng đại học', 'Kinh nghiệm liên quan', 'JLPT N3+'],
    benefits: ['Thời hạn 3-5 năm', 'Có thể gia hạn', 'Linh hoạt công việc'],
    restrictions: ['Phải có công ty nhận', 'Không được thay đổi ngành']
  },
  {
    code: 'SSW',
    name: '特定技能 (Specified Skilled Worker)',
    description: 'Dành cho lao động kỹ năng',
    requirements: ['Chứng chỉ kỹ năng', 'JLPT N4+', 'Kinh nghiệm thực tế'],
    benefits: ['Thời hạn 5 năm', 'Có thể gia hạn', 'Đưa gia đình'],
    restrictions: ['Chỉ 14 ngành được phép', 'Phải thi chứng chỉ']
  }
]

export const catalog: CatalogVisa[] = [
  { 
    code: 'HIGHSKILL', 
    name: '高度専門職 (Highly Skilled Professional)', 
    category: 'Work', 
    summary: 'Dành cho chuyên gia điểm cao, ưu đãi lớn.', 
    requirements: ['ĐH trở lên', 'Điểm HSP đủ', 'Kinh nghiệm 3+ năm'], 
    durationYears: '1-5', 
    language: 'JLPT N2+', 
    dependents: true 
  },
  { 
    code: 'ENGINEER', 
    name: '技術・人文知識・国際業務 (Engineer/Specialist)', 
    category: 'Work', 
    summary: 'Visa lao động trí thức phổ biến.', 
    requirements: ['ĐH đúng chuyên ngành', 'Công ty nhận việc'], 
    durationYears: '1-5', 
    language: 'JLPT N3+', 
    dependents: true 
  },
  { 
    code: 'SSW', 
    name: '特定技能 (Specified Skilled Worker)', 
    category: 'Work', 
    summary: 'Kỹ năng đặc định 12/14 ngành.', 
    requirements: ['Thi kỹ năng', 'JLPT N4+'], 
    durationYears: 5, 
    language: 'JLPT N4+', 
    dependents: true 
  },
  { 
    code: 'STUDENT', 
    name: '留学 (Student)', 
    category: 'Study', 
    summary: 'Du học, trường tiếng/đại học.', 
    requirements: ['COE trường', 'Chứng minh tài chính'], 
    durationYears: '1-2', 
    language: 'Khuyến nghị N5+', 
    dependents: false 
  },
  { 
    code: 'SPOUSE', 
    name: '日本人の配偶者等 (Spouse of Japanese)', 
    category: 'Family', 
    summary: 'Vợ/chồng người Nhật.', 
    requirements: ['Giấy kết hôn', 'Chứng minh quan hệ'], 
    durationYears: '1-5', 
    language: 'Không bắt buộc', 
    dependents: true 
  }
]

export const nationalityData = {
  labels: ['VN', 'US', 'IN', 'PH', 'TH'],
  datasets: [{ 
    data: [45, 20, 15, 10, 10], 
    backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6'] 
  }]
}

export const approvalTrend = {
  labels: ['T1','T2','T3','T4','T5','T6'],
  datasets: [{ 
    label: 'Tỷ lệ đậu (%)', 
    data: [60,62,65,64,68,72], 
    borderColor: '#2563eb', 
    backgroundColor: 'rgba(37,99,235,0.2)' 
  }]
}
