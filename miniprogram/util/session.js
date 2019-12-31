const SESSION_KEY = 'user';
export function getSessionData() {
    return wx.getStorageSync(SESSION_KEY) || null
}

export function setSessionData(session) {
    wx.setStorageSync(SESSION_KEY, session)
}

export function clearSessionData() {
    wx.removeStorageSync(SESSION_KEY)
}
