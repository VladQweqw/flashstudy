import { colorThemes } from "./types";

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
    const accountElement = document.getElementById('account');    
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

  export function togglePopup(message: string, state: "SUCCESS" | 'WARNING' | 'ERROR') {
    const title = document.getElementById('popup-title')
    const popup = document.getElementById('popup')
    console.log(title, popup);
    
    title!.innerText = message;
    if(state === 'SUCCESS') {
        popup?.classList.add('popup-success')
    }else if(state === 'ERROR') {
        popup?.classList.add('popup-error')
    }else {
        popup?.classList.add('popup-warning')
    }
    console.log('a');
    
    popup?.classList.add('popup-active')
    setTimeout(() => {

        popup?.classList.remove('popup-active')
    }, 3000);

}