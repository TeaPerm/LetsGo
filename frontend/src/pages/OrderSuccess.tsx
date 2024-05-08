import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex items-center justify-center h-fit mt-24 mx-2">
      <Card className="p-4 rounded shadow-lg border-4">
        <div className="flex flex-col items-center space-y-2">
          <CircleCheck className="w-32 h-32"/>
          <h1 className="text-4xl font-bold">Thank You !</h1>
          <p className="pb-2">
            Thank you for your interest! Your order is on the way.
          </p>

          <div className="flex items-center">
            <Button asChild>
              <Link to="/">
                <div className="flex items-center flex-row font-bold">
                  <ArrowLeft className="w-4 mr-2" />
                  Home
                </div>
              </Link>
            </Button>

            <Button
              className="font-bold text-foreground hover:text-foreground/80"
              variant="link"
              asChild
            >
              <Link to="/orders">View orders</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderSuccess;
