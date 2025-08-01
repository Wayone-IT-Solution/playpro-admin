import CityForm from "../crud/forms/CityForm";
import NoFormFallback from "./NoFormFallback";
import UserForm from "../crud/forms/Adminform";
import QueryForm from "../crud/forms/QueryForm";
import StateForm from "../crud/forms/StateForm";
import VideoForm from "../crud/forms/VideoForm";
import BannerForm from "../crud/forms/BannerForm";
import CountryForm from "../crud/forms/CountryForm";
import PaymentForm from "../crud/forms/PaymentForm";
import TestimonialForm from "../crud/forms/TestimonialForm";
import BlogForm from "../crud/forms/BlogForm";
import CategoryForm from "../crud/forms/CategoryForm";
import GroundForm from "../crud/forms/GroundForm";

interface FormRendererProps {
  data: any;
  onClose?: any;
  formType: string;
  setPaginate?: any;
  setFilteredData?: any;
}

const FormRenderer: React.FC<FormRendererProps> = (props: any) => {
  switch (props.formType) {
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
        return <CategoryForm{...props}/>;
        
      case "Ground Listing":
        return <GroundForm {...props}/>;
        
    default:
      return <NoFormFallback />;
  }
};

export default FormRenderer;
