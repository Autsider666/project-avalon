import {MobileNavMenu} from "@/components/nav/MobileNavMenu";
import {Search} from "@/components/Search";
import {Input} from "@/components/ui/Input";
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
        <Search/>
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