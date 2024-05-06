import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { productCategoryTypes } from "@/lib/utils";

export function CategoryMultiSelect({ checkedItems, handleCheckedChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center" asChild>
        <Button variant="outline">
          Categories
          <ChevronDownIcon className="ml-px mt-1 w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Lego Set Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {productCategoryTypes.map((type) => (
          <DropdownMenuCheckboxItem
            key={type}
            checked={checkedItems.includes(type)}
            onCheckedChange={handleCheckedChange(type)}
          >
            {type}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
