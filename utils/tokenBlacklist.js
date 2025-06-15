const blackList = new Set()

export function blacklistToken(token){
    blackList.add(token)
}

export function isTokenBlacklisted(token){
    return blackList.has(token)
}