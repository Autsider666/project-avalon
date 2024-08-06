"use client";

import {CommandPaletteOverlay} from "@/components/command-palette/CommandPaletteOverlay";
import {CommandPaletteTrigger} from "@/components/command-palette/CommandPaletteTrigger";
import {Badge} from "@/components/ui/Badge";
// import {
//     Dialog,
//     DialogDescription,
//     DialogHeader,
//     DialogOverlay,
//     DialogPortal,
//     DialogTitle
// } from "@/components/ui/Dialog";
import {Combobox, Dialog, DialogPanel} from "@headlessui/react";
import {SearchIcon} from "lucide-react";
import * as React from "react";
import {ReactElement, useState} from "react";

export function CommandPalette(): ReactElement {
    const [isOpen, setIsOpen] = useState(true);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <CommandPaletteTrigger onClick={handleOpen}/>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                className="overflow-y-auto focus:outline-none"
            >
                <CommandPaletteOverlay className="items-start pt-[25vh]">
                    <DialogPanel
                        className="w-full rounded-xl max-w-xl bg-primary/10 ring-1 ring-primary-foreground/10 backdrop-blur-2xl duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        transition>
                        <Combobox
                            as="div"
                            className="relative mx-auto max-w-xl p-2"
                        >
                            <div className="flex gap-2 p-2">
                                <Badge className="bg-primary text-primary-foreground">All</Badge>
                                <Badge className="bg-accent text-accent-foreground">Shards</Badge>
                            </div>
                            {/*border-b border-slate-500*/}
                            <div //Remove p-2 from Combobox to hav ethe bottom line connect
                                className="flex items-center gap-2 p-2 border-b-2"
                            >
                                <SearchIcon className="h-5 w-5"/>
                                <Combobox.Input
                                    className="w-full border-0 outline-none bg-transparent placeholder-accent-foreground/50"
                                    placeholder="Type a command or search..."
                                />
                            </div>
                        </Combobox>
                    </DialogPanel>
                </CommandPaletteOverlay>
            </Dialog>
        </>
    );
}