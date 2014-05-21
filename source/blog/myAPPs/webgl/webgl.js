// cube
function cube_loop(){
    var camera, scene, renderer, light;
    var geometry, material, mesh;

    function init() {
        var width,
            height,
            container = document.getElementById('webgl_cube_container');

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

// 地球的函数
function earth(){
    var container = document.getElementById('webgl_earth_container');
    var width = container.offsetWidth,
        height = container.offsetHeight;

    var renderer = new THREE.WebGLRenderer();
    // var renderer = new THREE.CanvasRenderer();
    renderer.setSize( width, height );
    
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.z = 400;
    scene.add(camera);

    var map = THREE.ImageUtils.loadTexture('earth.jpg');
    var geometry = new THREE.SphereGeometry(100, 24, 24);
    var material = new THREE.MeshPhongMaterial({
            // color: 0xFF0000
            map: map
        });
    var earth = new THREE.Mesh(geometry, material);
    scene.add( earth );

    var light = new THREE.DirectionalLight( 0xffffff, 1);
    light.position.set(0, 0.5, 1);
    scene.add( light );

    container.appendChild( renderer.domElement );

    renderer.render( scene, camera );
}