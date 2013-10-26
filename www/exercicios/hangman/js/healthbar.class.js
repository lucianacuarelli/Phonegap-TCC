function HealthBar(canvas, num_lives){
	this.canvas = canvas;
	this.num_lives = num_lives;
	this.init3D();
}

HealthBar.prototype.lose_life = function(){
	this.num_lives--;
	this.init3D();
}

HealthBar.prototype.init3D = function() {
  var black = new Pre3d.RGBA(0, 0, 0, 1);
  var white = new Pre3d.RGBA(1, 1, 1, 1);

  var screen_canvas = this.canvas;
  var renderer = new Pre3d.Renderer(screen_canvas);

  var cubes = [ ];

  for (var i = 0; i < this.num_lives; ++i) {
          var cube = Pre3d.ShapeUtils.makeCube(0.5);
          var transform = new Pre3d.Transform();
          transform.translate(5, 5 - i, 5);
          cubes.push({
            shape: cube,
            color: new Pre3d.RGBA(255, 0, 0, 0.5),
            trans: transform});
  }

  var num_cubes = this.num_lives;
  var cur_white = false;  // Default to black background.

  function draw() {
    for (var i = 0; i < num_cubes; ++i) {
      var cube = cubes[i];
      renderer.fill_rgba = cube.color;
      renderer.transform = cube.trans;
      renderer.bufferShape(cube.shape);
    }

    if (cur_white) {
      renderer.ctx.setFillColor(1, 1, 1, 1);
    } else {
      renderer.ctx.setFillColor(0, 0, 0, 1);
    }
    renderer.drawBackground();

    renderer.drawBuffer();
    renderer.emptyBuffer();
  }

  renderer.camera.focal_length = 4.5;
  // Have the engine handle mouse / camera movement for us.
  DemoUtils.autoCamera(renderer, 2.0, -3.0, -30, 0.20, -0.96, 1.0, draw);

  document.addEventListener('keydown', function(e) {
    if (e.keyCode != 84)  // t
      return;

    if (cur_white) {
      document.body.className = "black";
    } else {
      document.body.className = "white";
    }
    cur_white = !cur_white;
    draw();
  }, false);

  draw();
}