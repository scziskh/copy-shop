/*Components*/
import CallbackForm from "../../forms/callback-form";
import Sidebar from "..";

const Callback = (props) => {
  return (
    <Sidebar {...props}>
      <CallbackForm />
    </Sidebar>
  );
};

export default Callback;
