import jsonp from "./jsonp"
import {URL} from "./config"

// 获取Top250
export function getTop250Data (start = 0, count = 10) {
	const data = Object.assign({}, {
		start,
		count
	})
	return jsonp(URL.top250, data)
}
// 获取北美票房榜
export function getUsBoxData () {
	return jsonp(URL.us_box)
}
// 获取口碑榜
export function getWeeklyData () {
	return jsonp(URL.weekly)
}
// 获取新片榜
export function getNewMoviesData () {
	return jsonp(URL.new_movies)
}