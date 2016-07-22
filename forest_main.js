var five = require("johnny-five"),
    board = new five.Board();


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
    light1.off();
    var light2 = new five.Relay({
        type: "NC",
        pin: 31
    });
    light2.off();
    var light3 = new five.Relay({
        type: "NC",
        pin: 32
    });
    light3.off();
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
    pump.off();


    var motor = new five.Motor({
        controller: "PCA9685",
        address: 0x60,
        pin: 0
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
        motor: motor
    });


});

