class Routine {
    constructor(name, author, info, image, difficulty, time) {
        this.name = name;
        this.author = author;
        this.info = info;
        this.image = image;
        this.difficulty = difficulty;
        this.time = time;
        this.favorite = false;
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
        '45 min')],
};


export {RoutineStore, Routine};