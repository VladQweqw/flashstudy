export type colorThemes = 'DARK'| 'LIGHT'

export type response = {
    message: string,
    isSucces: boolean,
    errors: string[],
    expireDate: string | null
 }
 
 export type formErrors = {
    pass: boolean,
    errors: string[]
 }
 
 export type questionType = {
   answer: string,
   isCorrect: boolean,
}

export interface practiceQuestion {
   question: string,
   answer: string,
}