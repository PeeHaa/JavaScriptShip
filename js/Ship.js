function Ship() {
    this.specs = {
        hull: 0,
        shields: [],
        warpDrive: 0,
        weapons: [],
        type: null,
        rooms: [],
        crew: []
    };

    this.build = function(type) {
        if (type === 'user') {
            this.specs = {
                hull: 30,
                weapons: [new Weapon().build('lazorMark1'), new Weapon().build('lazorMark1')],
                type: 'user',
                rooms: [],
                crew: [],
                schematics: [
                    {x: 100, y: 100},
                    {x: 150, y: 100},
                    {x: 150, y: 120},
                    {x: 400, y: 120},
                    {x: 400, y: 170},
                    {x: 150, y: 170},
                    {x: 150, y: 190},
                    {x: 100, y: 190},
                    {x: 100, y: 100},
                ]
            };
        }

        return this;
    };
}
