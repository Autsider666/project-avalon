import {MobileNavMenu} from "@/components/nav/MobileNavMenu";
import {Button} from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import {Input} from "@/components/ui/Input";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/Sheet";
import {Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2, Search} from "lucide-react";
import Link from "next/link";
import {ReactElement} from "react";

export function NavHeader(): ReactElement {
    return <header
        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <MobileNavMenu/>
        {/*<Breadcrumb className="hidden md:flex">*/}
        {/*    <BreadcrumbList>*/}
        {/*        <BreadcrumbItem>*/}
        {/*            <BreadcrumbLink asChild>*/}
        {/*                <Link href="#">Dashboard</Link>*/}
        {/*            </BreadcrumbLink>*/}
        {/*        </BreadcrumbItem>*/}
        {/*        <BreadcrumbSeparator/>*/}
        {/*        <BreadcrumbItem>*/}
        {/*            <BreadcrumbLink asChild>*/}
        {/*                <Link href="#">Orders</Link>*/}
        {/*            </BreadcrumbLink>*/}
        {/*        </BreadcrumbItem>*/}
        {/*        <BreadcrumbSeparator/>*/}
        {/*        <BreadcrumbItem>*/}
        {/*            <BreadcrumbPage>Recent Orders</BreadcrumbPage>*/}
        {/*        </BreadcrumbItem>*/}
        {/*    </BreadcrumbList>*/}
        {/*</Breadcrumb>*/}
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
        {/*<DropdownMenu>*/}
        {/*    <DropdownMenuTrigger asChild>*/}
        {/*        <Button*/}
        {/*            variant="outline"*/}
        {/*            size="icon"*/}
        {/*            className="overflow-hidden rounded-full"*/}
        {/*        >*/}
        {/*            Img*/}
        {/*        </Button>*/}
        {/*    </DropdownMenuTrigger>*/}
        {/*    <DropdownMenuContent align="end">*/}
        {/*        <DropdownMenuLabel>My Account</DropdownMenuLabel>*/}
        {/*        <DropdownMenuSeparator/>*/}
        {/*        <DropdownMenuItem>Settings</DropdownMenuItem>*/}
        {/*        <DropdownMenuItem>Support</DropdownMenuItem>*/}
        {/*        <DropdownMenuSeparator/>*/}
        {/*        <DropdownMenuItem>Logout</DropdownMenuItem>*/}
        {/*    </DropdownMenuContent>*/}
        {/*</DropdownMenu>*/}
    </header>;
}