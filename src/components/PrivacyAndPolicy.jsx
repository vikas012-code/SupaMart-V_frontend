function PrivacyAndPolicy() {
  return (
    <div className="bg-gray-100  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          SupaMart-V is committed to protecting your privacy. This policy outlines how we collect, use, and protect your information.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>We collect personal details like name, email, and address for order processing.</li>
          <li>We do not share your personal information with third parties without consent.</li>
          <li>Your payment data is processed securely using encrypted channels.</li>
          <li>Cookies are used to enhance your shopping experience.</li>
          <li>You can contact us anytime to update or delete your data.</li>
        </ul>
        <p className="mt-6 text-gray-700">
          Questions? Email us at <span className="text-blue-600">privacy@supamartv.com</span>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyAndPolicy
