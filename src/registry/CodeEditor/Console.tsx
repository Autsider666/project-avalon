import {SandpackConsole} from "@codesandbox/sandpack-react";
import {clsx} from "clsx";
import {ReactElement} from "react";

type ConsoleProps = { visible: boolean }

export function Console({visible}: ConsoleProps): ReactElement {
    return <div
        className={clsx(
            visible ? 'block' : 'hidden',
            'min-h-full overflow-x-hidden rounded-b'
        )}
    >
        <SandpackConsole
            standalone
            resetOnPreviewRestart
            showHeader={false}
            showResetConsoleButton={false}
        />
    </div>;
}