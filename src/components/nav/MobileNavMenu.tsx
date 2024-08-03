import {Button} from "@/components/ui/Button";
import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/Sheet";
import {MenuGroup, useMenu} from "@/hooks/useMenu";
import {PanelLeft} from "lucide-react";
import Link from "next/link";
import {ReactElement} from "react";

function NavMenuGroup({group}: { group: MenuGroup }): ReactElement {
    let navClassName: string = '';
    let linkClassName: string = '';
    switch (group.section) {
        case "top":
            linkClassName = 'group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full border text-lg font-semibold text-primary-foreground md:text-base';
            break;
        case "middle":
        case "bottom":
            linkClassName = 'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground';
            navClassName = 'grid gap-6 text-lg font-medium mt-3';
            break;
    }

    return <nav className={navClassName}>
        {group.items.map((item) => <SheetClose
            key={item.label} asChild>
            {
                item.type === 'link' ? <Link
                    href={item.href}
                    className={linkClassName}
                >
                    {item.getLogo('h-5 w-5')}
                    {group.section === 'top' ? <span className="sr-only">{item.label}</span> : item.label}
                </Link> : <span key={item.label}>{item.getElement()}</span>
            }
        </SheetClose>)}
    </nav>;
}

export function MobileNavMenu(): ReactElement {
    const groups = useMenu();

    return <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5"/>
                <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
            <SheetTitle>
                {groups
                    .filter(({section}) => section === 'top')
                    .map((group, index) => <NavMenuGroup key={index} group={group}/>)}
            </SheetTitle>

            {groups
                .filter(({section}) => section === 'middle')
                .map((group, index) => <NavMenuGroup key={index} group={group}/>)}

            {/*{groups*/}
            {/*    .filter(({section}) => section === 'bottom')*/}
            {/*    .map((group, index) => <NavMenuGroup key={index} group={group}/>)}*/}
        </SheetContent>
    </Sheet>;
}