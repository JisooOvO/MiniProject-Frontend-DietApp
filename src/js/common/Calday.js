export function CalToday () {
    return new Date().toISOString().slice(0,10).replaceAll("-","");
}

export function CalYesterday(date) {
    const dateFormat = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
    return new Date(new Date(dateFormat) - 86400000).toISOString().slice(0,10).replaceAll("-","");
}

export function CalTomorrow(date) {
    const dateFormat = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
    return new Date(+new Date(dateFormat) + +86400000).toISOString().slice(0,10).replaceAll("-",""); 
}