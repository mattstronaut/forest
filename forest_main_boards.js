var SerialPort = require("serialport");
var five = require("johnny-five");
var ports = [
    {id: "eyes", port: new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    buffersize: 1
})},
    {id: "fingers", port: "/dev/ttyACM0"}
];

new five.Boards(ports).on("ready", function() {
    var in_sol = new five.Relay({
        type: "NC",
        pin: 22,
        board: this.byId("fingers")
    });
    in_sol.off();
    var out_sol = new five.Relay({
        type: "NC",
        pin: 23,
        board: this.byId("fingers")
    });
    out_sol.off();
    var exit_sol = new five.Relay({
        type: "NC",
        pin: 24,
        board: this.byId("fingers")
    });
    exit_sol.off();
    var soak_sol = new five.Relay({
        type: "NC",
        pin: 25,
        board: this.byId("fingers")
    });
    soak_sol.off();
    var mist_sol = new five.Relay({
        type: "NC",
        pin: 26,
        board: this.byId("fingers")
    });
    mist_sol.off();
    var ac = new five.Relay({
        type: "NC",
        pin: 27,
        board: this.byId("fingers")
    });
    ac.off();
    var fans = new five.Relay({
        type: "NC",
        pin: 28,
        board: this.byId("fingers")
    });
    fans.off();
    var ozzie = new five.Relay({
        type: "NC",
        pin: 29,
        board: this.byId("fingers")
    });
    ozzie.off();
    var light1 = new five.Relay({
        type: "NC",
        pin: 30,
        board: this.byId("fingers")
    });
    light1.on();
    var light2 = new five.Relay({
        type: "NC",
        pin: 31,
        board: this.byId("fingers")
    });
    light2.on();
    var light3 = new five.Relay({
        type: "NC",
        pin: 32,
        board: this.byId("fingers")
    });
    light3.on();
    var intake = new five.Relay({
        type: "NC",
        pin: 33,
        board: this.byId("fingers")
    });
    intake.off();
    var exhaust = new five.Relay({
        type: "NC",
        pin: 34,
        board: this.byId("fingers")
    });
    exhaust.off();
    var chiller = new five.Relay({
        type: "NC",
        pin: 35,
        board: this.byId("fingers")
    });
    chiller.off();
    var pump = new five.Relay({
        type: "NC",
        pin: 36,
        board: this.byId("fingers")
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
        },
        board: this.byId("fingers")
    });

    var nute2 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 13,
            dir: 12,
            cdir: 11
        },
        board: this.byId("fingers")
    });
    var nute3 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 2,
            dir: 3,
            cdir: 4
        },
        board: this.byId("fingers")

    });
    var nute4 = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        frequency: 200,
        pins: {
            pwm: 7,
            dir: 6,
            cdir: 5
        },
        board: this.byId("fingers")
    });
    var nute5 = new five.Motor({
        controller: "PCA9685",
        address: 0x61,
        frequency: 200,
        pins: {
            pwm: 8,
            dir: 9,
            cdir: 10
        },
        board: this.byId("fingers")
    });
    var exitmotor = new five.Motor({
        controller: "PCA9685",
        address: 0x61,
        frequency: 200,
        pins: {
            pwm: 7,
            dir: 6,
            cdir: 5
        },
        board: this.byId("fingers")
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
        exitmotor: exitmotor
    });

});