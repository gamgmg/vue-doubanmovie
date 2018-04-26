import jsonp from "./jsonp"
import {URL} from "./config"

// 获取正在热映数据
export function getInTheatersData (params = {}) {
	params.start = 0
	params.count = 20
	params.city = '广州'
	const data = Object.assign({}, {
		start: params.start,
		count: params.count,
		city: params.city
	})
	return jsonp(URL.in_theaters, data)
}
// 获取即将上映数据
export function getComingSoonData (params = {}) {
	params.start = 0
	params.count = 20
	params.city = '广州'
	const data = Object.assign({}, {
		start: params.start,
		count: params.count,
		city: params.city
	})
	return jsonp(URL.coming_soon, data)
}
// 获取电影搜索数据
export function getSearchData (q = '', start = 0, count = 20) {
	const data = Object.assign({}, {
		q,
		start,
		count
	})
	return jsonp(URL.search, data)
}

// 获取电影详情
export function getSubjectData (id) {
	return jsonp(URL.subject + '/' + id)
}