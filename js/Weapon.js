function Weapon() {
    this.info = {};

    this.build = function(type) {
        this.info = this.getWeaponSpecs(type);

        return this;
    };

    this.getWeaponSpecs = function(type) {
        var weapons = {
            lazorMark1: {
                type: 'lazorMark1',
                name: 'Lazor Mark I',
                damage: 1,
                missiles: 0,
                shots: 1,
                rechargeTime: 5000,
                charged: 0,
                power: 1
            },
            lazorMark2: {
                type: 'lazorMark2',
                name: 'Lazor Mark II',
                damage: 1,
                missiles: 0,
                shots: 2,
                rechargeTime: 5000,
                charged: 0,
                power: 2
            },
            lazorMark3: {
                type: 'lazorMark3',
                name: 'Lazor Mark III',
                damage: 1,
                missiles: 0,
                shots: 3,
                rechargeTime: 5000,
                charged: 0,
                power: 2
            }
        };

        return weapons[type];
    };
}
