import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center border-t">
      <div className="grid grid-cols-5 w-[90%] text-sm text-gray-600">
        {/* <------- about -------> */}
        <div className="flex flex-col">
          <p className="text-xl text-gray-700 dark:text-gray-500">ABOUT</p>
          <Link href="/about/contact">Contact Us</Link>
          <Link href="/about/about">About Us</Link>
          <Link href="/about/papers">Papers</Link>
        </div>

        {/* <------- help -------> */}
        <div className="flex flex-col">
          <p className="text-xl text-gray-700 dark:text-gray-500">HELP</p>
          <Link href="/help/payments">Payments</Link>
          <Link href="/help/shipping">Shipping</Link>
          <Link href="/help/cancellationandreturns">
            Cancellation & Returns
          </Link>
          <Link href="/help/faq">FAQ</Link>
        </div>

        {/* <------- consumer policy -------> */}
        <div className="flex flex-col">
          <p className="text-xl text-gray-700 dark:text-gray-500">
            CONSUMER POLICY
          </p>
          <Link href="/policy/cancellationandreturns">
            Cancellation & Returns
          </Link>
          <Link href="/policy/termsofuse">Terms Of Use</Link>
          <Link href="/policy/security">Security</Link>
          <Link href="/policy/privacy">Privacy</Link>
          <Link href="/policy/grievance">Grievance</Link>
        </div>

        {/* <------- mail us -------> */}
        <div>
          <p className="text-xl text-gray-700 dark:text-gray-500">MAIL US</p>
          <p>
            Pacific Hostel, Kalinga University, <br /> Atal Nagar, Naya Raipur,
            <br /> Near Mantralaya, <br />
            Raipur 492101,
            <br /> Chhattisgarh, India
          </p>
        </div>

        {/* <------- office address -------> */}
        <div>
          <p className="text-xl text-gray-700 dark:text-gray-500">ADDRESS</p>
          <p>
            Pacific Hostel, Kalinga University, <br /> Atal Nagar, Naya Raipur,
            <br /> Near Mantralaya, <br />
            Raipur 492101,
            <br /> Chhattisgarh, India
          </p>
          <Link href="tel:9653050975">
            Telephone: <span className="text-blue-500">9653050975</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
