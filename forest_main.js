var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
    var in_sol = new five.Relay(22);
    var out_sol = new five.Relay(23);
    var exit_sol = new five.Relay(24);
    var soak_sol = new five.Relay(25);
    var mist_sol = new five.Relay(26);
    var ac = new five.Relay(27);
    var fans = new five.Relay(28);
    var ozzie = new five.Relay(29);
    var light1 = new five.Relay(30);
    var light2 = new five.Relay(31);
    var light3 = new five.Relay(32);
    var intake = new five.Relay(33);
    var exhaust = new five.Relay(34);
    var chiller = new five.Relay(35);
    var pump = new five.Relay(36);

    // From the REPL, toggle the lamp on and off by calling:
    //
    //   relay.toggle()
    //
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
        pump: pump
    });
});