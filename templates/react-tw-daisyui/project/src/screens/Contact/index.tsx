import {Outlet} from "react-router-dom";

const ContactPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Contact</h1>
      <p>Some contact information</p>

      <a href="/" className="btn btn-primary">
        Home
      </a>

      <ul>
        <li>
          <a href="/contact/1">Contact 1</a>
        </li>
        <li>
          <a href="/contact/2">Contact 2</a>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default ContactPage;
