export interface ActionProps<T = any> {
    type: string;
    payload?: T;
}

export enum AUTH {
    SIGNIN = 'AUTH_SIGNIN',
    SIGNOUT = 'AUTH_SIGNOUT',
}

export enum SNACKBAR {
    SHOW_SNACKBAR = 'SHOW_SNACKBAR',
    HIDE_SNACKBAR = 'HIDE_SNACKBAR',
}

export enum THEME {
    DARK = 'THEME_DARK',
    LIGHT = 'THEME_LIGHT',
}

export enum LANG {
    EN = 'LANG_EN',
    RU = 'LANG_RU',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MAIN_INIT {
    GET_UP = 'MAIN_INIT/GET_USER_PERMISSIONS',
    SET_UP = 'MAIN_INIT/SET_USER_PERMISSIONS',
    SET_DR = 'MAIN_INIT/SET_DATE_RANGE',
    SET_AGG = 'MAIN_INIT/SET_AGG',
    SET_DIF = 'MAIN_INIT/SET_DIFFERENCE_MONTH',
    SET_DISABLE = 'MAIN_INIT/SET_DISABLE_LABELS',
    SET_IS_INIT = 'MAIN_INIT/SET_IS_INIT',
    SET_ESSENCE = 'MAIN_INIT/SET_ESSENCE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MAIN_CONSUMPTION {
    SET = 'MAIN_CONSUMPTION/SET',
    CLEAR = 'MAIN_CONSUMPTION/CLEAR',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MAIN_EFFICIENCY {
    SET = 'MAIN_EFFICIENCY/SET',
    CLEAR = 'MAIN_EFFICIENCY/CLEAR',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MAIN_HOURS {
    SET = 'MAIN_HOURS/SET',
    CLEAR = 'MAIN_HOURS/CLEAR',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MODEL {
    SET = 'MODEL/SET',
    CLEAR = 'MAIN_HOURS/CLEAR',
}
