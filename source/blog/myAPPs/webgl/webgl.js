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

        camera.position.z = 800;

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

        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.008;

        renderer.render( scene, camera );

    }
    init();
    requestAnimationFrame( animate );
}

// 地球的函数
function earth_loop(){
    var renderer, scene, camera;
    var geometry, material, mesh, light;
    var earth;

    function init(){
        var container = document.getElementById('webgl_earth_container');
        var width = container.offsetWidth,
            height = container.offsetHeight;

        renderer = new THREE.WebGLRenderer();
        // var renderer = new THREE.CanvasRenderer();
        renderer.setSize( width, height );
        
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
        camera.position.z = 350;
        scene.add(camera);

        // 颜色贴图
        var map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
        geometry = new THREE.SphereGeometry(100, 24, 24);
        material = new THREE.MeshPhongMaterial({
            // color: 0xff00
            map: map
        });
        // 法线贴图
        material.bumpMap   = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
        material.bumpScale = 0.05;
        // 高光贴图
        material.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
        material.specular  = new THREE.Color('grey');

        earth = new THREE.Mesh(geometry, material);
        scene.add( earth );

        light = new THREE.DirectionalLight( 0xffffff, 1);
        light.position.set(0, 0.5, 1);
        scene.add( light );

        container.appendChild( renderer.domElement );
    }
    
    function animate() {

        requestAnimationFrame( animate );

        earth.rotation.y += 0.005;

        renderer.render( scene, camera );

    }

    init();
    requestAnimationFrame( animate );
}


// JSONLoader
function json_loop(){
    var renderer, scene, camera;
    var geometry, material, mesh, light;
    var mesh;

    var container = document.getElementById('jsonloader_container');
    var width = container.offsetWidth,
        height = container.offsetHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.z = 350;
    scene.add(camera);

    light = new THREE.DirectionalLight( 0xffffff, 1);
    light.position.set(0, 0.5, 1);
    scene.add( light );
   
    var jsonloader = new THREE.JSONLoader();
    jsonloader.load('buffalo/buffalo.js',function(geometry, material){
        
        material = new THREE.MeshPhongMaterial({
            map : THREE.ImageUtils.loadTexture("buffalo/buffalo.png")
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add( mesh );

        container.appendChild( renderer.domElement );


        function animate() {

            requestAnimationFrame( animate );

            mesh.rotation.y += 0.005;

            renderer.render( scene, camera );

        }

        requestAnimationFrame( animate );

    });   

}

