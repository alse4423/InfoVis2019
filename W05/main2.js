function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    
    var geometry = new THREE.Geometry();
    geometry.vertices[0] = new THREE.Vector3(-1,1,1);
    geometry.vertices[1] = new THREE.Vector3(-1,-1,1);
    geometry.vertices[2] = new THREE.Vector3(1,-1,1);
    geometry.vertices[3] = new THREE.Vector3(1,1,1);
    geometry.vertices[4] = new THREE.Vector3(-1,1,-1);
    geometry.vertices[5] = new THREE.Vector3(-1,-1,-1);
    geometry.vertices[6] = new THREE.Vector3(1,-1,-1);
    geometry.vertices[7] = new THREE.Vector3(1,1,-1);
    
    geometry.faces[0] = new THREE.Face3(0,1,2);
    geometry.faces[1] = new THREE.Face3(0,2,3);
    geometry.faces[2] = new THREE.Face3(0,4,1);
    geometry.faces[3] = new THREE.Face3(1,4,5);
    geometry.faces[4] = new THREE.Face3(5,6,2);
    geometry.faces[5] = new THREE.Face3(2,1,5);
    geometry.faces[6] = new THREE.Face3(6,3,2);
    geometry.faces[7] = new THREE.Face3(3,6,7);
    geometry.faces[8] = new THREE.Face3(0,3,7);
    geometry.faces[9] = new THREE.Face3(0,7,4);
    geometry.faces[10] = new THREE.Face3(4,6,5);
    geometry.faces[11] = new THREE.Face3(4,7,6);
    
    
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.005;
        renderer.render( scene, camera );
    }
    
    document.addEventListener( 'mousedown', mouse_down_event );
    function mouse_down_event( event )
    {
        // Mouse picking
        // ...
        
        var x_win = event.clientX;
        var y_win = event.clientY;
        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;
        var x_NDC = 2 * ( x_win - vx ) / vw - 1;
        var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
        
        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera );
        var origin = camera.position;
        var direction = p_NDC.sub(camera.position).normalize();
        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObject( cube );
        if ( intersects.length > 0 )
        {
            intersects[0].face.color.setRGB( 1, 0, 0 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
    }
}
