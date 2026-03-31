export type AppView = 'overview' | 'chapter' | 'resources'

export interface CodeBlock {
  title?: string
  lang: string
  content: string
}

export interface CourseDocSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
  code?: CodeBlock[]
}

export interface CourseExercise {
  id: string
  title: string
  intro: string
  files: string[]
  steps: string[]
  verify: string[]
}

// 学习阶段
export type LearningPhase = 'foundations' | 'core' | 'architecture' | 'production'

export interface LearningPhaseMeta {
  id: LearningPhase
  title: string
  focus: string
  description: string
  chapterRange: string
}

export interface CourseChapter {
  id: string
  order: number
  title: string
  subtitle: string
  duration: string
  phase: LearningPhase
  summary: string
  goals: string[]
  outcomes: string[]
  starterSteps: string[]
  docs: CourseDocSection[]
  exercises: CourseExercise[]
  milestone: string
}

export interface LearningResource {
  type: string
  name: string
  note: string
  link: string
}

// 测验题型
export type QuizQuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'true-false'
  | 'code-output'

// 单个测验题
export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  question: string
  codeSnippet?: string
  options: string[]
  correctAnswer: number | number[]
  explanation: string
}

// 章节测验
export interface ChapterQuiz {
  chapterId: string
  questions: QuizQuestion[]
  passingScore: number
}

// 测验结果
export interface QuizResult {
  score: number
  answers: Record<string, number | number[]>
  completedAt: string
}
