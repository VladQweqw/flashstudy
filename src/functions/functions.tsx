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