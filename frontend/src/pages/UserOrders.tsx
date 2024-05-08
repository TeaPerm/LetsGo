import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { OrderData } from "@/lib/types";
import OrderCard from "@/components/OrderCard";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUser";
import AdminOrders from "./AdminOrders";

const UserOrders = () => {
  const user = useUser();

  if (user?.is_admin) {
    return <AdminOrders />;
  }

  const { data, isLoading } = useQuery<[OrderData]>({
    queryKey: ["userOrder"],
    queryFn: async () => {
      const token = localStorage.getItem("accesToken");
      const response = await fetch(API_URL + "/users/orders", {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.reverse();
    },
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="py-16 sm:py-8">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tigh sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-foreground/50">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {data.map((order) => (
                <OrderCard orderData={order} key={order.order._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
