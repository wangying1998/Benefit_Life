
import { request } from '../utils/request.js'

export function goLogin(data) {
	return request({
		url: '/login',
		data
	})
}
