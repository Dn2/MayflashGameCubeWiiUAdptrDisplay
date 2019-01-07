//get url params
var info = getUrlVars();

var isDebugMode = false;
var gccSvg;
var svgButtonArray = [];
var contorllerIndex = -1;

var pressedOpacity = 1;
var unpressedOpacity = 0.4;
var altUnpressedOpacity = 0.0;
var dpadOpacity = 0.1;

var defaultJoyColour;
var defaultLRColour;
var defaultFrameColour;

var stickRange = 50;
var shoulderRange = 49;

var lastX = 0;
var lastY = 0;
var sens = 0.15;

//console.log(info.debug);
//check for debug mode
var isDebugMode = (info.debug === 'true');


//log contorller connects
window.addEventListener("gamepadconnected", function(e)
{
    //if(e.gamepad.id.toLowerCase().includes("mayflash"))
    //{
        //gamepadArray.push(e.gamepad);
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);

	//}
});


/*gamepadArray = gamepadArray.filter(function (el) {
	return el.id != null;
});*/


window.addEventListener("load", function()
{
	//wait for load hack
	setTimeout(function()
	{
		//get SVG document
		gccSvg = document.getElementById('gccimage').contentDocument;
		document.getElementById('gccimage').style.transformOrigin = '0';
		//get elements
		svgButtonArray["a"] = gccSvg.getElementById('display_a');
		svgButtonArray["text_a"] = gccSvg.getElementById('text_a');

		svgButtonArray["b"] = gccSvg.getElementById('display_b');
		svgButtonArray["text_b"] = gccSvg.getElementById('text_b');
		
		svgButtonArray["x"] = gccSvg.getElementById('display_x');
		svgButtonArray["text_x"] = gccSvg.getElementById('text_x');

		svgButtonArray["y"] = gccSvg.getElementById('display_y');
		svgButtonArray["text_y"] = gccSvg.getElementById('text_y');

		svgButtonArray["s"] = gccSvg.getElementById('display_start');

		svgButtonArray["z"] = gccSvg.getElementById('display_z');
		svgButtonArray["z_pressed"] = gccSvg.getElementById('display_z_pressed');

		svgButtonArray["stick"] = gccSvg.getElementById('display_joystick_nub');
		svgButtonArray["c_stick"] = gccSvg.getElementById('display_cstick_nub');

		svgButtonArray["lframe"] = gccSvg.getElementById('display_lframe');
		svgButtonArray["rframe"] = gccSvg.getElementById('display_rframe');

		svgButtonArray["up"] = gccSvg.getElementById('display_up');
		svgButtonArray["right"] = gccSvg.getElementById('display_right');
		svgButtonArray["down"] = gccSvg.getElementById('display_down');
		svgButtonArray["left"] = gccSvg.getElementById('display_left');

		svgButtonArray["ltrigger"] = gccSvg.getElementById('display_lfill');
		svgButtonArray["rtrigger"] = gccSvg.getElementById('display_rfill');

		svgButtonArray["lcap"] = gccSvg.getElementById('display_lball');
		svgButtonArray["rcap"] = gccSvg.getElementById('display_rball');


		//d-pad background wont be updated after this
		gccSvg.getElementById('display_dpad').setAttributeNS(null, 'opacity', dpadOpacity );

		//set up L-trigger transfrom origin edit: turns out i dont need to edit transform for this one
		//gccSvg.getElementById('display_rfill').style.transformOrigin = "100% 0%";

		//get default colours from elements
		defaultJoyColour = window.getComputedStyle(svgButtonArray["stick"]).fill;
		defaultLRColour = window.getComputedStyle(svgButtonArray["ltrigger"]).fill;
		defaultFrameColour = window.getComputedStyle(svgButtonArray["lframe"]).fill;

		//svgButtonArray["z"].setAttributeNS(null, 'd', 'M0.610,2.301 L0.610,0.949 C0.610,0.949 38.565,9.287 57.000,25.000 C57.710,25.605 56.771,28.000 56.771,28.000 L0.610,2.301 Z');
		//svgButtonArray["s"].setAttributeNS(null, 'stroke', 'black');
		
		console.log(svgButtonArray["z"].getAttribute('d'));
		//a_svg.setAttributeNS(null, 'opacity', 0.2);
		//console.log(svg);
		
		window.requestAnimationFrame(pollControllers);


		console.log("time out done")
	}, 500);


  });

