import { API_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { useState } from "react";
import { LoadableButton } from "@/components/LoadableButton";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(1),
});

interface FormSchema {
  email?: string | null;
  name?: string | null;
  password?: string | null;
}

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (loginData: FormSchema) => {
      setIsLoading(true)
      return axios.post(API_URL + "/users/register", loginData);
    },
    onError: (err: any) => {
      setIsLoading(false)
      const errorMessage = err.response.data.message;
      setError(errorMessage);
    },
    onSuccess: (response) => {
      const jwt_token: string = response.data.token;
      localStorage.setItem("accesToken", jwt_token);
      console.log(jwt_token);
      navigate("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-12">
        <Card className="mx-auto my-auto h-fit max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
            <FormMessage>{error}</FormMessage>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <CustomFormField
                form={form}
                formLabel="Full Name"
                formName="name"
                inputType="text"
                inputPlaceHolder="Ole Kirk Christiansen"
              />
              <CustomFormField
                form={form}
                formLabel="Email"
                formName="email"
                inputType="text"
                inputPlaceHolder="LetsGO@gmail.com"
              />
              <CustomFormField
                form={form}
                formLabel="Password"
                formName="password"
                inputType="password"
                inputPlaceHolder="*******"
              />

              <LoadableButton loading={isLoading} className="w-full">
                Login
              </LoadableButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default Register;
