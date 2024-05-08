import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useSearchParams } from "react-router-dom";

interface ProductPaginationProps {
  count: number;
}

export function ProductPagination({ count }: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam !== null ? parseInt(pageParam) : 1;

  const isNextShown = count / 8 <= currentPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onClick={() => {
              searchParams.set("page", (currentPage - 1).toString());
              setSearchParams(searchParams, { replace: true });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <PaginationNext
            className={
              isNextShown
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
            onClick={() => {
              searchParams.set("page", (currentPage + 1).toString());
              setSearchParams(searchParams, { replace: true });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
