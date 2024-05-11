import { UserWithMostOrders } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatPriceForints} from "@/lib/utils";

interface UsersWithMostOrdersProps {
  data: UserWithMostOrders[];
}

const UsersWithMostOrders = ({ data }: UsersWithMostOrdersProps) => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Users with most orders</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="">Orders</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ user, totalAmount, totalOrders },index) => (
              <TableRow key={user._id}>
                <TableCell className="flex">
                  <div className="mr-4">
                    <Avatar>
                      <AvatarFallback>{index+1}.</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="">{totalOrders}</TableCell>
                <TableCell className="text-right">{formatPriceForints(totalAmount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersWithMostOrders;
