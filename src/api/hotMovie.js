import jsonp from "./jsonp"
import {URL} from "./config"

// 获取正在热映数据
export function getInTheatersData (start = 0, count = 20) {
	const data = Object.assign({}, {
		start,
		count
	})
	return jsonp(URL.in_theaters, data)
}
// 获取即将上映数据
export function getComingSoonData (start = 0, count = 20) {
	const data = Object.assign({}, {
		start,
		count
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