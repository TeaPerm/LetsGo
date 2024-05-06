import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {

  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart()
  }, []);


  return (
    <div className="flex items-center justify-center h-fit mt-32 mx-2">
      <Card className="p-4 rounded shadow-lg border-4">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold">Thank You !</h1>
          <p className="">
            Thank you for your interest! Your order is on the way.
          </p>
          <Button asChild>
            <Link to="/">
              <div className="flex items-center flex-row font-bold">
                <ArrowLeft className="w-4 mr-2" />
                Home
              </div>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderSuccess;
