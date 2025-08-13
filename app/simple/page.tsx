export default function SimplePage() {
  return (
    <div>
      <h1 style={{ backgroundColor: 'red', color: 'white', padding: '20px' }}>
        인라인 스타일 테스트
      </h1>
      <div className="bg-blue-500 text-white p-4">
        Tailwind 테스트
      </div>
    </div>
  );
}