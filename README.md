实现跨域的几种方式

&ensp;jsonp

&ensp;cors

&ensp;postMessage

&ensp;window.name

&ensp;location.hash

&ensp;document.domain

&ensp;http-proxy

&ensp;websocket

&ensp;nginx


运行步骤

进入对应的demo目录，①node serverRes.js ②重新开一个dos窗口 ③node serverReq.js

或者在对应的demo目录下，dos窗口输入run.bat，直接一步完成上面的①②③


### 1. JSONP跨域 ###

项目运行起来后，

请求页面： http://localhost:3000

响应页面为 http://localhost:3001

### 2. CORS跨域 ###

项目运行起来之后，

请求数据页面地址： http://localhost:3000

查看数据： http://localhost:3001

### 3. postMessage跨域 ###

这是html5的新API，适用于不同窗口iframe之间的跨域

> 项目运行地址： http://localhost:3000

### 4. window.name跨域 ###

在 http://localhost:3000/a.html 使用js动态生成一个隐藏的iframe，设置src属性为' http://localhost:3001/c.html '，等这个iframe加载完之后，重新设置src属性为同源的地址' http://localhost:3000/b.html '(b.html是一个空的html文件)，现在iframe与a.html同源，那就可以访问window.name属性，而name值没有变化，因为window.name属性在不同的页面（甚至不同域名）加载后依旧存在。

> 项目运行地址： http://localhost:3000/a.html

### 5. location.hash跨域 ###

在 http://localhost:3000/a.html 使用js动态生成一个隐藏的iframe，设置src属性为' http://localhost:3001/c.html#getdata '，在c.html判断hash值是否为'#getdata'，如果为'#getdata'，则在当前的iframe(c.html)中再生成一个隐藏的iframe，其src属性指向' http://localhost:3000/b.html '，因为a.html和b.html同源，所以可以在b.html里面修改a.html的hash值，这样a.html就可以通过获取自身的hash值得到数据

> 项目运行地址： http://localhost:3000/a.html

### 6. document.domain跨域 ###

document.domain设置成自身或更高一级的父域，且主域必须相同。

本机测试host添加

```
127.0.0.1 a.domain.com
127.0.0.1 b.domain.com
```

> 访问地址： http://a.domain.com:3000/a.html


### 7.后端设置代理proxy跨域 ###

因为JS同源策略是浏览器的安全策略，所以在浏览器客户端不能跨域访问，而服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就没有跨越问题。简单地说，就是浏览器不能跨域，后台服务器可以跨域。

+ demo1 通过使用http-proxy-middleware插件设置后端的代理，在 http://localhost:3000 运行

+ demo2 不使用插件配置代理，直接使用http模块发出请求， 在 http://localhost:3000 运行

### 8. WebSocket跨域 ###

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

项目运行地址： http://localhost:3000


### 9.nginx服务器设置反向代理 ###

```
server{
        listen 80;

        server_name test.demo.com;

        root /home/ftp/web/;

        index index.html login.html;

        location / {
                try_files $uri $uri/ /index.html last;
                index           index.html;
        }

        location /api/users {
                proxy_pass      http://127.0.0.1:3001;
                proxy_set_header Host  $http_host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        }

        location /api/goods {
                proxy_pass      http://127.0.0.1:3001;
                proxy_set_header Host  $http_host;
                proxy_set_header X-Real-IP  $remote_addr;
                proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
}
```
