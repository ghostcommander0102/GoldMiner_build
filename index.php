<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">

  <title>GoldMiner</title>

  <meta name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="full-screen" content="yes" />
  <meta name="screen-orientation" content="portrait" />
  <meta name="x5-fullscreen" content="true" />
  <meta name="360-fullscreen" content="true" />

  <meta name="renderer" content="webkit" />
  <meta name="force-rendering" content="webkit" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

  <link rel="stylesheet" type="text/css" href="style-desktop.dfd76.css" />
  <link rel="stylesheet" type="text/css" href="player.css" />
  <link rel="icon" href="favicon.8de18.ico" />
</head>

<body>
  <!-- <h1 class="header">GoldMiner</h1> -->

  <div id="GameDiv">
    <canvas id="GameCanvas"></canvas>
    <div id="splash">
      <div class="progress-bar stripes" style="display: none;">
        <span style="width: 0%"></span>
      </div>
      <div class="fg-spinner" style="display: block; visibility: visible; left: 50%; opacity: 1;">
        <div id="cssload-pgloading">
          <div class="cssload-loadingwrap">
            <ul class="cssload-bokeh">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <script src="src/settings.05012.js" charset="utf-8"></script>
  <script src="main.3f41d.js" charset="utf-8"></script>

  <script type="text/javascript">
    (function () {
      // open web debugger console
      if (typeof VConsole !== 'undefined') {
        window.vConsole = new VConsole();
      }

      var debug = window._CCSettings.debug;
      var splash = document.getElementById('splash');
      splash.style.display = 'block';

      function loadScript(moduleName, cb) {
        function scriptLoaded() {
          document.body.removeChild(domScript);
          domScript.removeEventListener('load', scriptLoaded, false);
          cb && cb();
        };
        var domScript = document.createElement('script');
        domScript.async = true;
        domScript.src = moduleName;
        domScript.addEventListener('load', scriptLoaded, false);
        document.body.appendChild(domScript);
      }

      loadScript(debug ? 'cocos2d-js.01814.js' : 'cocos2d-js-min.js', function () {
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
          loadScript(debug ? 'physics.js' : 'physics-min.js', window.boot);
        }
        else {
          window.boot();
        }
      });
    })();
  </script>
</body>

</html>