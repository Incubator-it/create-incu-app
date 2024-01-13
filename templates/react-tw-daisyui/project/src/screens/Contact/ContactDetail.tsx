import {useParams} from "react-router-dom";

const ContactDetail = () => {
  const {id} = useParams();
  return <div>Contact Detail {id}</div>;
};

export default ContactDetail;
