// Visa Profile Types
export interface VisaProfile {
  nationality: string
  age: number
  gender: string
  maritalStatus: string
  education: string
  workExperience: string
  industry: string
  japaneseLevel: string
  hasJobOffer: boolean
  hasRelatives: boolean
}

export interface VisaRecommendation {
  visaType: string
  matchPercentage: number
  requirements: string[]
  steps: string[]
  description: string
  code: string
}

export interface ChecklistItem {
  id: string
  title: string
  description: string
  isCompleted: boolean
  notes: string
  category: string
}

export interface CatalogVisa {
  code: string
  name: string
  category: 'Work' | 'Study' | 'Family' | 'Other'
  summary: string
  requirements: string[]
  durationYears: number | string
  language: string
  dependents: boolean
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

export interface TimelineMilestone {
  label: string
  date: string
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
    label?: string
  }>
}
