var express = require('express');
var app = express();

var responsePort = 3001;  // 响应请求的页面跑在3001端口

// 可以改变‘/’为其他的路径，改完之后serverReq.js里面的请求路径也需要改变
app.get('/', (req, res) => {
  let origin = req.headers.origin;
  console.log(origin);
  // 设置哪个源可以访问我
  res.set('Access-Control-Allow-Origin', 'origin'); // 设置允许跨域的origin，允许3000端口访问本端口（3001）
  // 设置可以携带哪个头访问我
  res.set('Access-Control-Allow-Headers', 'name');
  // 设置哪个方法访问我
  res.set('Access-Control-Allow-Methods', 'PUT');
  // 允许携带cookie
  res.set('Access-Control-Allow-Credentials', true);
  // 预检的存活时间
  res.set('Access-Control-Max-Age', 6);
  // 允许返回的头
  res.set('Access-Control-Expose-Headers', 'name');

  if (req.method === 'OPTIONS') {
    res.end(); // OPTIONS请求不做任何处理
  }

  res.send("Hello world from CROS.😡");   // 空格部分为表情，可能在编辑器不会显示
});

app.listen(responsePort, function () {
    console.log('cros_responser is listening on port '+ responsePort);
});
