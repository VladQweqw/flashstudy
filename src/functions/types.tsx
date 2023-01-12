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

export type groupElementArray = groupElementType[]
export type groupType = {
   message: string,
   data: groupElementArray
}


export type groupElementType = {
   createdAt: string | null,
   deletedAt: string | null,
   ID: number,
   UpdatedAt: string | null,
   User: {
      ID: number,
      createdAt: string | null,
      UpdatedAt: string | null,
      deletedAt: string | null,
      email: string,
      username: string,
      password: string,
   },
   userId: number,
   color: string,
   description: string,
   isLiked: boolean,
   isPublic: boolean,
   likes: number,
   name: string
}
