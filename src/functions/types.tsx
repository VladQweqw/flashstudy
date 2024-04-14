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

//stats

export interface chartDataType {
   labels: string[],
   datasets: {label: string, data: number[], backgroundColor: string[], borderColor: string[]}[],
}

export interface chartOptionsType {
   maintainAspectRatio : boolean,
   plugins: any
}

// cards

export type groupElementArray = groupElementType[]

export type groupType = {
   message: string,
   data: groupElementArray | any
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


export type cardType = {
   item: any
   CreatedAt: string | null,
   DeletedAt: string | null,
   UpdatedAt: string | null,
   Group: groupType,
   GroupId: number,
   ID: number,
   answer: string,
   image: string,
   question: string,
   tags: string[]
}

export type noteType = {
   CreatedAt: string | null,
   DeletedAt: string | null,
   UpdatedAt: string | null,
   Group: groupType,
   GroupId: number,
   ID: number,
   title: string,
   text: string,
   userId: number,
}


export type slideCategories = string | 'card' | 'exam' | 'note';

// contextMenu
export type contextMenuType = {
   x: number, 
   y: number, 
   id: number | null
}

//API
export type MethodsType = 'POST' | 'GET' | 'PUT' | 'DELETE';

interface APIParams {
   [key: string]: any;
 }

export type APIdefaultTypes = {
   method: MethodsType,
   url: string,
   params: APIParams,
   data: any,
   headers: any
}
