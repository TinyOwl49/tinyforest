import { marked, } from "marked";
import hljs from 'highlight.js';
// import DOMPurify from 'dompurify';

export function set_options() {
	marked.setOptions({
		pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
		// async: true, // 非同期でparse
		silent: true, // trueにするとパースに失敗してもExceptionを投げなくなる
		gfm: true, // GitHub Flavored Markdownを使用
		langPrefix: 'hljs language-',
		highlight: (code, lang) => {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	});
}
export function toHTML(content: string) {
	let html = marked.parse(content);
	// let clean = DOMPurify.sanitize(html);
	// return clean;
	return html
}
