/*Components*/
import FeedbackForm from "../../forms/feedback-form";
import Sidebar from "..";

const Order = (props) => {
  return (
    <Sidebar {...props}>
      <FeedbackForm />
    </Sidebar>
  );
};

export default Order;
