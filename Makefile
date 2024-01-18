install:
	npm ci

lint:
	# npx stylelint ./src/styles/*.css
	npx stylelint ./src/styles/app.scss
	npx htmlhint ./src/*.html

style:
	sass --watch ./src/styles/app.scss:./src/styles/styles.css