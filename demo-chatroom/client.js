//引包
var net =require("net");
//创建一个连接的客户端
var client =net.createConnection({
	port:3000,
	host:'127.0.0.1',
});

//client connect事件只触发一次,在客户端连接是会触发！
client.on("connect",function(){
	console.log("客户端与服务器建立连接成功！");
	// client.write("hi");
	// 监听用户输入。写在connect事件内，连接上后才可运行
	process.stdin.on('data',function(data){
		client.write(data.toString().trim());//trim用来去掉回车和换行字符的！
	});

});
//监听服务器发回来的数据！
client.on("data",function(data){
	var data=data.toString();
	console.log(data);
});