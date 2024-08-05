"use client";

import {Button, ButtonProps} from "@/components/ui/Button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/Command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover";
import {cn} from "@/lib/utils";
import {clsx} from "clsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {ReactElement, ReactNode, useState} from "react";

type ComboboxProps = {
    triggerClassName?: string,
    canUnselect?: boolean,
    triggerVariant?: ButtonProps["variant"],
    popoverClassName?: string,
    placeholder?: string,
    searchPlaceholder?: string,
    defaultValue?: string,
    items: { value: string, label: string, keywords?: string[] }[],
    onSelect?: (value: string) => Promise<void>,
    children?: ReactNode,
    icon?: ReactElement,
};


// TODO Make responsive: https://ui.shadcn.com/docs/components/combobox#responsive
export function Combobox({
                             items,
                             onSelect,
                             defaultValue,
                             placeholder,
                             searchPlaceholder,
                             triggerClassName,
                             triggerVariant = 'outline',
                             popoverClassName,
                             children,
                             icon,
                             canUnselect = true,
                         }: ComboboxProps): ReactElement {
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(defaultValue ?? "");

    const label: string = (currentValue
        ? items.find(({value: itemValue}) => itemValue === currentValue)?.label : undefined) ?? (placeholder ?? "Select...");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children ?? <Button
                    variant={triggerVariant}
                    role="combobox"
                    aria-expanded={open}
                    className={clsx('w-[200px] justify-between', triggerClassName)}
                >
                    <span>{label}</span>
                    {icon ?? <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>}
                </Button>}
            </PopoverTrigger>
            <PopoverContent className={clsx(
                'w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0',
                popoverClassName
            )}>
                <Command>
                    <CommandInput placeholder={searchPlaceholder ?? 'Search...'}/>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList className={''}>
                        <CommandGroup>
                            {items.map(({value, label, keywords}) => (<CommandItem
                                key={value}
                                value={value}
                                keywords={keywords}
                                disabled={!canUnselect && value === currentValue}
                                onSelect={async (currentValue) => {
                                    if (onSelect) {
                                        await onSelect(currentValue);
                                    }

                                    // setCurrentValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === currentValue ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {label}
                            </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}