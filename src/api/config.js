const URL = {
	/*正在热映*/
	in_theaters: "https://api.douban.com/v2/movie/in_theaters",
	/*即将上映*/
	coming_soon: "https://api.douban.com/v2/movie/coming_soon",
	/*电影详情*/
	subject: "https://api.douban.com/v2/movie/subject",
	/*电影搜索*/
	search: "https://api.douban.com/v2/movie/search",
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