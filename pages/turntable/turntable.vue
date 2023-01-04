<template>
	<view>
		<div id='pixi'></div>
	</view>
</template>

<script>
	export default {
		props: ['menu'],
		data() {
			return {
				app: null,
				container: null,
				winW: 0,
			}
		},
		mounted() {
			this.initPixi()
		},

		methods: {

			initPixi() {
				let type = "WebGL"
				if (!PIXI.utils.isWebGLSupported()) {
					type = "canvas"
				}

				PIXI.utils.sayHello(type)
				this.app = new PIXI.Application({
					width: 456, // default: 800
					height: 456, // default: 600
					antialias: true, // default: false
					backgroundAlpha: false, // default: false
					resolution: 1,
				})
				document.getElementById("pixi").appendChild(this.app.view);

				this.container = new PIXI.Container()
				this.app.stage.addChild(this.container)

				let sprite = PIXI.Sprite.from('/static/turnbg3.png');
				this.winW = document.body.clientWidth

				sprite.width = this.winW
				sprite.height = this.winW

				this.container.addChild(sprite);
				this.container.x = this.winW / 2;
				this.container.y = 250;
				this.container.pivot.x = this.container.width / 2
				this.container.pivot.y = this.container.width / 2

				let spritePointer = PIXI.Sprite.from('/static/pointer1.png');

				spritePointer.width = 75
				spritePointer.height = 100
				spritePointer.x = this.winW / 2 - 37
				spritePointer.y = 186

				this.app.stage.addChild(spritePointer);

			},
			rorate() {
				let angle = Math.floor(this.container.angle + Math.random() * 1000)

				let currentAngle = (angle - 45) % 360

				let index = 9 - (Math.floor(currentAngle / 45) == 0 ? 8 : Math.floor(currentAngle / 45))

				let singleAngle = (angle % 360)
				let toatlAngle = angle - (angle % 45) - 45 > 0 ? angle - (angle % 45) - 45 : 0

				// Listen for animate update

				console.log('index', index, angle, currentAngle, this.container.angle, toatlAngle)

				this.app.ticker.add((delta) => {
					if (this.container.angle < toatlAngle) {
						this.container.angle = this.container.angle >= toatlAngle ? toatlAngle : (this.container
							.angle + 3 * delta)
						// setTimeout(() => {
						// 	let msg = '今日菜单：'
						// 	if (index > this.menu.length) {
						// 		msg += '西北风'
						// 	} else {
						// 		msg += '' + this.menu[index - 1].dishName
						// 	}
						// 	this.currentMenu(msg)
						// }, 30 * delta)
					}
				});
				let msg = '今日菜单：'
				if (index > this.menu.length) {
					msg += '西北风'
				} else {
					msg += '' + this.menu[index - 1].dishName
				}
				setTimeout(() => {
					this.currentMenu(msg)
				}, 4000)

			},
			currentMenu(msg) {
				console.log('this.app', this.app.stage.children)
				this.app.stage.children.clear()
				let menuTriangle = new PIXI.Graphics();
				menuTriangle.width = this.winW
				menuTriangle.height = this.winW
				menuTriangle.x = 10
				menuTriangle.y = 0
				let style = new PIXI.TextStyle({
					fontFamily: 'Arial',
					fontSize: 12,
					fill: '#ff5400',
					lineHeight: 40,
					// wordWrapWidth: (265 / 3) * 2,
					wordWrapWidth: this.win - 10,
					wordWrap: true,
					breakWords: true,
				});
				let currentMenu = new PIXI.Text(msg, style);
				currentMenu.x = 0 currentMenu.y = 0 menuTriangle
					.addChild(currentMenu);
				this.app.stage.addChild(menuTriangle);
			}
		}
	}
</script>

<style>
	#id {
		/* text-align: center */
	}
</style>
