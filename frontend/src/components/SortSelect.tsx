import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

export function SortSelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectOptions = [
    { value: "createdAt,desc", text: "Newest" },
    { value: "createdAt", text: "Oldest" },
    { value: "price", text: "Price: Low to High" },
    { value: "price,desc", text: "Price: High to Low" },
  ];

  const handleChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <Select onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {selectOptions.map((option) => (
            <SelectItem value={option.value} key={option.text}>
              {option.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
