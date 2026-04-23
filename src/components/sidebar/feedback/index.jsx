/*Components*/
import FeedbackForm from "../../forms/feedback-form";
import Sidebar from "..";

const Feedback = (props) => {
  return (
    <Sidebar {...props}>
      <FeedbackForm />
    </Sidebar>
  );
};

export default Feedback;
