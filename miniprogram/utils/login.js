import {
  goLogin
} from '../api/login'
import {
  getSessionData,
  setSessionData
} from './session'

/**
 * 获取code码并登录
 * @return {Promise}
 */
export function handleLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
				// 拿到code
        if (res && res.code) {
          // const data = {
          //   code: res.code
          // }
          // 云开发 自动验证了 不用自己去验证
          
          goLogin().then(response => {
            console.log("登陆接口的调用返回",response); //别注释掉了
            const sessionData = {
              userId: response.data._id || response.data[0]._id,
              openId: response.openId || response.data[0].openId
            }
            setSessionData({ ...getSessionData(),
              ...sessionData
            })
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }
      },
      fail: res => {
        reject(res)
      }
    })
  })
}