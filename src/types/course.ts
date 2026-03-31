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

export interface CourseChapter {
  id: string
  order: number
  title: string
  subtitle: string
  duration: string
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
