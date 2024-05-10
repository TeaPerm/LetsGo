import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL, productCategoryTypes } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().positive(),
  description: z.string().min(5),
  category: z.string({ message: "Please provide a category." }).min(1, {message: "Please provide a category."}),
  image: z.string().url().min(10),
});

interface FormSchema {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productCreateMutation = useMutation({
    mutationFn: async (productData: FormSchema) => {
      const token = localStorage.getItem("accesToken");
      await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      navigate("/products");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const response = await fetch(API_URL + "/products/" + productId);
      const data = await response.json();
      if(!data._id){
        navigate("/products")
      }
      return data;
    },
  });

  const inputImageURL = form.watch("image");

  function onSubmit(productData: z.infer<typeof formSchema>) {
    console.log(productData);

    productCreateMutation.mutate(productData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    asChild
                  >
                    <Link to="/products">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Link>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Edit Lego set
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                  </Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button size="sm" type="submit">
                      Save Product
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lego Set Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <CustomFormField
                              form={form}
                              formName="name"
                              formLabel="Product name"
                              inputType="text"
                              inputPlaceHolder="Big LEGO® Sets and Toys"
                              formDescription="Public name of the product"
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Introducing the LEGO Deep Space Explorer Set! Embark on an intergalactic adventure beyond the stars with this thrilling construction kit. Join the intrepid crew of astronauts aboard their modular spacecraft as they journey through the cosmos, encountering mysterious alien worlds and cosmic phenomena along the way."
                                      className="min-h-32"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Desciption of the product
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <CustomFormField
                            form={form}
                            formName="image"
                            formLabel="URL image for the set"
                            inputType="text"
                            inputPlaceHolder="https://www.lego.com/cdn/cs/set/assets/blta44628ca57bd7d14/76269_boxprod_v39.png?fit=crop&quality=80&width=600&height=600&dpr=1"
                            formDescription="Provide a valid URL image of the lego set"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Lego Set Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          alt="Place image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={inputImageURL}
                          width="300"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "https://ui.shadcn.com/placeholder.svg";
                          }}
                        />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Category and Pricing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <SelectFormField form={form} />
                            <CustomFormField
                              form={form}
                              formName="price"
                              formLabel="Rental Price"
                              inputType="number"
                              inputPlaceHolder="47000"
                              formDescription="Rental price for the set"
                            />{" "}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </Form>
  );
}

function SelectFormField({ form } : {form: any}) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lego Category</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => form.setValue("category", value)}
              {...field}
            >
              <SelectTrigger id="category" aria-label="Select category type">
                <SelectValue placeholder="Select category type" />
              </SelectTrigger>
              <SelectContent>
                {productCategoryTypes.map((categoryType, index) => (
                  <SelectItem value={categoryType} key={index}>
                    {categoryType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
