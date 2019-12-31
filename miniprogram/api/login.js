
import { request } from '../util/request.js'

export function goLogin(data) {
	return request({
		url: '/login',
		data
	})
}
