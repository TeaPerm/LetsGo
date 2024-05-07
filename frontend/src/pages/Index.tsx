import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Fingerprint, LogIn, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const user = useUser();

  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-12 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                LetsGo: Your Gateway to LEGO Adventures!
              </h2>
              <p className="mt-4">
                Unlock endless creativity without breaking the bank! Welcome to
                LetsGo, your ultimate LEGO rental destination. Rent iconic sets
                for a fraction of the cost, dive into building, exploring, and
                creating without draining your wallet. Say goodbye to buyer's
                remorse, hello to endless possibilities. Join LetsGo today and
                let your imagination run wild, one brick at a time!
              </p>
              {user ? (
                <Link to="/products">
                  <Button className="mt-4 ">
                    Get started!
                    <MoveRight className="ml-2 w-4 mt-px h-4" />
                  </Button>
                </Link>
              ) : (
                <div>
                  <Link to="/login">
                    <Button className="mt-4 mr-4 ">
                      Log in
                      <LogIn className="ml-2 w-4 mt-px h-4" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="mt-4" size="sm">
                      Register
                      <Fingerprint className="ml-2 w-4 mt-px h-4" />

                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src="https://live.staticflickr.com/8743/16307619923_18fb9ac41b_b.jpg"
                alt=""
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
