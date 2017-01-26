var five = require("johnny-five");
var board = new five.Board({ port: "/dev/ttyACM0"});
var serialport = require('serialport');
//var SerialPort = serialport.SerialPort;
var eyeport = new serialport('/dev/ttyUSB0', {
    parser: serialport.parsers.readline('\n'),
    baudrate: 38400
});


var o2data = null;
var orpdata = null;
var ecdata = null;
var phdata = null;
var nute_temp = null;
var canopy_temp = null;
var canopy_rh = null;
var nute_level = null;
var eyejson = null;

eyeport.on('data', function (data) {
    eyeport.flush(function(err,results){});
    data = data.toString().replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    data = data.replace(/[\u0000-\u0019]+/g,"");
    json = JSON.parse(data);
    o2data = json.o2;
    orpdata = json.orp;
    ecdata = json.ec;
    phdata = json.ph;
    nute_temp = json.nute_temp;
    canopy_temp = json.canopy_temp;
    canopy_rh = json.canopy_rh;
    nute_level = json.nute_level;
    eyejson = data;
    eyeport.flush(function(err,results){});
});

function printeye(){
    console.log(eyejson);
}



board.on("ready", function() {
    var in_sol = new five.Relay({
        type: "NC",
        pin: 22
    });
    in_sol.off();
    var out_sol = new five.Relay({
        type: "NC",
        pin: 23
    });
    out_sol.off();
    var exit_sol = new five.Relay({
        type: "NC",
        pin: 24
    });
    exit_sol.off();
    var soak_sol = new five.Relay({
        type: "NC",
        pin: 25
    });
    soak_sol.off();
    var mist_sol = new five.Relay({
        type: "NC",
        pin: 26
    });
    mist_sol.off();
    var ac = new five.Relay({
        type: "NC",
        pin: 27
    });
    ac.on();
    var fans = new five.Relay({
        type: "NC",
        pin: 28
    });
    fans.on();
    var ozzie = new five.Relay({
        type: "NC",
        pin: 29
    });
    ozzie.on();
    var light1 = new five.Relay({
        type: "NC",
        pin: 30
    });
    light1.on();
    var light2 = new five.Relay({
        type: "NC",
        pin: 31
    });
    light2.on();
    var light3 = new five.Relay({
        type: "NC",
        pin: 32
    });
    light3.on();
    var intake = new five.Relay({
        type: "NC",
        pin: 33
    });
    intake.off();
    var exhaust = new five.Relay({
        type: "NC",
        pin: 34
    });
    exhaust.off();
    var chiller = new five.Relay({
        type: "NC",
        pin: 35
    });
    chiller.on();
    var pump = new five.Relay({
        type: "NC",
        pin: 36
    });
    pump.on();


    var nute1 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 8,
            dir: 9,
            cdir: 10
        }
    });

    var nute2 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 13,
            dir: 12,
            cdir: 11
        }
    });
    var nute3 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 2,
            dir: 3,
            cdir: 4
        }

    });
    var nute4 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 7,
            dir: 6,
            cdir: 5
        }
    });
    var nute5 = new five.Motor({
        controller: "PCA9685",
        address: 0x61,
        frequency: 200,
        pins: {
            pwm: 8,
            dir: 9,
            cdir: 10

        }
    });
    var exitmotor = new five.Motor({
        controller: "PCA9685",
        address: 0x61,
        frequency: 200,
        pins: {
            pwm: 7,
            dir: 6,
            cdir: 5
        }
    });


    this.repl.inject({
        in_sol: in_sol,
        out_sol: out_sol,
        exit_sol: exit_sol,
        soak_sol: soak_sol,
        mist_sol: mist_sol,
        ac: ac,
        fans: fans,
        ozzie: ozzie,
        light1: light1,
        light2: light2,
        light3: light3,
        intake: intake,
        exhaust: exhaust,
        chiller: chiller,
        pump: pump,
        nute1: nute1,
        nute2: nute2,
        nute3: nute3,
        nute4: nute4,
        nute5: nute5,
        exitmotor: exitmotor,
        printeye: printeye,
        nutex_timer: nutex_timer,
        mist_timer:mist_timer
    });


    //The following Code is for calibrating nutrient peristaltic pumps
    /* function nute5_start() {
        nute5.reverse(255); //this motor is wired backwards, soooo....
    }

    function nute5_stop() {
        nute5.stop();
    }

    nute5_start();
    setTimeout(nute5_stop, 10000);*/

    //functions for calling nutex for given time
    function nutex_timer(nutename, time){
        nutename.reverse(255);
        setTimeout(nutex_stop, time);
        function nutex_stop(){
            nutename.stop();
        }

    }
    /* The following is the first attempt at timing the mist solenoid
    
    function mist_timer(time_on,time_off){
        mist_sol.on();
        setTimeout(miststop, time_on);
        setTimeout(miststart, time_off);
        function miststop() {
            mist_sol.off();
        }
        function miststart() {
            mist.sol.on();
        }

     */

    
/*This is the second attempt
    function mist_timer(time_on,time_off){
        setInterval(function mistoff(){
            mist_sol.off();
        }, time_on);
        setInterval(function miston() {
            mist_sol.on();
        }, time_off);
    } */

//Third time's a charm
    function mist_timer(time_on, time_off){
        var mistinterval;
        mistinterval = setInterval(function mistschedule() {
            mist_sol.on();
            setTimeout(function mistoff() {
                mist_sol.off();
            }, time_on)
        }, time_off + time_on);
        }
});



