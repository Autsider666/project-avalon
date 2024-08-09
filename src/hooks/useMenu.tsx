import {ModeToggle} from "@/components/theme/ModeToggle";
import {BookOpenIcon, HammerIcon, PuzzleIcon, SwordIcon} from "lucide-react";
import {ReactElement} from "react";

type MenuSection = 'top' | 'middle' | 'bottom';

export type MenuGroup = {
    section: MenuSection,
    items: MenuItem[]
}

type MenuElement = {
    type: 'element',
    label: string,
    getElement: () => ReactElement,
}

type MenuLink = {
    type: 'link',
    label: string,
    href: string,
    getLogo: (className: string) => ReactElement,
}

type MenuItem = MenuElement | MenuLink;

export function useMenu(): MenuGroup[] {
    return [
        {
            section: 'top',
            items: [
                {
                    type: "link",
                    label: "Home",
                    href: "/",
                    getLogo: className => <SwordIcon
                        className={`fill-foreground ${className}`}
                        color="#176baa"
                        style={{transform: 'rotate(90deg)'}}
                    />
                }
            ]
        },
        {
            section: 'middle',
            items: [
                {
                    type: "link",
                    label: "Shards",
                    href: "/shards",
                    getLogo: className => <PuzzleIcon className={className}/>
                },
                {
                    type: "link",
                    label: "Foundry",
                    href: "/foundry",
                    getLogo: className => <HammerIcon className={className}/>
                },
                {
                    type: "link",
                    label: "Documentation",
                    href: "/docs",
                    getLogo: className => <BookOpenIcon className={className}/>
                },
            ],
        },
        {
            section: 'bottom',
            items: [
                {
                    type: 'element',
                    label: 'theme',
                    getElement: () => <ModeToggle/>
                }
            ]
        }
    ];
}