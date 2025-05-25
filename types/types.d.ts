export interface ConfigType {
    cutTime: number
    keyWord: string
    email: string
    excludeWord: string
}

enum logType {
    img = 1,
    ocr = 2,
    video = 3,
    email = 4
}

export interface StoreLogType {
    logType: logType
    content: string
    eventTime?: string
    data?: string
}