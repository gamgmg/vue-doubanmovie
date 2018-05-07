import jsonp from "./jsonp"
import {URL, apikey} from "./config"

// 获取正在热映数据
export function getInTheatersData (params = {start: 0, count: 20, city: '广州'}) {
	const data = Object.assign({}, {
		start: params.start,
		count: params.count,
		city: params.city
	})
	return jsonp(URL.in_theaters, data)
}
// 获取即将上映数据
export function getComingSoonData (params = {start: 0, count: 20}) {
	const data = Object.assign({}, {
		start: params.start,
		count: params.count
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
	const data = Object.assign({}, {
		apikey,
		city: '广州'
	})
	return jsonp(URL.subject + '/' + id, data)
}

// 获取电影条目剧照
export function getMoviePhotosData (id) {
	const data = Object.assign({}, {
		apikey,
		city: '广州'
	})
	return jsonp(URL.subject + '/' + id + '/photos', data)
}