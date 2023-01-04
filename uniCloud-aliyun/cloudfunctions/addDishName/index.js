'use strict'
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event, context)
	let data = { dishName: event.dishName }
	await db.collection('menu').add(data)
	//返回数据给客户端
	return {
		code: 200,
		msg: '添加成功'
	}
	//返回数据给客户端
	return event
}
