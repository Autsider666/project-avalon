"use client";

import {Button} from "@/components/ui/Button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/Command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover";
import {cn} from "@/lib/utils";
import {clsx} from "clsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {ReactElement, useState} from "react";

type ComboboxProps = {
    className?: string,
    placeholder?: string,
    searchPlaceholder?: string,
    defaultValue?: string,
    items: { value: string, label: string }[],
    onSelect?: (value: string) => Promise<void>,
};

export function Combobox({
                             items,
                             onSelect,
                             defaultValue,
                             placeholder,
                             searchPlaceholder,
                             className
                         }: ComboboxProps): ReactElement {
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(defaultValue ?? "");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={clsx('w-[200px] justify-between', className)}
                >
                    {currentValue
                        ? items.find(({value: itemValue}) => itemValue === currentValue)?.label
                        : (placeholder ?? "Select...")}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={clsx(
                'w-[200px] p-0',
                className
            )}>
                <Command>
                    <CommandInput placeholder={searchPlaceholder ?? 'Search...'}/>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList className={className}>
                        <CommandGroup>
                            {items.map(({value, label}) => (<CommandItem
                                className={className}
                                key={value}
                                value={value}
                                onSelect={async (currentValue) => {
                                    if (onSelect) {
                                        await onSelect(currentValue);
                                    }

                                    setCurrentValue(currentValue === value ? "" : currentValue);
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