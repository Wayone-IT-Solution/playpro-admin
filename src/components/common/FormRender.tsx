import CityForm from "../crud/forms/CityForm";
import NoFormFallback from "./NoFormFallback";
import BlogForm from "../crud/forms/BlogForm";
import UserForm from "../crud/forms/Adminform";
import QueryForm from "../crud/forms/QueryForm";
import CoachForm from "../crud/forms/CoachForm";
import StateForm from "../crud/forms/StateForm";
import VideoForm from "../crud/forms/VideoForm";
import BrandForm from "../crud/forms/BrandForm";
import GroundForm from "../crud/forms/GroundForm";
import BannerForm from "../crud/forms/BannerForm";
import CouponForm from "../crud/forms/CouponForm";
import ContactUsForm from "../crud/forms/ContactUs";
import CountryForm from "../crud/forms/CountryForm";
import PaymentForm from "../crud/forms/PaymentForm";
import ProductForm from "../crud/forms/ProductForm";
import ManageRoleForm from "../crud/forms/Roleform";
import CategoryForm from "../crud/forms/CategoryForm";
import TestimonialForm from "../crud/forms/TestimonialForm";
import ProductCategoryForm from "../crud/forms/ProductCategoryForm";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
    case "Products Category":
      return <ProductCategoryForm {...props} />;
    case "Coupon":
      return <CouponForm {...props} />;
    case "Coaches":
      return <CoachForm {...props} />;
    case "Role Management":
      return <ManageRoleForm {...props} />;
    case "Products":
      return <ProductForm {...props} />;
    case "Brands":
      return <BrandForm {...props} />;
    case "Banner":
      return <BannerForm {...props} />;
    case "Ad Video":
      return <VideoForm {...props} />;
    case "Country":
      return <CountryForm {...props} />;
    case "State":
      return <StateForm {...props} />;
    case "City":
      return <CityForm {...props} />;
    case "Employee":
      return <UserForm {...props} />;
    case "Redeem Request":
      return <PaymentForm {...props} />;
    case "Customer Support":
      return <QueryForm {...props} />;
    case "Testimonials":
      return <TestimonialForm {...props} />;
    case "Blog":
      return <BlogForm {...props} />;
    case "Blog Category":
      return <CategoryForm {...props} />;
    case "Ground Listing":
      return <GroundForm {...props} />;
    case "Contact":
      return <ContactUsForm {...props} />;
    default:
      return <NoFormFallback />;
  }
};

export default FormRenderer;
