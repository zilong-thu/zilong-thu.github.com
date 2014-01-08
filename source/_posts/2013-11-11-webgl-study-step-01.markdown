---
layout: post
title: "Hello, WebGL"
date: 2013-11-11 20:09
comments: true
keywords: WebGL, three.js
categories: HTML5
---
这是一个WebGL Hello World。

关于博客引用自己的js代码：使用`<script type="text/script" src="myjs.js"></script>`，放在页面的正文里即可（最好放在`<!-- more -->`的后面）。但现在还不知道如何载入自定义的样式表——尤其某些样式只是在某些博文里做演示用的时候。也不清楚如何写模板，从而可以使用`<style type="text/css"></style>`来自定义一些样式。

值得注意的是，`three.js` 已经包含了对 `requestAnimationFrame` 的封装。因此，暂不必考虑其浏览器的差异性问题。

CSDN博客上也有极为详细的入门例子及代码解释，见 <a href="http://blog.csdn.net/celte/article/details/9458599" target="_blank">CSDN: WebGL库Three.js入门</a>。
<!-- more -->

<img src="/images/blog/html5/box.gif" style="display:none;" />


不知道是从`Three.js`直接学起好呢，还是先学习`WebGL`，再学习库。保存一个资源链接：<a href="http://learningwebgl.com/blog/?page_id=1217" target="_blank">learningwebgl.com</a>，以及相应的中文翻译网站：<a href="http://www.hiwebgl.com/?p=42" target="_blank">WebGL中文教程</a>

###iPad4 iOS7下Safari运行效果

手指在滑动页面的时候，动画是停止的。

###参考资料
<a href="https://github.com/mrdoob/three.js" target="_blank">three.js</a>

纹理贴图参考：<a href="http://book.douban.com/subject/25761108/" class="douban_book" name="25761108" target="_blank">《HTML5游戏编程核心技术与实战》</a>

###效果演示
<div id="webgl_container" class="output" style="width: 400px; height: 400px;"></div>

<script type="text/javascript" src="{{ root_url }}/javascripts/libs/three.min.js"></script>
<script type="text/javascript">
function hello_world_loop(){
    var camera, scene, renderer, light;
    var geometry, material, mesh;

    function init() {
        var width,
            height,
            container = document.getElementById('webgl_container');

        // 纹理贴图
        var text = THREE.ImageUtils.loadTexture('/images/blog/html5/box.gif');

        width = container.clientWidth;
        height = container.clientHeight;

        camera = new THREE.PerspectiveCamera( 75, width/ height, 1, 10000 );

        camera.position.z = 900;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 400, 400, 400 );
        material = new THREE.MeshBasicMaterial( {map:text} );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( width, height );

        light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);  
        light.position.set( 100, 100, 200 );  
        scene.add(light);  

        container.appendChild( renderer.domElement );
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        renderer.render( scene, camera );

    }
    init();
    requestAnimationFrame( animate );
}

hello_world_loop();
</script>