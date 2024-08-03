"use client";

import {Button, ButtonProps} from "@/components/ui/Button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/Tooltip";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactElement, ReactNode} from "react";

type NavButtonProps = {
    label: string,
    href: string,
    children: ReactNode,
    variant?: ButtonProps["variant"],
}

export function NavButton({href, label, children, variant = 'ghost'}: NavButtonProps): ReactElement {
    const pathname = usePathname();

    return <Link href={href}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant}
                    size="icon"
                    aria-label={label}
                    className={`rounded-lg ${pathname === href ? 'bg-muted' : ''}`}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
                {label}
            </TooltipContent>
        </Tooltip>
    </Link>;
}