type EventHandler = (target: HTMLElement, event: Event) => void;

const registeredDelegates = new Set<string>();

export function delegate(
    parent: HTMLElement,
    selector: string,
    type: string,
    handler: EventHandler
) {
    const key = `${selector}:${type}`;
    if (registeredDelegates.has(key)) return;

    parent.addEventListener(type, (event) => {
        const target = event.target as HTMLElement;
        const el = target?.closest(selector);
        if (el) {
            handler(el as HTMLElement, event);
        }
    });

    registeredDelegates.add(key);
}