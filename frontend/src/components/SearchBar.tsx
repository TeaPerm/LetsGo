import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";
import { ProductsResponse } from "@/lib/types";
import useDebounce from "@/hooks/useDebounce";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchInput = useDebounce<string>(searchInput, 400);

  const { data } = useQuery<ProductsResponse>({
    queryKey: ["searchProducts", debouncedSearchInput],
    queryFn: async () => {
      const response = await fetch(
        API_URL + "/products/?search=" + debouncedSearchInput
      );
      const data = await response.json();
      return data;
    },
    enabled: debouncedSearchInput.length >= 3,
  });

  console.log(data)

  const handleOnChange = (input: string) => {
    setSearchInput(input);
  };

  return (
    <form className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={(e) => handleOnChange(e.target.value)}
          placeholder="Search products..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </form>
  );
};

export default SearchBar;
