import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { API_URL, formatPriceForints } from "@/lib/utils";
import { Product, ProductsResponse } from "@/lib/types";
import useDebounce from "@/hooks/useDebounce";
import { Fragment } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debouncedSearchInput = useDebounce<string>(query, 400);

  const { data: filteredItems, isLoading } = useQuery<ProductsResponse>({
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

  const handleOnChange = (input: string) => {
    setQuery(input);
  };

  return (
    <form className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onClick={() => setOpen(true)}
          placeholder="Search products..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
        <Transition.Root
          show={open}
          as={Fragment}
          afterLeave={() => setQuery("")}
          appear
        >
          <Dialog className="relative z-50" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-background  shadow-2xl transition-all">
                  <Combobox
                    onChange={(item: Product) => {
                      setOpen(false);
                      navigate("/products/" + item._id);
                    }}
                  >
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full bg-transparent pl-11 pr-4  placeholder:text-gray-400 sm:text-sm"
                        placeholder="Search..."
                        onChange={(e) => handleOnChange(e.target.value)}
                        onBlur={() => setQuery("")}
                      />
                    </div>

                    {isLoading && (
                      <div className="flex items-center pb-4">
                        <Loading />
                      </div>
                    )}

                    {query !== "" && filteredItems?.total === 0 && (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <ExclamationCircleIcon
                          type="outline"
                          name="exclamation-circle"
                          className="mx-auto h-6 w-6 text-gray-400"
                        />
                        <p className="mt-4 font-semibold">No results found</p>
                        <p className="mt-2 ">
                          No product found for this search term. Please try
                          again.
                        </p>
                      </div>
                    )}

                    {filteredItems && filteredItems.total>0 && (
                      <Combobox.Options
                        static
                        className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                      >
                        {filteredItems.products.map((item) => (
                          <Combobox.Option
                            key={item._id}
                            value={item}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-pointer select-none rounded-xl p-3",
                                active && "bg-foreground/20"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <img
                                  src={item.image}
                                  className="h-16 w-16 p-px"
                                />
                                <div className="ml-4 flex-auto">
                                  <p
                                    className={classNames(
                                      "text-sm font-medium w-48 truncate",
                                      active
                                        ? "text-foreground"
                                        : "text-foreground/80"
                                    )}
                                  >
                                    {item.name}
                                  </p>
                                  <p
                                    className={classNames(
                                      "text-sm truncate w-48",
                                      active
                                        ? "text-foreground"
                                        : "text-foreground/80"
                                    )}
                                  >
                                    {item.description}
                                  </p>
                                </div>
                                <p
                                  className={classNames(
                                    "text-sm truncate justify-end w-full flex",
                                    active
                                      ? "text-foreground"
                                      : "text-foreground/80"
                                  )}
                                >
                                  {formatPriceForints(item.price)}
                                </p>
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}
                  </Combobox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </form>
  );
};

export default SearchBar;
