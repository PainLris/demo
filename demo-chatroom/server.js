//1引入模块
var net=require("net");
//2创建一个网络服务器
var server=net.createServer();
//3监听服务器的连接请求，设置请求处理回调函数
var arr=[];
//当客户端与服务器连接成功后
server.on("connection",function(socket){ 
	//socket 双向数据流。可读可写！

	//服务器界面显示有新用户连接到服务器上了！
	console.log("有新客户端连接服务器！");

	//通知其他用户有新客户端连接上来了！
	if(arr.length>0){
		for(var i=0;i<arr.length;i++){
			arr[i].write("有新客户端连接！");
		}
	}
	arr.push(socket);

	var reg=/(\d{3}(?:\.\d{1,3}){3}):(\d+)@(.*)/;

	//不同的客户端有不同的socket对象
	// console.log(socket);
	//监视客户端发来的数据
	socket.on("data",function(data){
		// console.log("ip:"+socket.remoteAddress);
		// console.log("port:"+socket.remotePort);
		data=data.toString();
		console.log("( "+this.remoteAddress+':'+this.remotePort+' )'+data);
		if(!reg.test(data)){
			//广播发送：
			for(var i=0;i<arr.length;i++){
				if(arr[i]!=this){
					arr[i].write("("+this.remoteAddress+':'+this.remotePort+')广播:'+data);
				}
			}
		}else{
			var chatdata=reg.exec(data);
			for(var i=0;i<arr.length;i++){
				if(arr[i].remoteAddress==chatdata[1]&&arr[i].remotePort==chatdata[2]){
					arr[i].write("("+this.remoteAddress+':'+this.remotePort+')私聊:'+chatdata[3]);
				}
			}
		}
		
		//私聊：
		


		
	});
	//防止客户端断开，服务器报错！
	socket.on('error',function(){
		console.log("有客户端下线了！");
	});
});
//4开启服务，分配一个端口号，设置监听成功之后的回调函数
server.listen(3000,'127.0.0.1',function(){
	console.log(" 服务器创建成功，端口3000已启动！");
});

