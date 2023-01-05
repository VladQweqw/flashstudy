import { formErrors } from "./types";
import { colorThemes } from "./types";
import axios from "axios";

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

export const backgroundImages = [
    'DEFAULT_IMAGE',
    'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

export function saveToLocal(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function getFromLocal(name: string) {
    return JSON.parse(localStorage.getItem(name)!);
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

export function setBackground(id: number) {
    const accountElement = document?.getElementById('account');
    if(!accountElement) return    
    
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


export async function callFormApi(options: any) {    
    console.log('started');
    
    return axios.request(options)
} 

export function formValidation(username: string, password: string, email: string): string[] {
    let errors = [];

    
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.push("Email not valid");
    }

    if(username.length < 3) {    
       errors.push('Username too short')
    }
    
    return errors;
 }


export function encodeAndSave(key: string, token: string) {
    saveToLocal(
        key, window.btoa(token)
    )
 }

 export function decodeAndRetrieve(token: string) {
    return window.atob(getFromLocal(token) || '')
 }