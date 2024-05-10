import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductsResponse } from "@/lib/types";
import { convertDate, API_URL, formatPriceForints } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading";

export default function AdminProducts() {
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/products");
      const data = await response.json();
      return data;
    },
  });

  const productDeleteMutation = useMutation({
    mutationFn: async (productId: Product["_id"]) => {
      const token = localStorage.getItem("accesToken");
      await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (!data || isLoading) {
    return <Loading />;
  }

  const { products } = data;

  return (
    <Tabs defaultValue="all" className="p-8">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Products</CardTitle>
              <Button size="sm" className="h-7 gap-1" asChild>
                <Link to="/products/create">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Link>
              </Button>
            </div>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{formatPriceForints(product.price)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {convertDate(product.createdAt.toString())}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Button
                              className="w-full justify-start cursor-pointer"
                              variant="ghost"
                              asChild
                            >
                              <Link to={`/products/${product._id}/edit`}>
                              Edit
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Button
                              className="w-full justify-start cursor-pointer text-red-500 hover:text-red-500/80"
                              variant="ghost"
                              onClick={() =>
                                productDeleteMutation.mutate(product._id)
                              }
                            >
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isLoading && (
              <div className="space-y-4 py-2">
                <Skeleton className="w-full h-12 bg-secondary" />
                <Skeleton className="w-full h-12 bg-secondary" />
                <Skeleton className="w-full h-12 bg-secondary" />
                <Skeleton className="w-full h-12 bg-secondary" />
                <Skeleton className="w-full h-12 bg-secondary" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{products.length}</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
