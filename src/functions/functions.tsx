import { colorThemes } from "./types";
import axios from "axios";

//QUIZ
export const correctPhrases = [
    'Well done', 'Good job', 'Keep going', 'Awesome', 'Genius'
 ]
 
export const wrongPhrases = [
    'Could be worse', 'Hard question anyway', 'Damn..', 'F'
 ]

export const quizArr = [
    {
       question:'E cabral negru',
       answer: 'Da awwwwwwwwdad',
    },
    {
       question:'Ronaldoo ce facusi',
       answer: 'Pierdui',
    },
    {
       question:'Juguule',
       answer: 'pichinez chichinez',
    },
    {
       question:'aheha gasper awda wdaw dhawh dhawh dhjaw hjdajhw dhjawhj dhjadh jwhjd hj dahwhdk ahwkdh kawhk dhk awdddddddddddaw daw d a gasper awda wdaw dhawh dhawh dhjaw hjdajhw dhjawhj dhjadh jwhjd hj dahwhdk ahwkdh kawhk dhk awdddddddddddaw daw d a gasper awda wdaw dhawh dhawh dhjaw hjdajhw dhjawhj dhjadh jwhjd hj dahwhdk ahwkdh kawhk dhk awdddddddddddaw daw d a',
       answer: 'gasper awda wdaw dhawh dhawh dhjaw hjdajhw dhjawhj dhjadh jwhjd hj dahwhdk ahwkdh kawhk dhk awdddddddddddaw daw d a',
    },
 ]


//THEMES
 const colorThemesValues = {
    DARK: {
        'ff-body': null,
        'ff-logo': null,
        "ff-accent": null,
        'primary-background': '#121212',
        'background-contrast': '#1C1C1C',
        'primary-color': '#90564358',
        'accent-color': '#D09683',
        'btn-hover': '#d09683cb',
        'primary-text': '#FFFFFF',
        'secondary-text': '#FFFFFF80',
    },
    LIGHT: {
        'ff-body': null,
        'ff-logo': null,
        "ff-accent": null,
        'primary-background': '#FFFFFF',
        'background-contrast': 'rgb(120, 120, 120)',
        'primary-color': '#000',
        'accent-color': '#D09683',
        'btn-hover': '#d09683cb',
        'primary-text': '#000',
        'secondary-text': '#FFFFFF80',
    },
}

export function setBackground(id: number) {
    const accountElement = document?.getElementById('account');
    
    if(id === 0) {
        accountElement!.style.background = '#121212'
        saveToLocal('backgroundId', JSON.stringify(id));
        return 
    }

    accountElement!.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImages[id]}) no-repeat`;
    accountElement!.style.backgroundSize = 'cover'
    accountElement!.style.backgroundAttachment = 'fixed'

    saveToLocal('backgroundId', JSON.stringify(id));
}

export function setDarkMode(mode: colorThemes) {
    const root = document.documentElement;

    const data = Object.entries(colorThemesValues[mode]);
    data.forEach((property: any) => {
        let key = property[0], value = property[1];
        if(!value) return

        root.style.setProperty(
            `--${key}`, value
        )
    })
    
}

export const backgroundImages = [
    'DEFAULT',
    getFromLocal('customBackground'),
    'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]

export function togglePopup(message: string, state: "SUCCESS" | 'WARNING' | 'ERROR') {
    const title = document.getElementById('popup-title')
    const popup = document.getElementById('popup')
    popup?.removeAttribute('class');
    popup?.classList.add('popup')

    title!.innerText = message;
    if(state === 'SUCCESS') {
        popup?.classList.add('popup-success')
    }else if(state === 'ERROR') {
        popup?.classList.add('popup-error')
    }else {
        popup?.classList.add('popup-warning')
    }

    
    popup?.classList.add('popup-active')
    setTimeout(() => {

        popup?.classList.remove('popup-active')
    }, 3000);

}


//STORAGE
export function saveToLocal(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
}
export function getFromLocal(name: string) {
    return JSON.parse(localStorage.getItem(name)!);
}

export function saveToSession(name: string, data: any) {
    sessionStorage.setItem(name, JSON.stringify(data))
}

export function getFromSession(name: string) {
    return JSON.parse(sessionStorage.getItem(name)!)
}

export function encodeAndSave(key: string, token: string) {
    saveToLocal(
        key, window.btoa(token)
    )
}

export function decodeAndRetrieve(token: string) {
    return window.atob(getFromLocal(token) || '')
 }


export function formatDate(date: Date) {
    const minutes = date.getMinutes(),
     hours = date.getHours(),
     day = date.getDate(),
     month = date.getMonth(),
     year = date.getFullYear()

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ]

    function dmhmy() {
        return `${day.toString().padStart(2, '0')} ${months[month]} ${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    return {
        day, month, year, hours, minutes, dmhmy
    }
}


// API & utils
export async function callFormApi(options: any) {
    return axios.request(options)
} 

export function formValidation(username: string, password: string, email: string): string[] {
    let errors = [];
    console.log('a');
    
    
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.push("Email not valid");
    }
    
    if(password.length < 8) {
        errors.push('Password too weak')
    }

    if(username.length < 3) {    
       errors.push('Username too short')
    }
    
    return errors;
 }

//animation 
export const STAGGER_DURATION = 100;

export const slideAnimate = {
    translateY: '0%',
    scale: 1,
    opacity:1,
    transition: {
       duration: .05
    }
}

export const slideInitial = {
    translateY: '100%',
    opacity: 0,
    scale: 0,
}

export const slowSlideInitial = {
    translateY: '100%',
}

export const slowSlideAniamte = {
    translateY: '0%',
    transition: {
        duration: .3,
    },
}


// practice
export const practiceQuestions = [
    {
        question: 'O kurwa daca iti iei',
        answer: 'sa o ti in locul ei',
    },
    {
        question: 'Ii dau cu pula pe tate si ii place, vai ce ma satisface',
        answer: 'gulie',
    },
    {
        question: '210 production pe beat',
        answer: 'ma drogez, bag splif la vena si dansez',
    },
]


//account
export const colors = [
    {
       colorName: 'Gray',
       colorHex: '#1C1C1C',
    },
    {
       colorName: 'Yellow',
       colorHex: '#E8DC87',
    },
    {
       colorName: 'Green',
       colorHex: '#81DE9B',
    },
    {
       colorName: 'Purple',
       colorHex: '#C287E8',
    },
    {
       colorName: 'Blue',
       colorHex: '#92CDDF',
    },
    {
       colorName: 'Orange',
       colorHex: '#E8BF48',
    },
    {
       colorName: 'Mint',
       colorHex: '#92E0B3',
    },
    {
       colorName: 'Dark blue',
       colorHex: '#2C7185',
    },
    {
       colorName: 'Pink',
       colorHex: '#7858A6',
    },
    {
       colorName: 'Earth',
       colorHex: '#704F4F',
    },
     {
       colorName: 'Clay',
       colorHex: '#A13333',
    },
 ]