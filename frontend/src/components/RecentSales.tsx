import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { OrderData } from "@/lib/types";
import { API_URL, formatPriceForints, getInitials } from "@/lib/utils";
import Loading from "./Loading";

const RecentSales = () => {
  const { data: recentOrders, isLoading: isOrdersLoading } = useQuery<
    OrderData[]
  >({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const token = localStorage.getItem("accesToken");
      const response = await fetch(API_URL + "/orders/?limit=5", {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    },
  });

  if (isOrdersLoading || !recentOrders) {
    return <Loading />;
  }

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {recentOrders.map(({order}) => (
          <div className="flex items-center gap-4" key={order._id}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>{getInitials(order.user_id.name)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{order.user_id.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.user_id.email}
              </p>
            </div>
            <div className="ml-auto font-medium">+{formatPriceForints(order.total)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentSales;
