---
layout: post
title: "Hello, WebGL"
date: 2013-11-11 20:09
comments: true
keywords: WebGL, three.js
categories: WebGL
---
根据[three.js首页](https://github.com/mrdoob/three.js)的例子做一个Hello World，放在博客上试运行一下。

关于博客引用自己的js代码：使用`<script type="text/script" src="myjs.js"></script>`，放在页面的正文里即可（最好放在`<!-- more -->`的后面）。但现在还不知道如何载入自定义的样式表——尤其某些样式只是在某些博文里做演示用的时候。也不清楚如何写模板，从而可以使用`<style type="text/css"></style>`来自定义一些样式。

值得注意的是，three.js 已经包含了对 requestAnimationFrame 的封装。因此，暂不必考虑其浏览器的差异性问题。
<!-- more -->
<div id="webgl_container" style="width: 400px; height: 400px;"></div>
<script type="text/javascript" src="{{ root_url }}/javascripts/libs/three.min.js"></script>
<script>
function hello_world_loop(){
    var camera, scene, renderer;
    var geometry, material, mesh;

    function init() {
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

        camera.position.z = 700;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 400, 400, 400 );
        material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );

        var container = document.getElementById('webgl_container');
        container.appendChild( renderer.domElement );
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }
    init();
    requestAnimationFrame( animate );
}

hello_world_loop();
</script>