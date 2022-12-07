import * as yup from "yup";

export const bookSchema = yup.object().shape({
    title: yup.string("Please enter a valid title!").required("Required"),
    author: yup.string("Please enter a valide author!").required("Required"),
    //Check that the description has atleast 15 characters
    description: yup.string().min(15).required("Please enter a description with at least 15 characters!")
})