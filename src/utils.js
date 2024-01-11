export function formatDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return `${year}-${month.toLocaleString('en-GB', {
        minimumIntegerDigits: 2, useGrouping: false})}-${day.toLocaleString('en-GB', {
            minimumIntegerDigits: 2, useGrouping: false})} ${hours.toLocaleString('en-GB', {
                minimumIntegerDigits: 2, useGrouping: false})}:${minutes.toLocaleString('en-GB', {
                    minimumIntegerDigits: 2, useGrouping: false})}:${seconds.toLocaleString('en-GB', {
                        minimumIntegerDigits: 2, useGrouping: false})}`

}


export function geneateArticleCoverName () {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milisec = date.getMilliseconds()
    
    return `${year}${month}${day}${hours}${minutes}${seconds}${milisec}`
    
}

export function checkTitleLenght (title) {

    if (title.length > 55) {
        return true
    } else {
        return false
    }
}

export function checkBodyLenght (body) {
    if (body.length >= 300) {
        return true
    } else {
        return false
    }
}


export function articleValuesChanged (title, body, initialTitle, initialBody) {
            
    const updatedArticle = {}
    
    if (title!==initialTitle) {
        updatedArticle.title = title;
    }

    if (body!==initialBody) {
        updatedArticle.body = body
    }

    return updatedArticle

}

export default null