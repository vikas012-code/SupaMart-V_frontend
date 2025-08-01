function Cancellation() {
  return (
    <div className="bg-gray-100  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Cancellation & Return Policy</h1>
        <p className="mb-4 text-gray-700">
          At SupaMart-V, we aim to ensure customer satisfaction. Please read our cancellation and return policy below.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Orders can be cancelled within 2 hours of placing them, unless shipped already.</li>
          <li>Returns are accepted within 7 days of delivery if the product is unused and in original packaging.</li>
          <li>Refunds are initiated within 5-7 business days after the returned item is inspected.</li>
          <li>In case of damaged or defective items, we offer full replacements or refunds.</li>
          <li>Contact our support team at <span className="text-blue-600">returns@supamartv.com</span> for assistance.</li>
        </ul>
        <p className="mt-6 text-gray-700">
          We reserve the right to update this policy at any time.
        </p>
      </div>
    </div>
  );
}

export default Cancellation
