import { store } from ".";

export function waitForRehydration() {
    return new Promise((resolve) => {
        const unsubscribe = store.subscribe(() => {
            const { isHydrated } = store.getState()._persist;
            if (isHydrated) {
                resolve();
            }
        });
        unsubscribe();
    });
}


