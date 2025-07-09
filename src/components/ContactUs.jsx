import "./ContactUs.css";
import Header from "../components/Header";
import BackButton from "./BackButton/BackButton";

export default function ContactUs() {
  return (
    <>
      <Header />
      <div className="contact-container">
        <BackButton />
        <h1>Contact Us</h1>
        <p>
          If you have any questions, feedback, or just want to say hi, feel free
          to drop us an email at:
        </p>
        <a className="contact-email">jordanlawrencedev@hotmail.com</a>
        <p>We’ll try our best to get back to you within 24 hours.</p>
      </div>
    </>
  );
}
