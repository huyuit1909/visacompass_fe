import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
	vi: {
		translation: {
			app: {
				title: 'Visa Nhật Bản',
				desc: 'Chia sẻ thông tin các loại visa tại Nhật Bản',
			},
			nav: {
				home: 'AI Recommender',
				checklist: 'Dynamic Checklist',
				wiki: 'Visa Wiki',
				forms: 'Form Builder',
				upload: 'Document Check',
				timeline: 'Timeline',
				dashboard: 'Dashboard',
			},
			home: {
				heroTitle: 'Khám phá các loại Visa Nhật Bản',
				heroDesc: 'Thông tin rõ ràng, đa ngôn ngữ, giao diện siêu hiện đại.',
				cta: 'Bắt đầu khám phá',
			},
			about: {
				title: 'Về dự án',
				desc: 'Cung cấp kiến thức cơ bản, điều kiện và tài liệu cho từng loại visa.',
			},
			visa: {
				listTitle: 'Các loại Visa',
				readMore: 'Xem chi tiết',
			},
		},
	},
	ja: {
		translation: {
			app: {
				title: '日本のビザ',
				desc: '日本の各種ビザ情報を共有',
			},
			nav: {
				home: 'AI レコメンダー',
				checklist: '動的チェックリスト',
				wiki: 'ビザWiki',
				forms: 'フォームビルダー',
				upload: '書類チェック',
				timeline: 'タイムライン',
				dashboard: 'ダッシュボード',
			},
			home: {
				heroTitle: '日本の各種ビザを探検',
				heroDesc: '分かりやすい、多言語、超モダンなUI。',
				cta: 'はじめる',
			},
			about: {
				title: '本プロジェクトについて',
				desc: '各ビザの基本、条件、必要書類をまとめます。',
			},
			visa: {
				listTitle: 'ビザの種類',
				readMore: '詳細を見る',
			},
		},
	},
	en: {
		translation: {
			app: {
				title: 'Japan Visas',
				desc: 'Share information about Japanese visa types',
			},
			nav: {
				home: 'AI Recommender',
				checklist: 'Dynamic Checklist',
				wiki: 'Visa Wiki',
				forms: 'Form Builder',
				upload: 'Document Check',
				timeline: 'Timeline',
				dashboard: 'Dashboard',
			},
			home: {
				heroTitle: 'Explore Japanese Visa Types',
				heroDesc: 'Clear info, multilingual, ultra-modern UI.',
				cta: 'Start exploring',
			},
			about: {
				title: 'About the project',
				desc: 'Basics, requirements and documents for each visa.',
			},
			visa: {
				listTitle: 'Visa Types',
				readMore: 'Read more',
			},
		},
	},
} as const

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'vi',
		interpolation: { escapeValue: false },
		detection: {
			order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
	})

export default i18n


