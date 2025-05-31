function TermsAndCondition() {
  return (
    <div className="bg-gray-100  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Terms & Conditions</h1>
        <p className="mb-4 text-gray-700">
          Welcome to SupaMart-V. By accessing our website, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>All products are subject to availability and may be withdrawn at any time.</li>
          <li>Prices are subject to change without prior notice.</li>
          <li>We reserve the right to refuse service or cancel orders at our discretion.</li>
          <li>Users must not misuse our website or its features for fraudulent purposes.</li>
          <li>All content is the property of SupaMart-V and cannot be used without permission.</li>
        </ul>
        <p className="mt-6 text-gray-700">
          For any questions, contact us at <span className="text-blue-600">support@supamartv.com</span>.
        </p>
      </div>
    </div>
  );
}

export default TermsAndCondition
