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

/*eyeport.on('data', function (data) {
    var jsoneyesdata = JSON.parse(data);
    dodata = jsoneyesdata.do;
    orpdata = jsoneyesdata.orp;
    ecdata = jsoneyesdata.ec;
    phdata = jsoneyesdata.ph;
});*/

eyeport.on('data', function (data) {
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
});

function printo2(){
    console.log(o2data);
}
function printorp(){
    console.log(orpdatadata);
}
function printec(){
    console.log(ecdata);
}
function printph(){
    console.log(phdata);
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
    ac.off();
    var fans = new five.Relay({
        type: "NC",
        pin: 28
    });
    fans.off();
    var ozzie = new five.Relay({
        type: "NC",
        pin: 29
    });
    ozzie.off();
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
    chiller.off();
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
        printo2: printo2,
        printorp: printorp,
        printec: printec,
        printph: printph
    })
});







//The following Code is for calibrating nutrient peristaltic pumps
    //function nute5_start(){
    //    nute5.reverse(255); //this motor is wired backwards, soooo....
    //}

    //function nute5_stop(){
    //    nute5.stop();
    //}

    //nute5_start();
    //setTimeout(nute5_stop,5000);


