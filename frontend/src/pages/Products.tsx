import { useUser } from "@/hooks/useUser";
import AdminProducts from "./AdminProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import { CategoryMultiSelect } from "@/components/CategoryMultiSelect";
import { SortSelect } from "@/components/SortSelect";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductPagination } from "@/components/ProductPagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "8",
    sort: "",
    category: "",
  });

  const user = useUser();

  if (user?.is_admin) {
    return <AdminProducts />;
  }

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "8";
  const sort = searchParams.get("sort");
  const categoriesParam = searchParams.get("category");
  const categories: string[] = categoriesParam
    ? categoriesParam.split(",")
    : [];

  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products", ...categories, sort, limit, page],
    queryFn: async () => {
      let options = `?limit=${limit}&sort=${sort}&page=${page}`;

      if (categories.length > 0) {
        options += "&category=" + categories.join(",");
      }

      const response = await fetch(API_URL + "/products" + options);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading || !data) {
    return (
      <div className="mt-8 mb-12 mx-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  const handleCheckedChange = (type: string) => (isChecked: boolean) => {
    if (isChecked) {
      searchParams.set("category", [...categories, type].join(","));
      setSearchParams(searchParams, { replace: true });
    } else {
      const filtered: string[] = categories.filter((item) => item !== type);
      searchParams.set("category", filtered.join(","));
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <div>
      <div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            LetsGo: Build memories
          </h1>
          <p className="mt-4 max-w-xl text-sm">
            Renting LEGO sets has never been easier - simply browse our catalog,
            choose your favorites, and embark on your next building journey.
            With LetsGo, building memories is just a click away!
          </p>
        </div>
        <div className=" pb-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <SortSelect />
            <CategoryMultiSelect
              checkedItems={categories}
              handleCheckedChange={handleCheckedChange}
            />
          </div>
        </div>
        <Separator />
        <div className="">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
            <div className="text-sm font-medium">Filters</div>

            <div className="mt-2 sm:ml-8 sm:mt-0">
              <div className="-m-1 flex flex-wrap items-center gap-2">
                {categories.map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => handleCheckedChange(type)(false)}
                    className="w-fit"
                  >
                    <span className="m-1 inline-flex items-center rounded-md py-1.5 pl-3 pr-2 text-sm font-medium">
                      <span>{type}</span>
                      <X className="ml-1.5 mt-0.5 w-4 h-4" />
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-12 mx-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {data.products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <div className="my-8">
        <ProductPagination count={data.total} />
      </div>
    </div>
  );
};

export default Products;