function pollControllers()
{
    //console.log("boop");
	//console.log(gamepadArray.length);
    if(contorllerIndex === -1 && navigator.getGamepads().length > 0)
    {
		var gamepadArray = navigator.getGamepads();
		var selectedPad;

        for(n = 0; n < gamepadArray.length; n++)
        {
			//console.log(gamepadArray[n].buttons[1].pressed);
            if(gamepadArray[n].id.toLowerCase().includes("mayflash") && (Math.abs(gamepadArray[n].axes[0]) > 0.51 || Math.abs(gamepadArray[n].axes[1]) > 0.51 || gamepadArray[n].buttons[1].pressed || gamepadArray[n].buttons[9].pressed))
            {
				contorllerIndex = n;
				selectedPad = gamepadArray[n];
				
				window.document.getElementById("presstostart").style.visibility = "hidden";
				//gccSvg = window.document.getElementById("gccimage")
				//gccSvg = document.conten.getElementById('gccimage');
				//var svgDoc = gccSvg.cont;
				
				//console.log(svgDoc);
				//console.log(gccSvg.getAttribute("style"));
				//gccSvg.setAttribute("style", "opacity: 1;");
				//console.log(document.documentElement.children.namedItem("gccimage"));
				//SVg
                break;
            }
        }
    }

    if(contorllerIndex > -1)
    {
		selectedPad = navigator.getGamepads()[contorllerIndex];

        var a = selectedPad.buttons[1].pressed;
        var b = selectedPad.buttons[2].pressed;
        var x = selectedPad.buttons[0].pressed;
        var y = selectedPad.buttons[3].pressed;

        var s = selectedPad.buttons[9].pressed;
        var z = selectedPad.buttons[7].pressed;

        var l = selectedPad.buttons[4].pressed;
        var r = selectedPad.buttons[5].pressed;

        var up = selectedPad.buttons[12].pressed;
        var right = selectedPad.buttons[13].pressed;
        var down = selectedPad.buttons[14].pressed;
        var left = selectedPad.buttons[15].pressed;

        var al = selectedPad.axes[3];
        var ar = selectedPad.axes[4];

        var leftX = selectedPad.axes[0];
        var leftY = selectedPad.axes[1];

        var cX = selectedPad.axes[5];
        var cY = selectedPad.axes[2];

		if(isDebugMode)
		{
			window.document.getElementById("a").innerText = leftX.toFixed(2);
			window.document.getElementById("b").innerText = leftY.toFixed(2);
		}

		//update button presses
		svgButtonArray["a"].setAttributeNS(null, 'opacity', a ? pressedOpacity : unpressedOpacity);
		svgButtonArray["text_a"].setAttributeNS(null, 'opacity', a ? pressedOpacity : altUnpressedOpacity);
		
		svgButtonArray["b"].setAttributeNS(null, 'opacity', b ? pressedOpacity : unpressedOpacity);
		svgButtonArray["text_b"].setAttributeNS(null, 'opacity', b ? pressedOpacity : altUnpressedOpacity);

		svgButtonArray["x"].setAttributeNS(null, 'opacity', x ? pressedOpacity : unpressedOpacity);
		svgButtonArray["text_x"].setAttributeNS(null, 'opacity', x ? pressedOpacity : altUnpressedOpacity);

		svgButtonArray["y"].setAttributeNS(null, 'opacity', y ? pressedOpacity : unpressedOpacity);
		svgButtonArray["text_y"].setAttributeNS(null, 'opacity', y ? pressedOpacity : altUnpressedOpacity);


		svgButtonArray["s"].setAttributeNS(null, 'opacity', s ? pressedOpacity : unpressedOpacity);
		
		svgButtonArray["z"].setAttributeNS(null, 'opacity', z ? 0 : unpressedOpacity);
		svgButtonArray["z_pressed"].setAttributeNS(null, 'opacity', z ? pressedOpacity : 0);

		//update d-pad button presses
		svgButtonArray["up"].setAttributeNS(null, 'opacity', up ? pressedOpacity : 0);
		svgButtonArray["right"].setAttributeNS(null, 'opacity', right ? pressedOpacity : 0);
		svgButtonArray["down"].setAttributeNS(null, 'opacity', down ? pressedOpacity : 0);
		svgButtonArray["left"].setAttributeNS(null, 'opacity', left ? pressedOpacity : 0);

		svgButtonArray["stick"].setAttributeNS(null, 'transform', 'translate('+stickRange*leftX +','+stickRange*leftY+')');
		svgButtonArray["c_stick"].setAttributeNS(null, 'transform', 'translate('+stickRange*cX +','+stickRange*cY+')');

		//svgButtonArray["l"].setAttributeNS(null, 'transform', 'translate('+0.0 +','+ ((al+1)/2)*shoulderRange +')');
		//svgButtonArray["r"].setAttributeNS(null, 'transform', 'translate('+0.0 +','+ ((ar+1)/2)*shoulderRange +')');

		svgButtonArray["ltrigger"].setAttributeNS(null, 'transform', 'translate('+ (184+(-184*((al+1)/2))) +',0) scale(' + (al+1)/2 +','+ 1 +')');
		svgButtonArray["rtrigger"].setAttributeNS(null, 'transform', 'translate('+ (307+(-307*((ar+1)/2))) +',0) scale(' + (ar+1)/2 +','+ 1 +')');

		svgButtonArray["ltrigger"].setAttribute('style', 'fill: '+ ( l ? 'white' : defaultJoyColour) +';');
		svgButtonArray["rtrigger"].setAttribute('style', 'fill: '+ ( r ? 'white' : defaultJoyColour) +';');

		svgButtonArray["lcap"].setAttributeNS(null, 'transform', 'translate('+ ((al+1)/2)*shoulderRange +','+ 0.0 +')');
		svgButtonArray["rcap"].setAttributeNS(null, 'transform', 'translate('+ -1*((ar+1)/2)*shoulderRange +','+ 0.0 +')');

		svgButtonArray["ltrigger"].setAttributeNS(null, 'opacity', (((al+1)/2) > 0.15) ? pressedOpacity : 0);
		svgButtonArray["lframe"].setAttributeNS(null, 'opacity', (((al+1)/2) > 0.15) ? pressedOpacity : unpressedOpacity);

		svgButtonArray["rtrigger"].setAttributeNS(null, 'opacity', (((ar+1)/2) > 0.15) ? pressedOpacity : 0);
		svgButtonArray["rframe"].setAttributeNS(null, 'opacity', (((ar+1)/2) > 0.15) ? pressedOpacity : unpressedOpacity);
		
		//svgButtonArray["lcap"].setAttributeNS(null, 'opacity', (((al+1)/2) > 0.15) ? pressedOpacity : unpressedOpacity);


		//svgButtonArray["ltrigger"].setAttributeNS(null, 'transform', 'translate(170,0)');
		//window.document.getElementById("a").innerText = ((al+1)/2).toFixed(2);
		//console.log(window.getComputedStyle(svgButtonArray["ltrigger"]).transform);
		//var matrix = new WebKitCSSMatrix(window.getComputedStyle(svgButtonArray["ltrigger"]).transform);
		//console.log(window.getComputedStyle(svgButtonArray["ltrigger"]).fill);

		//light up stick if hard press detected. shitty code
		if( (Math.abs(leftX) - Math.abs(lastX) > sens) || (Math.abs(leftY) - Math.abs(lastY) > sens))
		{
			svgButtonArray["stick"].setAttribute("style", "fill: #fff;");
			//svgButtonArray["stick"].setAttributeNS(null, 'stroke', 'red');
			//svgButtonArray["stick"].setAttributeNS(null, 'stroke-width', 4);
			console.log("HARD");
		}
		else if(Math.abs(leftX) < 0.5 && Math.abs(leftY) < 0.5)
		{
			//svgButtonArray["stick"].setAttributeNS(null, 'stroke', 'none');
			svgButtonArray["stick"].setAttribute('style', 'fill: '+ defaultJoyColour +';');
		}


		lastX = leftX;
		lastY = leftY;
		//window.document.getElementById("canvas").
        //console.log(al);
    }

    //tick
    window.requestAnimationFrame(pollControllers);
}


//log contorller disconnects
window.addEventListener("gamepaddisconnected", function(e)
{
    console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
});


//parses URL and returns the parameters
function getUrlVars()
{
    var vars = {};

    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value)
    {
        vars[key] = value;
    });
    return vars;
}


