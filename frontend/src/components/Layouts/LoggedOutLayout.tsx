import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";
import SearchBar from "../SearchBar";

export default function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header className="sticky z-20 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">LetsGO</span>
          </Link>
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full justify-end items-center gap-4 md:gap-2 lg:gap-4">
          <SearchBar/>
          <ModeToggle />
          <ProfileDropdown/>
        </div>
      </header>
      {children}
    </main>
  );
}
