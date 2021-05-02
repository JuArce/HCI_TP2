class Routine {
    constructor(name, author, info, image, difficulty, time) {
        this.name = name;
        this.author = author;
        this.info = info;
        this.image = image;
        this.difficulty = difficulty;
        this.time = time;
        this.favorite = true;
    }
}

const RoutineStore = {
    routines: [new Routine('Extreme cardio', 'Kamado Tanjiro',
        'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/tanjirou-kamado-personaje-guardianes-de-la-noche-4076.jpg?s=large',
        'Medium',
        '45 min'),
        new Routine('Extreme cardio v2', 'Tomioka',
        'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/giyu-tomioka-de-guardianes-de-la-noche-4034.jpg?s=large',
        'Medium',
        '45 min'),
        new Routine('Extreme cardio v3', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/zenitsu-agatsuma-con-espada-de-guardianes-de-la-noche-4039.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v4', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/tanjiro-kamado-de-kimetsu-no-yaiba-3727.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v5', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/ilustracion-minimalista-de-goku-5903.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v6', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/spirit-el-indomable-7551.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v7', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/kyojuro-rengoku-con-fuego-kimetsu-no-yaiba-6724.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v8', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/lucario-vs-blaziken-pokemon-3076.jpg?s=large',
            'Medium',
            '45 min'),
        new Routine('Extreme cardio v9', 'Tomioka',
            'Soy una rutina extrema, cuidado reyes de los musculos', 'https://www.xtrafondos.com/wallpapers/resized/pikachu-y-raichu-6885.jpg?s=large',
            'Medium',
            '45 min')
    ],

    emptyRoutine: new Routine('', '', '', '', '', ''),

    getFavorites(page, size){
        let aux = this.routines.filter(rout => rout.favorite);
        let first = (page - 1) * size;
        let toReturn = [];
        let i
        for(i = first; i < aux.length && i < first + size; i++) {
            toReturn.push(aux[i]);
        }
        // while(i % size !== 0) {
        //     toReturn.push(this.emptyRoutine);
        //     i++;
        // }
        return toReturn;
    },

    getFavoritesSize(){
        return this.routines.filter(rout => rout.favorite).length;
    }
};


export {RoutineStore, Routine};
