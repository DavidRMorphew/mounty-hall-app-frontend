class Game {
    constructor(id, door1, door2, door3, original_pick, host_reveal, user_switch, user_win, user_id){
        this.id = id;
        this.door1 = door1;
        this.door2 = door2;
        this.door3 = door3;
        this.original_pick = original_pick;
        this.host_reveal = host_reveal;
        this.user_switch = user_switch;
        this.user_win = user_win;
        this.user_id = user_id;
    };
}