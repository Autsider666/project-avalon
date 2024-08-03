import {NavButton} from "@/components/nav/NavButton";
import {MenuGroup, useMenu} from "@/hooks/useMenu";
import {ReactElement} from "react";

function NavMenuGroup({group}: { group: MenuGroup }): ReactElement {
    let className: string = '';
    switch (group.section) {
        case "top":
            break;
        case "middle":
            className = 'flex flex-col items-center gap-4 px-2 sm:py-5';
            break;
        case "bottom":
            className = 'mt-auto flex flex-col items-center gap-4 px-2 sm:py-5';
            break;
    }

    return <nav className={className}>
        {group.items.map((item) => (
            item.type === 'link' ? <NavButton key={item.label} label={item.label} href={item.href}>
                {item.getLogo('size-5')}
            </NavButton> : <span key={item.label}>{item.getElement()}</span>
        ))}
    </nav>;
}

export function DesktopNavMenu(): ReactElement {
    const groups = useMenu();

    return <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div
            className="border-b p-2"
        >
            {groups
                .filter(({section}) => section === 'top')
                .map((group, index) => <NavMenuGroup key={index} group={group}/>)}
        </div>
        {groups
            .filter(({section}) => section === 'middle')
            .map((group, index) => <NavMenuGroup key={index} group={group}/>)}
        {groups
            .filter(({section}) => section === 'bottom')
            .map((group, index) => <NavMenuGroup key={index} group={group}/>)}
    </aside>;
}