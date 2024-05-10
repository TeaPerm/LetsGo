import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface CustomFormFieldProps{
  form : any;
  formName: string;
  inputType?: string;
  formLabel?: string;
  inputPlaceHolder? : string;
  formDescription? : string;
}

const CustomFormField = ({form,formName, inputType, formLabel, inputPlaceHolder, formDescription} : CustomFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Input type={inputType} placeholder={inputPlaceHolder} {...field} />
          </FormControl>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
