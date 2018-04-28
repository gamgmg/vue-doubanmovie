const URL = {
	/*正在热映*/
	in_theaters: "https://api.douban.com/v2/movie/in_theaters",
	/*即将上映*/
	coming_soon: "https://api.douban.com/v2/movie/coming_soon",
	/*电影详情*/
	subject: "https://api.douban.com/v2/movie/subject",
	/*电影搜索*/
	search: "https://api.douban.com/v2/movie/search",
	/*Top250*/
	top250: "https://api.douban.com/v2/movie/top250",
	/*北美票房榜*/
	us_box: "https://api.douban.com/v2/movie/us_box",
	/*口碑榜*/
	weekly: "https://api.douban.com/v2/movie/weekly",
	/*新片榜*/
	new_movies: "https://api.douban.com/v2/movie/new_movies",
};

const PARAM = {
	format: "jsonp",
	inCharset: "utf-8",
	outCharset: "utf-8",
	notice: 0
};

const OPTION = {
	param: "jsonpCallback",
	prefix: "callback"
};

const CODE_SUCCESS = 0

export {URL, PARAM, OPTION, CODE_SUCCESS}