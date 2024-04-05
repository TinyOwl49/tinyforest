---
layout: post
title:  "Jekyllでブログ作ってみた！"
date:   2024-04-03 23:34:07 +0900
categories: jekyll update
---

# はじめに
以前から自作ブログを作ってみたい！と思っていたのですが、お金がない+クラウド超初心者ということで、どうにか無料で簡単に自作ブログが作れないかと考えていました。  
そんな中、Github Pages + Jekyllを使うことで無料で自作ブログが作れる！という話を聞き、このサイトを作った所存です。  
## Jekyllって何?
[Jekyll][jekyll-docs]とは、Rubyで作られている静的サイトジェネレーター(SSG)です。ブログサイト制作に特化しており、そのための様々な機能が提供されています。
## クイックスタート
参考: [ドキュメント][jekyll-docs]


1. Ruby開発環境をフルでインストールします。
2. Jekyllとbundler gemsをインストールします。  
`gem install jekyll bundler`
3. /myblogに新しいJekyllサイトを作ります。  
`jekyll new myblog`
4. 新しいディレクトリに移動します。  
`cd myblog`
5. サイトを構築し、ローカルサーバ上に出現させます。  
`bundle exec jekyll serve`
6. http://localhost:4000 をブラウザで見てみましょう。

これだけでいい感じのブログサイトが出来上がりますね。

**新しい記事を作る**
1. _postsフォルダに`年-月-日-ブログタイトル.markdown`ファイルを作成します。
2. [Front Matter][jekyll-front-matter]を使用して、サイト情報を設定します。  
設定しないとhtmlに変換されないようです。
```yml
---
layout: post
title:  "Welcome to Jekyll!"
date:  2024-04-04 01:09:02 +0900
categories: jekyll update
---
```

あとはマークダウンで記事を書いて実行するだけです！ 

## Liquidや変数について 
{% raw %}
JekyllはマークダウンにLiquidという言語を使用していて、鉤括弧で囲むことでいくつかの特殊な構文が使用できます。  
例えば、  
{% if 条件 %} ... {% else %} ...   
とすることでif文が使えたり、{{ 変数 }}とすることで変数を埋めむことができます。  
便利ですね〜  
{% endraw %}  
詳しくは以下のドキュメントを参考にしてください。

[Liquid / Jekyll](https://jekyllrb-ja.github.io/docs/liquid/)  
[変数 / Jekyll](https://jekyllrb-ja.github.io/docs/variables/)

# 見た目をカスタマイズしよう
初期設定だけでも十分いい感じですが、レイアウトを色々カスタマイズすることで完全オリジナルのブログサイトを作ることができます。

### _layoutsフォルダ
新しくルートフォルダに`_layouts`フォルダを作成すると、レイアウトを変更できます。  

./_layouts/  
├── default.html   
├── home.html   
├── page.html   
└── post.html   

**default.html**  
全てのページで共有されるhtmlファイルです。サイト全体のレイアウトやOGP、ライブラリ等の設定はここで行います。
{% raw %}
```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>
		{% if page.title %}{{ page.title }} - {{ site.title }}{% else %}{{ site.title }}{% endif %}
	</title>
	<meta name="description"
		content="{% if page.desc %}{{ page.desc }}{% else %}{{ page.content | strip_html | truncate: 130 }}{% endif %}">

	<!-- OGP の設定 -->
	<meta property="og:title"
		content="{% if page.title %}{{ page.title }} - {{ site.title }}{% else %}{{ site.title }}{% endif %}" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="{{ site.url }}{{ page.url }}" />
	<meta property="og:site_name" content="{{ site.title }}" />
	<meta property="og:description"
		content="{% if page.desc %}{{ page.desc }}{% else %}{{ page.content | strip_html | truncate: 130 }}{% endif %}" />
	<meta property="og:image" content="{% if page.thumbnail %}{{ page.thumbnail }}{% else %}{{ "
		/assets/images/ogp-image.png" | absolute_url }}{% endif %}" />

	<!-- RSSフィード の指定 -->
	<link rel="alternate" type="application/rss+xml" title="{{ site.title }} RSS" href="{{ " /feed.xml" |
		absolute_url }}" />
	<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>

<body>
	{% include _header.html %}

	{{ content }}

	{% include _footer.html %}
</body>

</html>
```
{% endraw %}

**home.html**  
ホームのレイアウトを設定します。とりあえず記事一覧を表示しておきます。

{% raw %}
```html
---
layout: default
---
<!--Front Matterの設定 必ず必要です。-->

<main>
	<section>
		<header>
			<h2>投稿一覧</h2>
		</header>

		{% for post in site.posts %}
		<aside>
			<a href="{{ post.url }}">
				<h3>{{ post.title }}</h3>
				<p class="post-date">公開日: {{ post.date | date: "%Y年 %m月%d日" }}</p>
				<p class="post-preview">{% if post.desc %}{{ post.desc }}{% else %}{{ post.content | strip_html | truncate:
					130 }}{%
					endif %}</p>
			</a>
		</aside>
		{% endfor %}
	</section>
</main>
```
{% endraw %}

**post.html**  
投稿ページのレイアウトを設定します。  
{% raw %}
```html
---
layout: default
---
<!--Front Matterの設定 必ず必要です。-->

<main>
	<h1>{{ page.title }}</h1>
	<p>公開日: {{ page.date | date: "%Y年 %m月%d日" }}</p>
	<div>
		<article>
			{% if page.desc %}
			<h2>{{ page.desc }}</h2>
			{% endif %}
			<div>
				{{ content }}
			</div>
		</article>
	</div>
</main>
```
{% endraw %}

**page.html**  
Aboutなどの記事やホーム以外のページのレイアウトを設定します。
{% raw %}
```html
---
layout: default
---
<!--Front Matterの設定 必ず必要です。-->

<main>
	<div>
		{% if page.desc %}
		<h2>{{ page.desc }}</h2>
		{% endif %}

		<div>
			{{ content }}
		</div>
	</div>
</main>
```
{% endraw %}

### cssやjs
cssやjsのファイルは`assets/css`や`assets/js`に置いた後、default.htmlでそれらのファイルを読み込めばOKです。  
{% raw %}
```html
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
```
{% endraw %}

また、`_sass`フォルダ内のscssやsassファイルを、`assets/css`内のファイルから@importで読み込むことができます。

_sass内のファイルは@importする際に相対パス等を考慮する必要がないようです。  
(`_sass/layout.scss`を作成したら、`@import 'layout'`だけで読み込めます！)

# 感想
以前Djangoで練習用ブログを作った際には結構苦労したので、こんなに簡単に無料の自作ブログを作れることに驚きました。  
SSGなのでコメント機能などを実装することは難しいですが、工夫したらできそうな気もするのでいつかやってみたいです。  

今後はこのサイトを使って、興味のある数学やプログラミングのことを記事にできたらいいなと思っています。  
皆さんもぜひJekyllで自作ブログを作ってみてください！


[jekyll-docs]: https://jekyllrb-ja.github.io/
[jekyll-front-matter]: https://jekyllrb-ja.github.io/docs/front-matter/
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
