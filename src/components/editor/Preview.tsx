import {SandpackPreview} from "@codesandbox/sandpack-react";
import {clsx} from "clsx";
import {ReactElement} from "react";

type PreviewProps = { visible: boolean }

export function Preview({visible}: PreviewProps): ReactElement {
    return <div
        className={clsx(
            visible ? 'flex' : 'hidden',
            'min-h-full overflow-hidden rounded-b resize-y'
        )}
    >
        <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{
                width: '100%',
                minHeight: '100%',
            }}
        />
    </div>;
}