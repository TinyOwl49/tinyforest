// 目次作成
function generateToc() {
	const targetArea = document.querySelector("article");
	if (targetArea === null || !document.querySelector('#toc')) {
		return;
	}
	let viewOutline = "";
	let topIndent = 0;
	let beforeIndent = 0;
	const headers = targetArea.querySelectorAll("h1, h2, h3, h4");
	headers.forEach((header, index) => {
		const indent = parseInt(header.tagName.toLowerCase().match(/h(\d+)/)[1]);

		header.setAttribute("id", "toc_" + index);
		if (topIndent === 0 || topIndent > indent) {
			topIndent = indent;
		}

		if (beforeIndent !== indent) {
			if (beforeIndent < indent) {
				viewOutline += '<ul class="toc-ul">\n';
			} else if (beforeIndent > indent) {
				for (let i = indent; i < beforeIndent; i++) {
					viewOutline += "</ul>\n";
					viewOutline += "</li>\n";
				}
			} else {
				viewOutline += "</li>\n";
			}
		}

		viewOutline += (
			'<li class="indent' + String(indent - topIndent) + '">' +
			'<a class="toc-link" href="#' + header.id + '">' + header.textContent + "</a>"
		);

		beforeIndent = indent;


	})

	if (viewOutline !== "") {
		if (document.querySelector("#toc") === null) {
			const toc = document.createElement("div");
			toc.id = "toc";
			targetArea.prepend(toc);
		}

		toc.innerHTML = (viewOutline);
	}
}


window.addEventListener('DOMContentLoaded', () => {
	generateToc();
})

