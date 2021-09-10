---
title: RGB灯带做棋盘的双人五子棋游戏
date: 2019-08-26T17:31:22+08:00
categories: project
tags:
  - Flutter
  - Arduino
  - JavaScript
  - HTML
draft: false
---

这是我短学期的任务,做的简陋，勉强能实现主要功能，写了技术文档，记录一下。

## 一、 项目简介

本项目综合 arduino、flutter、node-red 以及 mqtt 协议开发一个可供电脑端和手机端共同游戏的五子棋游戏，并将游戏实时显示在 RGB 灯带组成的棋盘上。

<!--more-->

## 二、 项目准备

所需的材料：ESP32 一个、WS2812 灯带共 225 个灯珠、杜邦线若干、5v 电源、变压箱、面包板。

所做的准备：搭建 MQTT 服务器、arduino 开发环境及 FastLED 库，Flutter 应用框架，node-red 节点开发环境。

## 三、 棋盘的制作

![](https://github.com/AthleticsNero/AthleticsNero.github.io/blob/master/2019/08/26/gomoku/led.jpg?raw=true)
灯带走单总线协议，为了做成 15\*15 的棋盘，需要在每 15 个灯珠处剪断，并焊接连接。并且每两行单独供电，防止走单总线串联而产生供电不足的问题，（如上图所示，第二条和第三条间只焊接数据线，供电线在第三条上连接面包板），面包板处供电连接变压箱，设定 5V，棋盘首部数据传输线连接 esp32 的 12 号引脚（可自行设定），esp32 由外部电源供电。

## 四、 Arduino 的开发

这里使用 ESP32 开发板，开发前请先下载并选用该开发板。

加载将使用的库：

1. FastLED 库控制灯带的显示。
2. WiFi 库将 ESP32 连接到热点。
3. PubSubClient 库用于 mqtt 通信。

### 1. Wifi 的连接

```c
#include<WiFi.h>//先导入库
const char* ssid = "xxxx";//WiFi的ssid和密码常量定义
const char* password = "xxxx";
void setup(){
    Serial.begin(115200);
 setup_wifi();//初始化函数调用启动wifi函数
}
void setup_wifi(){
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid,password);
    while(WiFi.status()!=WL_CONNECTED){
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");//连接成功后显示IP信息
    Serial.println("IP address:");
    Serial.println(WiFi.localIP());
}
```

### 2. MQTT 服务器的连接

```c
#include<PubSubClient.h>
const char* mqtt_server = "xxxx";
WiFiClient espClient;
PubSubClient client(espClient);
Void setup(){
    client.setServer(mqtt_server,1883);
    client.setCallback(callback);//设置回调函数，每次接收到信//息都执行callback函数
}
void reconnect(){
    while(!client.connected()){
        Serial.print("Attempting MQTT connection...");
        if(client.connect("ESP32Client")){
            Serial.println("connected");
            client.subscribe("player2");//订阅两个玩家的主题
        client.subscribe("player1");
        }else{
            Serial.print("failed,rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}
void loop() {
    if(!client.connected()){//客户端连接断开后执行重连
        reconnect();
    }
    client.loop();
}
```

### 3. 回调函数

回调函数中要根据接收到的消息来控制灯的显示。

```c
#include<FastLED.h>
#define PIN 12//引脚
#define MAXLED 225//最大灯数
CRGB leds[MAXLED];//实例化
static int exist[225];//记录棋子信息，避免重复下棋
void setup(){
    FastLED.addLeds<WS2812,PIN, GRB>(leds, MAXLED);
}
void callback(char* topic,byte* payload,unsigned int length){
    int pos=0,j=0;  //pos代表棋子位置数字
    while(j<length){ //这一段的处理将字节类型的传入数据转化成int类型数字
        pos=pos*10+(int)((char)payload[j]-'0');
        Serial.print((char)payload[j]);
        j++;
    }
    if(pos==255){//设定玩家一赢时传入255
        fill_solid(leds,MAXLED, CRGB::Red);//将灯全部置为红色表面玩家一胜利
    }else if(pos==256){//玩家二赢时传入256
        fill_solid(leds,MAXLED, CRGB::Green);
    }else{
/*因为灯带数据传输的方向是一条线，所以会导致第15盏灯在第二行的最后一个位置，第二行的第一盏灯却是第29盏灯，这点在处理时必须注意逻辑*/
        if((pos/15)%2==1){
            pos=(pos/15+1)*15-1-(pos%15);
        }
//如果玩家传入的位置还未下子，就该点亮起红色且加入存在信息，再次下同样位置就不会执行
        if(strcmp(topic,"player1")==0&&exist[pos]==0){
            leds[pos]=CRGB(255,0,0);
            exist[pos]=1;
        }else if(strcmp(topic,"player2")==0&&exist[pos]==0){
            leds[pos]=CRGB(0,255,0);
            exist[pos]=1;
        }
    }
    FastLED.show();//输出灯的信息
    delay(1000);
}
```

全部代码如上，可借助串口监视器观察是否连接成功以及棋子的位置信息。

## 五、 AI-Node 上 Dashboard 的开发

![](https://github.com/AthleticsNero/AthleticsNero.github.io/blob/master/2019/08/26/gomoku/flow.png?raw=true)
棋盘节点接收 player2（手机端）的 mqtt 消息，并传出以 player1 作主题的 mqtt 消息。
![](https://github.com/AthleticsNero/AthleticsNero.github.io/blob/master/2019/08/26/gomoku/chessboard1.png?raw=true)
这是最终做成的棋盘，点击格子下棋，player1 的棋子红色，player2 的棋子绿色。

### 1. 棋盘绘制

```html
<div id="table_content" style="width: 550px; margin: 0 auto;"></div>
```

这是整体棋盘，设定了宽度，内部细节写在 script 标签里，目的是为了动态产生带独特 ID（位置信息）的表格元素。

```html
<button
  type="submit"
  id="enda"
  style="width:100px;margin-left:350px;margin-top:50px;display:none"
  ng-click="send({payload:'255'})"
>
  结束游戏
</button>
<button
  type="submit"
  id="endb"
  style="width:100px;margin-left:350px;margin-top:50px;display:none"
  ng-click="send({payload:'256'})"
>
  结束游戏
</button>
```

两个结束按钮，当某一玩家获胜时出现对应按钮，用于宣告胜利，传给 esp32 胜利信息。通过 display：none 实现在游戏中隐藏，获胜时修改 display 值便可使其显现。

```html
<script type="text/javascript">
var div1 = document.getElementById("table_content");
var code = '<table border=\"1px\"' + 'style=\"border-collapse: collapse;\">';
var i,j;
for (i=0;i < 15 ;i++ ){
    code+= "<tr>";
    for (j=0;j < 15 ;j++ ){
        var id;
        id = i*15+j;
//每个格子带上id值，单击发送数据即id值，同时调用clickBorder1函数，改变格子颜色。
        code += "<td width=\"30px\" height=\"30px\" id=\"" + id + "\"ng-click=\"send({payload:"+id+"})\" onclick='clickBorder1(" + id + ");'>";
        code += "</td>";
    }
    code+="</tr>";
}
    code += "</table>";
    div1.innerHTML = code;
```

将 html 标签写在 js 中，更加灵活便捷。

### 2. 落子函数

（以玩家 1 为例，玩家 2 同理）

```javascript
var ids = new Array() //该数组记录棋格上有无棋子
function clickBorder1(id) {
  for (var i = 0; i < ids.length; i++) {
    if (ids[i] == id) {
      alert('此处已落子！')
      return
    }
  }
  document.getElementById(id).style.background = '#f00'
  document.getElementById(id).style.color = '#f00'
  document.getElementById(id).innerHTML = 'O'
  //用O和X表示棋子信息，方便判断胜利条件，设定字体颜色和背景相同即可。
  ids.push(id) //用ids数组记录棋格棋子有无
  iswina(Math.round(id / 15), Math.round(id % 15))
  //该函数判断是否胜利，参数为此棋子的行列位置。
}
```

### 3. 胜利判断

每次记录最后一个下的棋子的行列位置，通过判断其八个方向有无足够棋子达成五连珠来判断胜利。

```javascript
function iswina(i, j) {
  var count = [0, 0, 0, 0, 0, 0, 0, 0] //各个方向已有相邻棋子数
  var state = [1, 1, 1, 1, 1, 1, 1, 1] //各个方向若无子或其他子就赋值为2终止该方向的判定。
  for (var step = 1; step < 5; step++) {
    //设定步长，最多四格
    if (state[0] == 1 && i - step >= 0 && j - step >= 0) {
      if (
        document.getElementById((i - step) * 15 + j - step).innerHTML == 'O'
      ) {
        count[0]++
      } else {
        state[0] = 2
      }
    } //左上
    if (state[1] == 1 && i - step >= 0) {
      if (document.getElementById((i - step) * 15 + j).innerHTML == 'O') {
        count[1]++
      } else {
        state[1] = 2
      }
    } //上
    if (state[2] == 1 && i - step >= 0 && j + step < 15) {
      if (
        document.getElementById((i - step) * 15 + j + step).innerHTML == 'O'
      ) {
        count[2]++
      } else {
        state[2] = 2
      }
    } //右上
    if (state[3] == 1 && j + step < 15) {
      if (document.getElementById(i * 15 + j + step).innerHTML == 'O') {
        count[3]++
      } else {
        state[3] = 2
      }
    } //右
    if (state[4] == 1 && i + step < 15 && j + step < 15) {
      if (
        document.getElementById((i + step) * 15 + j + step).innerHTML == 'O'
      ) {
        count[4]++
      } else {
        state[4] = 2
      }
    } //右下
    if (state[5] == 1 && i + step < 15) {
      if (document.getElementById((i + step) * 15 + j).innerHTML == 'O') {
        count[5]++
      } else {
        state[5] = 2
      }
    } //下
    if (state[6] == 1 && i + step < 15 && j - step >= 0) {
      if (
        document.getElementById((i + step) * 15 + j - step).innerHTML == 'O'
      ) {
        count[6]++
      } else {
        state[6] = 2
      }
    } //左下
    if (state[7] == 1 && j - step >= 0) {
      if (document.getElementById(i * 15 + j - step).innerHTML == 'O') {
        count[7]++
      } else {
        state[7] = 2
      }
    } //左
  }
  //同一条线加上该子，大于等于5个即胜利
  if (
    count[0] + count[4] + 1 >= 5 ||
    count[1] + count[5] + 1 >= 5 ||
    count[2] + count[6] + 1 >= 5 ||
    count[3] + count[7] + 1 >= 5
  ) {
    alert('五连珠，电脑胜')
    document.getElementById('enda').style.display = 'block'
    //跳出胜利信息，并出现结束游戏按钮
  }
  return
}
```

### 4. 作用域

```javascript
;(function (scope) {
  scope.$watch('msg.payload', function (newVal, oldVal) {
    console.log('- Scope.msg -')
    console.dir(scope.msg)
    clickBorder2(scope.msg['payload'])
    //接收玩家二传入的信息
  })
})(scope)
```

## 六、 Flutter 应用的开发

### 1. mqtt 依赖

首先新建一个项目，在 pubspec.yaml 文件 dependencies 中加入 mqtt 应用依赖

> mqtt_client: ^5.5.3

然后点击右上角 Package get 获取相关的依赖.

完成之后在 lib 目录下新建一个 package，并且新建一个 dart 文件 message.dart,在里面黏上下面的代码：

```dart
import 'package:mqtt_client/mqtt_client.dart' as mqtt;

class Message {
 final String topic;
 final String message;
 final mqtt.MqttQos qos;

 Message({this.topic, this.message, this.qos});
}
```

这个是一个 mqtt 消息的类，里面有一个消息的主题、内容和 Qos。

### 2. 导入相关库

```dart
import 'package:flutter/material.dart';
import 'package:mqtt_client/mqtt_client.dart' as mqtt;
import 'dart:async';
import 'models/message.dart';
import 'btnsingle.dart';//定义棋格类的文件，后面编写
```

```dart
void main() => runApp(MyApp());
//箭头函数运行Myapp()
class MyApp extends StatelessWidget{
@override
Widget build(BuildContext context) {
   return MaterialApp(
     debugShowCheckedModeBanner: false,
     title: 'Gomoku',
     home: MyHomePage(title:'Gomoku'),
   );
 }
}
class MyHomePage extends StatefulWidget{
 MyHomePage({Key key,this.title}) : super(key:key);
 final String title;
 @override
_MyHomePageState createState() => _MyHomePageState();
}
//创建了_MyHomePageState这个state，接下来编写其内容
class _MyHomePageState extends State<MyHomePage>{}
```

接下来的内容都写在\_MyHomePageState 中

### 2. 定义棋格

![](https://github.com/AthleticsNero/AthleticsNero.github.io/blob/master/2019/08/26/gomoku/%E6%89%8B%E6%9C%BA1.png?raw=true)
与 dashboard 上每个格子带 id 相同，这里的每个格子也都有 id 值，在批量生成棋格的时候，我选择了二维数组，以行为单位，每行带 15 格，共 15 行。
单独写个 dart 文件来定义棋格类。

```dart
import 'package:flutter/material.dart';
int chose;
String come;
bool luozi;//是否有落子，用于判断玩家取消下子位置
class BtnSingle extends StatefulWidget {
  //传入参数isAnchoosed，如果为真，则代表玩家一的棋子
  //参数isChoosed如果为真，则代表玩家二的棋子
  BtnSingle({ Key key,this.id,this.isAnchoosed}) : super(key: key);
  final int id;
  bool isChoosed = false;
  final bool isAnchoosed ;
  @override
  _BtnSingle createState() => new _BtnSingle();
}
class _BtnSingle extends State<BtnSingle> {
  @override
  Widget build(BuildContext context) {
    return
      new Container(
        width: 26,
        height: 26,
        color: Color(0xFFFFFFFF),
        child:new FlatButton(
//棋格无人选中为白色，玩家二选中为绿色，玩家一所下为红色
        color: widget.isChoosed ? Color(0xFF00FF00):(widget.isAnchoosed?Color(0xFFFF0000):Color(0xFFFFFFFF)),
            onPressed: (){
                setState(() {
                    chose = widget.id;//获取该子位置
                    widget.isChoosed = !widget.isChoosed;//更改选中标记
                    if(widget.isChoosed) luozi=true;//如果当前选中状态，标记准备落子
                    else luozi=false;
                });
            },
              shape: RoundedRectangleBorder(
                  side: BorderSide(
                      color: Color(0xFF000000),
                      style: BorderStyle.solid,width: 1
                  )
              ),
            ),
      );
  }
}
//生成单行棋格，列表类型
//isAnchoosed是传入的bool类型参数，若为真代表则是player1所下，初始化都赋值为false
List<BtnSingle> initBtnSingle(int i){
  List<BtnSingle> listbtn = new List();
  int j;
  for(j=0;j<15;j++){
    listbtn.add(new BtnSingle(id: i*15+j,isAnchoosed:false));
  }
  return listbtn;
}
List<List<BtnSingle>> initBtnRow(){
  List<List<BtnSingle>> listrow = new List();
  for(int i=0;i<15;i++){
    listrow.add(initBtnSingle(i));
  }
  return listrow;
}
```

### 3. 生成\_MyHomePageState 内棋盘

```dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: (
          Column(
            children: <Widget>[
//每一行都是列表，内有15个棋格
              new Row(
                children: list[0]
              ),
              ....//重复13个，只改变list后面数字就行
              new Row(
                children: list[14]
              ),
              new Wrap(
                children: <Widget>[
                  new Container(
                    padding: EdgeInsets.fromLTRB(75, 4, 20, 4),
                    child:
//确定按钮，触碰并不代表落子，为的是防止误触，只有在选中后再按确定才算落子。
                    RaisedButton(
                        child: Text('确定'),
                        onPressed: () {
                          if(luozi){//确定在此处下子
                            _pubMsg = chose.toString();
                            _pubMessage();
                          }
                        }
                    ),
                  ),
                  new Container(
                    padding: EdgeInsets.fromLTRB(20, 4, 100, 4),
//接收按钮启动监听，在游戏开始时按下
                    child:RaisedButton(
                      child: Text('接收'),
                      onPressed: (){
                        _subMessage();
                      },
                    )
                  )
                ],
              ),
                ],
              )
          )
      );
  }

```

### 4. 引入 mqtt 相关参数

```dart
String _pubTopic = 'player2';//作为player2发布消息
String _pubMsg;//发布消息的内容是字符串类型
String _subTopic = 'player1';//订阅player1的消息
bool _retainValue = false;
ScrollController subMsgScrollController = new ScrollController();
String broker = 'xxxx';//xxxx改为mqtt服务器地址
mqtt.MqttClient client;
mqtt.MqttConnectionState connectionState;
StreamSubscription subscription;
List<Message> messages = <Message>[];
@override
void initState(){
   super.initState();
   _connect();
}
//初始化函数，执行_connect()连接
void _connect() async{
    //client连接的初始化配置
    //默认端口1883，如果不是1883就采用
    //client = mqtt.MqttClient.withPort(broker, '',1883);
    client = mqtt.MqttClient(broker,'');
    client.logging(on: true);
    client.keepAlivePeriod = 30;
    client.onDisconnected = _onDisconnected;
    final mqtt.MqttConnectMessage connMess = mqtt.MqttConnectMessage()
        .withClientIdentifier('webberFlutter')//连接mqtt使用的id
        .startClean()
        .keepAliveFor(30)
        .withWillTopic('willtopic')
        .withWillMessage('My Will message')
        .withWillQos(mqtt.MqttQos.atLeastOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMess;
    try {
      await client.connect();
    } catch (e) {
      print(e);
      _disconnect();
    }
    if (client.connectionState == mqtt.MqttConnectionState.connected) {
      print('MQTT client connected');
      setState(() {
        connectionState = client.connectionState;
      });
    } else {
      print('ERROR: MQTT client connection failed - '
          'disconnecting, state is ${client.connectionState}');
      _disconnect();
    }
    subscription = client.updates.listen(_onMessage);
  }
//处理连接失败的情况
  void _disconnect() {
    client.disconnect();
    _onDisconnected();
  }
  void _onDisconnected() {
    setState(() {
      connectionState = client.connectionState;
      client = null;
      subscription.cancel();
      subscription = null;
    });
    print('MQTT client disconnected');
}
//_onMessage函数处理传入的信息
 void _onMessage(List<mqtt.MqttReceivedMessage> event) {
    print(event.length);
    print(event[0].topic);
    final mqtt.MqttPublishMessage recMess = event[0].payload as mqtt.MqttPublishMessage;
    final String message = mqtt.MqttPublishPayload.bytesToStringAsString(recMess.payload.message);
    print('MQTT message: topic is <${event[0].topic}>, '
        'payload is <-- ${message} -->');
    print(client.connectionState);
    setState(() {
        if(event[0].topic=='player1'){
          come = message;
          print(int.parse(come));
          for(int i=0;i<225;i++){
     if(int.parse(come)==list[i~/15][i%15].id&&!list[i~/15][i%15].isChoosed){
              BtnSingle btnSingle = new BtnSingle(id:int.parse(come) ,isAnchoosed: true);
              print(list[i~/15][i%15].id);
              print("i am here!");
              print(list[i~/15][i%15].isAnchoosed);
              list[i~/15][i%15] = btnSingle;
              print(list[i~/15][i%15].isAnchoosed);
//接收到玩家一棋子信息后，直接替换棋格，其isAnchoosed值为真，代表玩家一所下
            }
          }
        }
    });
  }
 void _subMessage(){
    //开始接收subtopic的submessage
      print("on sub message");
      if(connectionState == mqtt.MqttConnectionState.connected){
        setState(() {
          print('subscribe to ${_subTopic}');
          client.subscribe(_subTopic, mqtt.MqttQos.exactlyOnce);
        });
    }
  }
  void _pubMessage(){
    //发布消息
      final mqtt.MqttClientPayloadBuilder builder =
      mqtt.MqttClientPayloadBuilder();
      builder.addString(_pubMsg);
      print("pub message ${_pubTopic}:${_pubMsg}");
      client.publishMessage(
        _pubTopic,
        mqtt.MqttQos.values[0],
        builder.payload,
        retain: _retainValue,
      );
  }
```

至此 flutter 应用开发完毕。
启动 APP 和 node-red，给 esp32 通电并连接棋盘，保证 wifi 和 mqtt 连接都成功的情况下，便可以进行五子棋游戏。
