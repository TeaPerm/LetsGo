import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Skeleton className="h-full bg-secondary w-full object-cover object-center" />
        </div>
        <div className="relative mt-4">
          <Skeleton className="text-sm font-medium text-foreground hover:underline" />
          <div className="flex justify-between">
            <Skeleton className="w-full" />
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <Skeleton className="relative text-lg font-semibold text-white" />
        </div>
      </div>
      <div className="mt-6">
        <Skeleton className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 bg-secondary" />
      </div>
    </div>
  );
}
