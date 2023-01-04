<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="button-area">
			<button size='mini' @click='openDialog'>添加菜品</button>
			<button size='mini' @click='rorate'>转动</button>
		</view>

		<view class='menu'>
			<div class='menu-item' v-for='(item,index) in menu' :key='index'>
				<span>
					<span>{{index +1}}:</span><span class='dish-name'>{{item.dishName}}</span>
				</span>
				<span>
					<span class='edit-btn' @click='editDialog(item.dishName,item._id)'>编辑</span>
					<span class='del-btn' @click='delDishName(item._id)'>删除</span>
				</span>
			</div>
		</view>
		<turntable ref='turntable' class='turn-con' :menu='menu'></turntable>
		<view class='pop' v-show='ifVisilble'>
			<form @submit="formSubmit" class='form-con'>
				<view class="input-con">
					<span>菜单名称:</span>
					<input class="uni-input" name="input" :value='dishName' placeholder="这是一个输入框" />
				</view>
				<view class="submit-btn">
					<button size='mini' form-type="submit">提交</button>
					<button size='mini' form-type="submit" @click='reset'>取消</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import turntable from '../turntable/turntable.vue'
	export default {
		components: {
			turntable
		},

		data() {
			return {
				title: 'Hello',
				menu: [],
				ifVisilble: false,
				dishName: '',
				isEdit: false
			}
		},
		methods: {
			rorate() {
				this.$refs.turntable.rorate()
			},
			getMenuList(e) {
				uniCloud.callFunction({
					name: 'menuList',
					data: {
						limit: 30,
						offset: 0,
						keyWord: e ? e.detail.value : ''
					}
				}).then((res) => {
					console.log('菜单', res.result.data)
					this.menu = res.result.data
				})
			},
			formSubmit(e) {
				console.log('e', e.detail.value.input)
				if (this.isEdit) {
					uniCloud.callFunction({
						name: 'updateDishName',
						data: {
							id: this.id,
							dishName: e.detail.value.input
						}
					}).then(res => this.getMenuList())
				} else {
					uniCloud.callFunction({
						name: 'addDishName',
						data: {
							dishName: e.detail.value.input
						}
					}).then(res => this.getMenuList())

				}
			},
			delDishName(id) {
				uniCloud.callFunction({
					name: 'delDishName',
					data: {
						id
					}
				})
				this.getMenuList()
			},
			reset() {
				this.dishName = ''
				this.ifVisilble = false
			},
			openDialog() {
				if (this.menu.length < 8) {
					this.ifVisilble = true
					this.dishName = ''
					this.isEdit = false
				} else {
					alert('只可以添加八个菜！')
				}

			},
			editDialog(dishName, id) {
				this.ifVisilble = true
				this.isEdit = true
				this.dishName = dishName
				this.id = id
			}
		},
		created() {
			this.getMenuList()
		}
	}
</script>

<style>
	.content {
		/* position: relative; */
	}

	.button-area {
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding-top: 20px;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.menu-item {
		display: inline-flex;
		justify-content: space-between;
		width: 50%;
		padding-bottom: 5px;
	}

	.edit-btn {
		padding-right: 5px;
		color: #4054e6b0;
	}

	.del-btn {
		padding-right: 5px;

		color: #e68540;
	}

	.dish-name {
		padding-left: 10px;
		color: #dc40e6
	}

	.menu {
		padding: 20px;
	}

	.input-con {
		display: flex;
		padding: 20px 20px;
	}

	.uni-input {
		border-bottom: 1px solid black;
		padding-left: 20px;
		width: 70%;
	}


	.submit-btn {
		text-align: right;
		padding-right: 20px;
	}

	.submit-btn :first-child {
		margin-right: 10px;
	}

	.turn-con {
		text-align: center;
		padding-top: 0px 20px 0 20px;
	}

	.pop {
		position: relative;
		top: -400px;
		background: #fff;
		padding: 20px 0;
		margin: 0 10px;
		border-radius: 10px;
		box-shadow: 5px 5px 5px #89898773;
	}
</style>
