import jsonp from "./jsonp"
import {URL, apikey} from "./config"

// 获取Top250
export function getTop250Data (start = 0, count = 10) {
	const data = Object.assign({}, {
		apikey,
		start,
		count
	})
	return jsonp(URL.top250, data)
}
// 获取北美票房榜
export function getUsBoxData () {
	const data = Object.assign({}, {
		apikey
	})
	return jsonp(URL.us_box, data)
}
// 获取口碑榜
export function getWeeklyData () {
	const data = Object.assign({}, {
		apikey
	})
	return jsonp(URL.weekly, data)
}
// 获取新片榜
export function getNewMoviesData () {
	const data = Object.assign({}, {
		apikey
	})
	return jsonp(URL.new_movies, data)
}