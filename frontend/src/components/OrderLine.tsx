import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Order } from "@/lib/types";
import { convertDate, formatPriceForints } from "@/lib/utils";

interface OrderLineProps {
  order: Order;
  isActive: boolean;
  props: any
}

const OrderLine = ({ order, isActive = false, ...props }: OrderLineProps) => {
  const { user_id: user } = order;

  return (
    <TableRow className={isActive ? "bg-accent" : ""} {...props}>
      <TableCell>
        <div className="font-medium">{user.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {user.email}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">Sale</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          Fulfilled
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {convertDate(order.createdAt.toString())}
      </TableCell>
      <TableCell className="text-right">
        {formatPriceForints(order.total)}
      </TableCell>
    </TableRow>
  );
};

export default OrderLine;
