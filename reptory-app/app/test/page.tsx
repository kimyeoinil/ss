export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">CSS 테스트</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-700">이 텍스트가 보이고 스타일이 적용되나요?</p>
        <button className="btn-primary mt-4">테스트 버튼</button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-primary text-white p-4 rounded">Primary</div>
        <div className="bg-accent-coral text-white p-4 rounded">Coral</div>
        <div className="bg-accent-sky text-white p-4 rounded">Sky</div>
      </div>
    </div>
  );
}