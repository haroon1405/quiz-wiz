import { QuizContext } from '../context/QuizContext'
import { useContext } from 'react'

export const useQuizContext = () => {
  const context = useContext(QuizContext)

  if (!context) {
    throw Error('useQuizContext must be used inside an QuizContextProvider')
  }

  return context
}