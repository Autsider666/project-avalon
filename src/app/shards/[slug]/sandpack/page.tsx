import {getFile} from "@/hooks/getFile";
import {fetchShard} from "@/lib/data";
import {PageProps} from "@/lib/types";
import {
    SandpackCodeEditor,
    SandpackFileExplorer,
    SandpackFiles,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider,
} from "@codesandbox/sandpack-react";
import {ReactElement} from "react";

export default async function SandPackPage({params: {slug}}: PageProps<{ slug: string }>): Promise<ReactElement> {
    const shard = await fetchShard(decodeURIComponent(slug));
    const files: SandpackFiles = {
        "/package.json": {
            code: JSON.stringify({
                main: "/src/index.ts",
                dependencies: {
                    excalibur: "latest",
                },
                devDependencies: {
                    typescript: '^5',
                },

            })
        },
        "/tsconfig.json": {
            code: JSON.stringify({
                // "compilerOptions": {
                //     "allowJs": true,
                //     // "skipLibCheck": true,
                //     "strict": true,
                //     // "noEmit": true,
                //     "esModuleInterop": true,
                //     "module": "esnext",
                //     "jsx": "preserve",
                //     "sourceMap": true,
                //     "lib": [
                //         "esnext",
                //         "dom"
                //     ],
                //     // "rootDir": "src",
                //     "moduleResolution": "bundler",
                //     "pathss": {
                //         "@/*": ["./src/*"]
                //     }
                // },
                "compilerOptions": {
                    "baseUrl": "./src", // setting a value for baseUrl is required
                    "lib": ["dom", "dom.iterable", "esnext"],
                    "allowJs": true,
                    "skipLibCheck": true,
                    "strict": true,
                    "noEmit": true,
                    "esModuleInterop": true,
                    "module": "esnext",
                    "moduleResolution": "bundler",
                    "resolveJsonModule": true,
                    "isolatedModules": true,
                    "jsx": "preserve",
                    "incremental": true,
                    "plugins": [
                        {
                            "name": "next"
                        }
                    ],
                    "paths": {
                        "@/*": ["./src/*"]
                    }
                },
                "include": ["./src/**/*.ts"],
            }, null, 4)
        },
    };

    if (shard.example) {
        const {code} = await getFile(shard.example);
        files['/src/index.ts'] = code;
    }

    for (const fileDomain of shard.files) {
        const {code, path} = await getFile(fileDomain);
        files[path] = code;
    }

    return (<main>
        <div className="h-full w-full">
            <SandpackProvider
                files={files}
                theme="dark"
                // template="vanilla-ts"
                customSetup={{
                    entry: './src/index.ts',
                    // dependencies: {
                    //     excalibur: 'latest',
                    // },
                }}
            >
                <SandpackLayout>
                    <SandpackFileExplorer
                        style={{height: "400px"}}
                    />
                    <SandpackCodeEditor
                        style={{height: "400px"}}
                        showLineNumbers
                        showTabs
                    />
                    <SandpackPreview
                        style={{minWidth: "100%"}}
                    />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    </main>);
}