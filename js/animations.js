import * as framerMotion from 'https://esm.run/framer-motion';

const { animate } = framerMotion;

export function animateContentIn(element) {
    if (element.firstElementChild) {
        animate(
            element.firstElementChild,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, ease: "easeOut" }
        );
    }
}

export async function animateContentOut(element) {
    if (element.firstElementChild) {
        await animate(
            element.firstElementChild,
            { opacity: [1, 0], y: [0, -20] },
            { duration: 0.3, ease: "easeIn" }
        ).finished;
    }
}
