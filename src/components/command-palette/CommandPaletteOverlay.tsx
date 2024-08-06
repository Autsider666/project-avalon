import {cn} from "@/lib/utils";
import {ReactElement} from "react";

type CommandPaletteOverlayProps = {
    className?: string,
    children: ReactElement,
}

export function CommandPaletteOverlay({className, children}: CommandPaletteOverlayProps): ReactElement {
    return <div
        className="fixed inset-0 z-50 bg-black/50"
        // className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        // aria-hidden="true"
        // data-state={isOpen ? 'open' : 'closed'} //No difference?
    >
        <div className={cn('flex min-h-full items-center justify-center', className)}>
            {children}
        </div>
    </div>;
}